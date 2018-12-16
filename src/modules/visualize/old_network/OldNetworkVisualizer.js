
import vis from 'vis';
import {
    set, merge,
    isEmpty, isNull, isArray, isString, isObject,
    difference, union,
    each,
    pick, forOwn,
} from 'lodash-es';

//
//
// NOTE: this is a port from the old version, horribleness is mostly inherited.
//
//

// const shallowDiff = (a,b) => {
//     return omit(a, (v,k) => { return b[k] === v; })
// };

const deepDiff = (old, comp) => {
    const internalDeepDiff = (old, comp) => {
        var r = {};
        each(old, (value, key) => { // value, key
            if(typeof comp[key] === 'undefined') return; // {foo: 1}, {} -> undefined
            if(comp[key] === value) return; // {foo: 1}, {foo: 1} -> undefined

            // but what if it returns an empty object? still attach?
            if((isObject(value) && isObject(comp[key]))) {
                var v = internalDeepDiff(value, comp[key]);
                if(typeof v !== 'undefined')
                    r[key] = v;
            }
            else {
                r[key] = comp[key];
            }

        });

        // copy missing keys over
        var missing = difference(Object.keys(comp), Object.keys(old));
        each(missing, (compKey) => {
            r[compKey] = comp[compKey];
        });

        if(isEmpty(r)) return;

        return r;
    }

    var r = internalDeepDiff(old, comp);

    if(typeof r === 'undefined')
        return {};
    return r;
};

// Return what would be overwritten in oldObj if was to be newObj was merged
// to it.
// Null marks that a portion was undefined in oldObj.
const overwritten = (newObj, oldObj) => {
    const internalOverwritten = (newObj, oldObj) => {
        var r = {};
        each(newObj, (value, key) => { // value, key
            if(typeof oldObj[key] === 'undefined')
              return null;
            if(oldObj[key] === value)
              return;

            if((isObject(value) && isObject(oldObj[key]))) {
                var v = internalOverwritten(value, oldObj[key]);
                if(typeof v !== 'undefined')
                    r[key] = v;
            }
            else {
                r[key] = oldObj[key];
            }

        });

        // set missing keys to null
        var missing = difference(Object.keys(newObj), Object.keys(oldObj));
        each(missing, (key) => {
            r[key] = null;
        });

        if(isEmpty(r)) return;

        return r;
    }

    return internalOverwritten(newObj, oldObj);
}

// MAIN CLASS
class OldNetworkVisualizer {
    constructor(container, settings, parser) {
        this.reset();
        this.network = null;
        this.container = container;
        this.parser = parser;

        if(settings && settings.directed === true)
            set(this.attributes, 'edges.arrows.to.enabled', true);

        // create network
        this.network = new vis.Network(
            this.container, this.entities, this.attributes
        );

        // load initial options
        // see https://github.com/almende/vis/blob/955dd25caa276560513c96178a3aad5d313952c6/lib/network/Network.js#L186
        // TODO FIX THIS, sould be this.attributes??
        const attr = this.network.options;
        merge(attr, this.network.canvas.options);
        attr.nodes      = this.network.nodesHandler.options;
        attr.edges      = this.network.edgesHandler.options;
        attr.layout     = this.network.layoutEngine.options;
        attr.physics    = this.network.physics.options;

        console.log('Loaded visjs network with attributes: ', this.attributes);

        this.edges = this.entities.edges;
        this.nodes = this.entities.nodes;

        this.canvas    = this.container.firstChild.firstChild;
        this.context   = this.canvas.getContext('2d');
    }

    _initData() {
        this.context = null;
        this.canvas = null;
        // entities are visjs network "data"
        this.entities = {
            nodes: new vis.DataSet([], {queue: true}),
            edges: new vis.DataSet([], {queue: true}),
            // hack, keep flushed duplicates. TODO FIX THIS, FastFwd problematic
            fNodes: new vis.DataSet([], {queue: false}),
            fEdges: new vis.DataSet([], {queue: false})
        };
        this.currentEntityKeys = {nodes: [], edges: []};
        // attributes are visjs network "options"
        this.attributes = {
            autoResize: true,
            physics: {
                barnesHut: {
                    damping: 0.38
                },
                forceAtlas2Based: {
                    //springConstant: 0.02
                },
                maxVelocity: 15,
                solver: 'forceAtlas2Based',
                timestep: 0.25
            },
            nodes: {
                color: {
                    background: "#DCEDC8",
                    border: "#7CB342",
                    highlight: {
                        background: "#F1F8E9",
                        border: "#7CB342"
                    }
                }
            }
        };
        this.entityDeltas = {nodes: [], edges: []};
        this.attributeDeltas = [];
        this.cursor = 0;
    }

    reset() {
        if(this.network instanceof vis.Network) {
            this.network.destroy();
        }
        this._initData();
    }

    doParsing(inputList) {
        var toParse;
        if(isArray(inputList)) {
            toParse = inputList.join(' ');
        }
        else if(isString(inputList)) {
            toParse = inputList;
        }
        else
            return false;

        console.log('Parsing... ', toParse);

        return this.parser.parse(toParse);
    }

    addAnswerSet(inputList) {
        const ret = this.queueAnswerSet(inputList);
        this.flushChanges();
        return ret;
    }

    queueAnswerSet(inputList) {
        const parsed = this.doParsing(inputList);
        if (parsed === false) return false; // bail out

        // entities
        // node and edge

        const nodesToRem = difference(this.currentEntityKeys.nodes, Object.keys(parsed.nodes));
        const edgesToRem = difference(this.currentEntityKeys.edges, Object.keys(parsed.edges));
        const nodesToAdd = difference(Object.keys(parsed.nodes), this.currentEntityKeys.nodes);
        const edgesToAdd = difference(Object.keys(parsed.edges), this.currentEntityKeys.edges);

        this.entityDeltas.nodes[this.cursor] = {};
        this.entityDeltas.edges[this.cursor] = {};

        for (const key of edgesToRem) {
            this.entityDeltas.edges[this.cursor][key] = this.entities.fEdges.get(key);
        }
        for (const key of nodesToRem) {
            this.entityDeltas.nodes[this.cursor][key] = this.entities.fNodes.get(key);
        }

        this.entities.edges.remove(edgesToRem);
        this.entities.fEdges.remove(edgesToRem);
        this.entities.nodes.remove(nodesToRem);
        this.entities.fNodes.remove(nodesToRem);

        // add
        for (const key of nodesToAdd) {
            // by default show id as label, but don't override if label set
            if(typeof parsed.nodes[key].label === 'undefined')
                parsed.nodes[key].label = String(parsed.nodes[key].id);

            this.entities.nodes.add(parsed.nodes[key]);
            this.entities.fNodes.add(parsed.nodes[key]);
            this.entityDeltas.nodes[this.cursor][key] = null;
        }
        for (const key of edgesToAdd) {
            this.entities.edges.add(parsed.edges[key]);
            this.entities.fEdges.add(parsed.edges[key]);
            this.entityDeltas.edges[this.cursor][key] = null;
        }

        // entities that stay, (nodes & edges to update)
        const nodesToUpd = difference(this.currentEntityKeys.nodes, nodesToRem);
        const edgesToUpd = difference(this.currentEntityKeys.edges, edgesToRem);

        /*
        currentEntityKeys.nodes =
            union(nodesToAdd, difference(currentEntityKeys.nodes, nodesToRem));
        currentEntityKeys.edges =
            union(edgesToAdd, difference(currentEntityKeys.edges, edgesToRem));
        */
        this.currentEntityKeys.nodes = union(nodesToAdd, nodesToUpd);
        this.currentEntityKeys.edges = union(edgesToAdd, edgesToUpd);


        for (const key of nodesToUpd) {
            const ow = overwritten(
              parsed.nodes[key],
              this.entities.fNodes.get(key)
            );
            if(typeof ow !== 'undefined')
                this.entityDeltas.nodes[this.cursor][key] = ow;

            this.entities.nodes.update(parsed.nodes[key]);
            this.entities.fNodes.update(parsed.nodes[key]);
        }
        for (const key of edgesToUpd) {
            const ow = overwritten(
              parsed.edges[key],
              this.entities.fEdges.get(key)
            );
            if(typeof ow !== 'undefined')
                this.entityDeltas.edges[this.cursor][key] = ow;

            this.entities.edges.update(parsed.edges[key]);
            this.entities.fEdges.update(parsed.edges[key]);
        }


        // attributes

        // remove nodes and edges, we don't want them in attributes
        // and they are no longer needed
        delete parsed.nodes;
        delete parsed.edges;
        // rename entity attributes when needed
        // global node and edge attributes, nodeDefaults -> nodes, edgeDefaults -> edges
        parsed.nodes = parsed.nodeDefaults;
        parsed.edges = parsed.edgeDefaults;
        delete parsed.nodeDefaults;
        delete parsed.edgeDefaults;

        // deepDiff(current, new) gives only what's different in new compared to current
        // deepDiff is defined as a mixin in lodash-import.html
        const attributeChanges = deepDiff(this.attributes, parsed);
        this.attributeDeltas[this.cursor] = overwritten(attributeChanges, this.attributes);


        //console.log('current: ', attributes);
        //console.log('parsed: ', parsed, ' changes: ', attributeChanges);
        // TODO: queue changes, execute upon my.flushChanges()
        this.network.setOptions(attributeChanges);

        this.cursor += 1;
        return true;
    }

    undo() {
        if(this.cursor === 0) return false;
        this.cursor -= 1;

        const nodesToRem = Object.keys(pick(this.entityDeltas.nodes[this.cursor], isNull));
        const edgesToRem = Object.keys(pick(this.entityDeltas.edges[this.cursor], isNull));
        this.entities.edges.remove(edgesToRem);
        this.entities.fEdges.remove(edgesToRem);
        this.entities.nodes.remove(nodesToRem);
        this.entities.fNodes.remove(nodesToRem);

        const nodesToUpdObjs = pick(
            this.entityDeltas.nodes[this.cursor],
            (x) => { return !isNull(x) }
        );
        const edgesToUpdObjs = pick(
            this.entityDeltas.edges[this.cursor],
            (x) => { return !isNull(x) }
        );

        this.currentEntityKeys.nodes = union(
          Object.keys(nodesToUpdObjs),
          difference(this.currentEntityKeys.nodes, nodesToRem)
        );
        this.currentEntityKeys.edges = union(
          Object.keys(edgesToUpdObjs),
          difference(this.currentEntityKeys.edges, edgesToRem)
        );

        forOwn(nodesToUpdObjs, (value, key) => {
            value['id'] = key;
            this.entities.nodes.update(value);
            this.entities.fNodes.update(value);
        });
        forOwn(edgesToUpdObjs, (value, key) => {
            value['id'] = key;
            this.entities.edges.update(value);
            this.entities.fEdges.update(value);
        });

        this.network.setOptions(this.attributeDeltas[this.cursor]);
        this.flushChanges();
        return true;
    }

    flushChanges() {
        // Flush changes to screen
        this.entities.nodes.flush();
        this.entities.edges.flush();
    }

    fitNetwork(duration) {
        if(typeof duration === 'undefined')
            duration = 3000;

        const options = {
            duration: duration, // ms
            easingFunction: 'easeInOutCubic'
        };
        this.network.fit({ 'animation': options });
    }
}

export default OldNetworkVisualizer;
