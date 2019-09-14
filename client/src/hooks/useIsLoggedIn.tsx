import React, {
  Dispatch, SetStateAction, useState, useContext, createContext,
} from 'react';

type IsLoggedInContext = [
  boolean,
  Dispatch<SetStateAction<boolean>> | null,
];
const isLoggedInContext = createContext<IsLoggedInContext>([false, null]);

// Provider hook that creates isLoggedIn object and handles state
const useProvideIsLoggedIn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return [isLoggedIn, setLoggedIn];
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useIsLoggedIn = () => useContext(isLoggedInContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const IsLoggedInProvider: React.FC = ({ children }) => {
  const value = useProvideIsLoggedIn();
  return (
    <isLoggedInContext.Provider value={value as IsLoggedInContext}>
      {children}
    </isLoggedInContext.Provider>
  );
};
