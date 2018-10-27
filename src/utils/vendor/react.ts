import React from 'react';

declare module 'react' {
  function useState<T>(
    initialState: T | ((s: T) => T),
  ): [T, (s: T) => T];
  function useReducer(...args: any[]): any;
  function useContext(...args: any[]): any;
  function useMemo(...args: any[]): any;
  function memo(...args: any[]): any;
}

export {
  React,
};
