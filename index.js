// const expect = require('expect');
const Redux = require('redux');
const React = require('react');
const ReactDOM = require('react-dom');
const Expect = require('expect');
const DeepFreeze = require('deep-freeze');

const counter = (state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
};

const addCounter = (list) => {
  return [...list, 0];
};

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
}

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
}

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];
  DeepFreeze(listBefore);
  Expect(addCounter(listBefore)).toEqual(listAfter);
}

const testRemoveCounter = () => {
  const listBefore = [1, 2, 3];
  const listAfter = [1, 3];
  DeepFreeze(listBefore);
  Expect(removeCounter(listBefore, 1)).toEqual(listAfter);
}

const testIncrementCounter = () => {
  const listBefore = [0, 0, 0];
  const listAfter = [0, 1, 0];
  DeepFreeze(listBefore);
  Expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
}

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => {store.dispatch({ type: 'INCREMENT' })}}
      onDecrement={() => {store.dispatch({ type: 'DECREMENT' })}}
    />,
    document.getElementById('root')
  )
}

store.subscribe(render);
render();

testAddCounter();
testRemoveCounter();
testIncrementCounter();
