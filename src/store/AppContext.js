import React from "react";

const AppContext = React.createContext({
    listSights: [],
    first_name: "",
    username: "",
    city: "",
    loggedIn: false,
    handleLogout: () => {},
});

export default AppContext;
