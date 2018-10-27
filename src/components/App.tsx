import { React } from 'utils/vendor/react';
import { useReducer, useContext, useMemo } from 'react';

const initialState = { count: 0 };

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + (action.payload || 1) };
    case 'decrement':
      return { count: state.count - 1 };
    case 'nop': return state;
    default: return state;
  }
}

const increment = (payload: number) => ({ payload, type: 'increment' });

const useActions = (sourceActions: any) => {
  return React.useMemo(() => {

    const dispatch = useContext(ActionsContext);
    const actions: any = {};

    Object.keys(sourceActions).forEach((key) => {
      actions[key] = (...args: any[]) => dispatch(sourceActions[key](...args));
    });

    return {
      dispatch,
      actions,
    };
  }, []);
};

const useActionsConnector = () => useMemo(() => ({
  ...useActions({ increment }),
}), [increment]);

const StateContext = React.createContext<any>(initialState);
const ActionsContext = React.createContext<any>({});

// tslint:disable:jsx-no-lambda
const Counter: React.SFC = () => {
  const { actions } = useActionsConnector();
  const state = useContext(StateContext);

  return (
    <div>
      just Counter: {state.count}
      <button onClick={() => actions.increment(10)}>plus again</button>
    </div>
  );
};

// tslint:disable:jsx-no-lambda
const MainCounter: React.SFC = () => {
  const dispatch = useContext(ActionsContext);

  console.log('main counter');

  return (
    <div>
      Main Counter
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'nop' })}>
        Nop
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
};

const MainCounterMemo = React.memo(MainCounter);
const CounterMemo = React.memo(Counter);

// tslint:disable:jsx-no-lambda
const App: React.SFC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('App');

  return (
    <>
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={dispatch}>
          <MainCounterMemo />
          <CounterMemo />
        </ActionsContext.Provider>
      </StateContext.Provider>
    </>
  );
};

export default App;
