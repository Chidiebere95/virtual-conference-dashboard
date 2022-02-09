import React, { useState, useContext } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSubmenuItemsOpen, setIsSubmenuItemsOpen] = useState(false);
  const [text, setText] = useState("");
  const [location, setLocation] = useState({});
  // console.log(isSubmenuItemsOpen);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text, coordinates) => {
    // const page = sublinks.find((link) => link.page === text);
    // setPage(page);
    // setLocation(coordinates);
    setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };
  const openSubmenuItems = (text, position) => {
    setLocation(position);
    setText(text)
    setIsSubmenuItemsOpen(true);
    // console.log(location);
    // console.log(isSubmenuItemsOpen);
  };
  const closeSubmenuItems = () => {
    setIsSubmenuItemsOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        isSubmenuItemsOpen,
        openSubmenuItems,
        closeSubmenuItems,
        text,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
