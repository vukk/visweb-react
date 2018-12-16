import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React from 'react';
import styled from 'styled-components';

import Link from 'redux-first-router-link';

import actions from './actions';

import PageBase from '../../common/components/PageBase';
import Button from '../../common/components/Button';
import Title from '../../common/components/Title';
import WrapTop from '../../common/components/WrapTop';

import Header from '../header';

import visualizers from './visualizers';

const Contents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const TitleWrapper = styled.div`max-width: 60%;`;

const NewButton = () => <>
    <Link to="/" key="new">
      <Button primary>
        New visualization
      </Button>
    </Link>
  </>;

const CantLoadVisualizer = () =>
  <>
    <TitleWrapper><Title large>Error: can't load visualizer</Title></TitleWrapper>
    <NewButton />
  </>;

const CantLoadControls = () =>
  <>Error: can't load controls</>;

const Visualize = props => {
  // TODO FIX: Not efficient in the render func

  let data;
  let options;
  let gotVis = false;
  // Do we have a new visualization, data & options in redux?
  const newVis = props.visualize && props.visualize.options && props.visualize.options.visualizer;
  // Save data to localstorage, if we do
  if (newVis) {
    gotVis = true;
    window.localStorage['visingo-web'] = JSON.stringify({
      data: props.visualize.data,
      options: props.visualize.options,
    });
    data = props.visualize.data;
    options = props.visualize.options;
  } else if (window.localStorage['visingo-web']) {
    gotVis = true;
    const hydrated = JSON.parse(window.localStorage['visingo-web']);
    // Try loading data from localstorage, if we don't have it in redux
    data = hydrated.data;
    options = hydrated.options;
  }

  // console.log('DATA', data, 'OPTIONS', options, newVis, gotVis, props);

  // Try loading data from localstorage, if we don't have it in redux
  const Component = gotVis && visualizers.components.visualizers[options.visualizer]
    ? visualizers.components.visualizers[options.visualizer]
    : CantLoadVisualizer;
  const Controls = gotVis && visualizers.components.controls[options.visualizer]
    ? visualizers.components.controls[options.visualizer]
    : CantLoadControls;
  // if (gotVis && visualizers.actions[options.visualizer] && visualizers.actions[options.visualizer].setup) {
  //   props.dispatch(visualizers.actions[options.visualizer].setup(data, options));
  // }
  return <PageBase className={props.className}>
    <WrapTop content={<Header openMenu={props.openMenu} controls={<Controls />} />}>
      <Contents>
        {gotVis
          ? <Component
              options={options}
              data={data}
              ready={props.ready}
              destroy={props.destroy}
            />
          : <>
              <TitleWrapper>
                <Title large>Error: visualizer not set</Title>
              </TitleWrapper>
              <NewButton />
            </>
        }
      </Contents>
    </WrapTop>
  </PageBase>;
}

// TODO: NETWORKVIS -> REACT FORCEDIRECTGRAPH
//       https://github.com/vasturiano/react-force-graph/blob/master/example/dynamic/index.html

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Visualize);
