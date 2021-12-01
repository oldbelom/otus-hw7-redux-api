export type Store<
  State = Record<string, unknown>,
  Action = { type: string }
> = {
  getState(): State;
  dispatch(action: Action): void;
  subscribe(cb: () => void): () => void;
};

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action
) => State;

export type createStore<State, Action> = (
  reducer: Reducer<State, Action>,
  preloadedState?: State | undefined
) => Store<State, Action>;

export function createStore<State, Action>(
  reducer: Reducer<State, Action>,
  preloadedState?: State | undefined
) {
  let state = preloadedState;
  let subscribers: Set<() => void> = new Set();
  return {
    getState: () => state,
    dispatch: (action: Action) => {
      state = reducer(state, action);
      subscribers.forEach((callBack) => callBack());
    },
    subscribe: (callBack: () => void) => {
      subscribers.add(callBack);
      return () => {
        subscribers = new Set(
          Array.from(subscribers).filter((item) => item !== callBack)
        );
      };
    },
  };
}
