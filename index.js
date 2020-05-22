function createStore(reducer, initialState) {
  let reducerFunction = reducer;
  let currentState = initialState;
  let listener = () => {};

  return {
    getState() {
      return currentState;
    },
    dispatch(action) {
      currentState = reducerFunction(currentState, action);
      listener();
      return action;
    },
    subscribe(newListener) {
      listener = newListener;
    }
  };
}

/*test example*/
function counter(state = 0, action) {
  let { type } = action;
  switch (type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

let store = createStore(counter);

store.subscribe(() => {
  alert(store.getState());
});

console.log("store", store);

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "INCREMENT" });
