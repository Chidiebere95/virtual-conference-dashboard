import React, { useState } from "react";
import { FaChevronRight, FaEnvelope, FaHome } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Sidebar = () => {
  const {
    isSubmenuOpen,
    closeSubmenuItems,
    openSubmenuItems,
  } = useGlobalContext();
  const [toggleDashboard, setToggleDashboard] = useState(false);
  const [toggleEvent, setToggleEvent] = useState(false);
  const handleDashboard = () => {
    setToggleDashboard((prevState) => !prevState);
    if (toggleEvent) {
      setToggleEvent(false);
    }
  };
  const handleEvent = () => {
    setToggleEvent((prevState) => !prevState);
    if (toggleDashboard) {
      setToggleDashboard(false);
    }
  };
  const displaySubmenu = (e) => {
    const text = e.currentTarget.getAttribute("data-id");
    const { top, right } = e.currentTarget.getBoundingClientRect();
    openSubmenuItems(text, { top, right });
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("submenuitems-btn")) {
      closeSubmenuItems();
    }
  };



  return (
   
        <div 
          className={`${
            isSubmenuOpen
              ? " absolute left-0 top-0 bottom-0 flex flex-col   bg-dark transit-submenu w-72 z-10"
              : "absolute flex flex-col  left-0 top-0 bottom-0 bg-dark  transit-submenu w-16"
          }`}
        >
          <div
            className={`${
              isSubmenuOpen
                ? "hidden"
                : " flex flex-col bg-dark text-submenu-purple"
            }`}
          >
            <div
              data-id="home"
              onMouseOver={displaySubmenu}
              className="submenuitems-btn flex items-center justify-center cursor-pointer "
            >
              <FaHome className=" text-lg h-16 submenuitems-btn" />
            </div>
            <div
              data-id="event"
              onMouseOver={displaySubmenu}
              
              className="submenuitems-btn flex items-center justify-center cursor-pointer  "
            >
              <FaEnvelope className=" text-lg h-16 submenuitems-btn" />
            </div>
          </div>
          <div
            onMouseOver={handleSubmenu}
            className={`${isSubmenuOpen ? "hidden " : "block h-full  "}`}
          ></div>
          <div className={`${isSubmenuOpen ? "block bg-dark " : "hidden "}`}>
            <h1 className="uppercase px-6 pt-4 text-xs text-submenu-purple tracking-widest">
              navigation
            </h1>
            <div className="">
              <div
                onClick={handleDashboard}
                className="cursor-pointer flex items-center justify-between pl-6 pr-4 py-4"
              >
                <div className="flex items-center gap-x-2 text-submenu-purple">
                  <FaHome />
                  <h1 className="capitalize text-submenu-light">dashboard</h1>
                </div>
                <FaChevronRight
                  className={`${
                    toggleDashboard
                      ? "transform rotate-90 transit"
                      : "transform rotate-0 transit "
                  } text-submenu-purple`}
                />
              </div>
              <ul
                className={`${
                  toggleDashboard
                    ? "px-10 text-submenu-purple transit overflow-hidden list-disc h-28 "
                    : "px-10 list-disc transit overflow-hidden h-0"
                } bg-submenu-light`}
              >
                <li className=" py-4 capitalize transition-none hover:text-white cursor-pointer ">
                  event
                </li>
                <li className=" py-4 capitalize transition-none hover:text-white cursor-pointer">
                  analytics
                </li>
              </ul>
            </div>
            <div className="">
              <div
                onClick={handleEvent}
                className="cursor-pointer flex items-center justify-between pl-6 pr-4 py-4"
              >
                <div className="flex items-center gap-x-2 text-submenu-purple">
                  <FaHome />
                  <h1 className="capitalize text-submenu-light">event</h1>
                </div>
                <FaChevronRight
                  className={`${
                    toggleEvent
                      ? "transform rotate-90 transit"
                      : "transform rotate-0 transit "
                  } text-submenu-purple`}
                />
              </div>
              <ul
                className={`${
                  toggleEvent
                    ? "px-10 text-submenu-purple transit overflow-hidden list-disc h-56 "
                    : "px-10 list-disc transit overflow-hidden h-0"
                } bg-submenu-light`}
              >
                <li className=" py-4 capitalize transition-none">
                  {/* <Link to="#"> create event</Link> */}
                  create event
                </li>
                <li className=" py-4 capitalize transition-none">
                  {/* <Link to="#"> create ticket</Link> */}
                  create ticket
                </li>
                <li className=" py-4 capitalize transition-none">
                  {/* <Link to="#"> guest</Link> */}
                  guest
                </li>
                <li className=" py-4 capitalize transition-none">
                  {/* <Link to="#"> blank</Link> */}
                  blank
                </li>
              </ul>
            </div>
          </div>
        </div>
      
    
  );
};

export default Sidebar;
