import React, { createContext, useContext, useState } from 'react';

interface ContextProps {
  loading: boolean;

  setLoading(_value: boolean): void;
}

const Loading = createContext<ContextProps>({} as ContextProps);

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Loading.Provider value={{ loading, setLoading }}>
      {children}
    </Loading.Provider>
  );
};

function useLoading() {
  const context = useContext(Loading);

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  return context;
}

export { LoadingProvider, useLoading };
