import { useEffect, useState } from "react";
import CurrentUserContext from "./current-user-context";
import axios from "../utils/axiosConfig";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const context = { currentUser, setCurrentUser };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/me");
        setCurrentUser(response.data.user);
      } catch (err) {
        console.error("User not logged in");
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
