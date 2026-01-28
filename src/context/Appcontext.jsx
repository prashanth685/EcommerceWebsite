import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appcontext = createContext();

export const AppcontextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [isSeller, setisSeller] = useState(null);

  const value = { navigate, user, setuser, setisSeller, isSeller };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
