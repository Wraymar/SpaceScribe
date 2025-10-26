import { useEffect, useState } from "react";
import CurrentUserContext from "./current-user-context";
import axios from "../utils/axiosConfig";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  //these are the values we will be passing as context to the pages
  //we will give the pages the current user and the ability to set a new user
  //expecially when they log in or out
  const context = { currentUser, setCurrentUser };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/me");
        setCurrentUser(response.data.user);
      } catch (err) {
        //console.error is used for display errors in red text in the console
        console.error("Something went wrong: ", err);
        setCurrentUser(null);
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
