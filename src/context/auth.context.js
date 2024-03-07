import { createContext, useState, useCallback } from "react";
import { constants } from "../utils/constants";
import { storage } from "../utils/helpers";
const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useCallback(() => {
    if (!authState?.user) {
      return false;
    }
    return true;
  }, [authState]);

  async function saveAuthStateInfo(_authState) {
    localStorage.setItem(constants.USER, JSON.stringify(_authState));
    await storage.setItem(constants.USER, _authState);
  }

  // Saves authState to context and to browser storage
  function setAuthInfo(authInfo) {
    setLoading(true);
    setAuthState(authInfo);
    saveAuthStateInfo(authInfo);
    setLoading(false);
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: setAuthInfo,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
