type Action = {
  type: string;
  [key: string]: any;
};

type State = {
  [key: string]: any;
};

type Reducer = {
  (state: State | undefined, action: Action): State;
};

export type ReducersMap = {
  [key: string]: Reducer;
};

export function combineReducers(config: ReducersMap) {
  return function reducer(state: State | undefined, action: Action) {
    const newState: State = {};
    Object.entries(config).forEach(([stateKey, nestedReducer]) => {
      if (!state) {
        newState[stateKey] = nestedReducer(state, action);
      } else {
        newState[stateKey] = nestedReducer(state[stateKey], action);
      }
    });
    return newState;
  };
}
