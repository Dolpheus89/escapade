import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Your login logic here, could set isLoggedIn to true and handle token storage
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Your logout logic here, could clear token and reset state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
