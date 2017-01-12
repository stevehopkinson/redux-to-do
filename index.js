// const expect = require('expect');
const Redux = require('redux');
const React = require('react');
const ReactDOM = require('react-dom');

function counter(state = 0, action) {
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

const Counter = ({ value }) => (
  <h1>{value}</h1>
);

const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()} />,
    document.getElementById('root')
  )
}

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
})
