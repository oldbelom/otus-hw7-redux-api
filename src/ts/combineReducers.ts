type NewState = {
  [key: string]: () => object;
};

type State = {
  [key: string]: any;
};

export function combineReducers(config: object) {
  return function reducer(state: State | undefined, action: object) {
    const newState: NewState = {};
    Object.entries(config).forEach(([stateKey, nestedReducer]) => {
      if (state === undefined) {
        newState[stateKey] = nestedReducer(undefined, action);
      } else {
        newState[stateKey] = nestedReducer(state[stateKey], action);
      }
    });
    return newState;
  };
}
