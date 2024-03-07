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
    localStorage.setItem(constants.USER, JSON.stringify(_authState?.user));
    await storage.setItem(constants.TOKEN, _authState.token);
  }

  // Saves authState to context and to browser storage
  function setAuthInfo(authInfo) {
    setLoading(true);
    const authItems = {
      user: authInfo?.user,
    };
    setAuthState(authItems);
    saveAuthStateInfo(authItems);
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
