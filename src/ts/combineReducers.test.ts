import { combineReducers, ReducersMap } from "./combineReducers";

describe("combineReducers", () => {
  it("is a function", () => {
    expect(combineReducers).toBeInstanceOf(Function);
  });

  it("returns a function", () => {
    const config = {};
    expect(combineReducers(config)).toBeInstanceOf(Function);
  });

  it("returns a reducer based on the config (initial state)", () => {
    const reducer = combineReducers({
      a: (state = { a: 2 }) => state,
      b: (state = { b: "hop" }) => state,
    });
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      a: { a: 2 },
      b: { b: "hop" },
    });
  });

  it("calls subreducers with proper values", () => {
    type State = { a: number; b: number };
    const config: ReducersMap = {
      a: jest.fn((state = { a: 5 }, action) => state + action.payload),
      b: jest.fn(
        (state = { a: 6 }, action) => state + action.payload + action.payload
      ),
    };
    const reducer = combineReducers(config);

    const state: State = {
      a: 55,
      b: 66,
    };
    const action1 = { type: "test", payload: 1 };
    const newState1 = reducer(state, { type: "test", payload: 1 });

    expect(config.a).toHaveBeenCalledWith(55, action1);
    expect(config.b).toHaveBeenCalledWith(66, action1);

    expect(newState1).toEqual({
      a: 56,
      b: 68,
    });

    const action2 = { type: "test", payload: 2 };
    const newState2 = reducer(newState1, action2);
    expect(config.a).toHaveBeenCalledWith(56, action2);
    expect(config.b).toHaveBeenCalledWith(68, action2);
    expect(newState2).toEqual({
      a: 58,
      b: 72,
    });
  });
});
