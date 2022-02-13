import React, { useState, useContext } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSubmenuItemsOpen, setIsSubmenuItemsOpen] = useState(false);
  const [text, setText] = useState("");
  const [location, setLocation] = useState({});
  const [createEventFormData, setCreateEventFormData] = useState({});
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text, coordinates) => {
    setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };
  const openSubmenuItems = (text, position) => {
    setLocation(position);
    setText(text)
    setIsSubmenuItemsOpen(true);
  };
  const closeSubmenuItems = () => {
    setIsSubmenuItemsOpen(false);
  };

  const getCreateEventFormData=(obj)=>{
    setCreateEventFormData({...obj})
    console.log(createEventFormData);
  }


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
        getCreateEventFormData
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
