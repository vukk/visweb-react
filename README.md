# Visingo-web

Visingo-web is an app for creating visualizations semi-directly from [Answer Set
Programming](https://en.wikipedia.org/wiki/Answer_set_programming) solvers.

The original purpose of the project was to act as an UI that allows interacting
with a solver from the visualization and manually debug and guide the solver
process. The interaction was never realized, but Visingo-web is capable of
taking some ASP solver outputs and visualizing them.

As an example, you might have an ASP program that concerns itself with cycles in
a graph. Let's say it contains a predicate `cycle(A, B)`, then the by mapping
the data to predicates that the visualizer is aware of, like `node(Id)` and
`edge(From, To)` the visualizer can go ahead and show your graph. Such a mapping
could work by `node(A) :- cycle(A, _). node(B) :- cycle(_, B).` and
`edge(A, B) :- cycle(A, B).`.

Controlling some more specific aspects can be done too, like setting the colors
of the nodes, let's say you know a "starting node" encoded as `start(A).`, then
it could be highlighted by showing it in a different color with a rule like
`nodeAttr(A, color, "#ff00ff") :- start(A).`.

## Visualizing answer sets

See the "Getting started" section of the [help](http://users.ics.aalto.fi/kuuranne/visingo-web/help.html).

## Installing & development

Visingo-web is a client-side JavaScript application.

For first steps, see the docs of [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
With prerequisites installed, run `yarn start` in the project folder.

### Available Scripts

`yarn start`, `yarn test`, `yarn run build`

In development mode (`yarn start`) the app is available at
[http://localhost:3000](http://localhost:3000) and is hot reloaded.

Production builds go to the `build` folder.

## Authors

* **vukk** - *Initial Polymer version, porting to React* - [vukk](https://github.com/vukk)

## Built With

* [React](https://reactjs.org/)
* [Create React App](https://facebook.github.io/create-react-app/)
* [Redux](https://redux.js.org/)
* [Redux-Saga](https://redux-saga.js.org/)
* [vis.js](http://visjs.org/)
* [styled components](https://www.styled-components.com/)
* [PEG.js](https://pegjs.org/)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* This project relies on the hard work of others who build high quality
  visualization libraries, like [vis.js](http://visjs.org/)
* Computational Logic research group at Aalto University School of Science
  <https://www.aalto.fi/department-of-computer-science/computational-logic>,
  especially Martin Gebser & Tomi Janhunen.
