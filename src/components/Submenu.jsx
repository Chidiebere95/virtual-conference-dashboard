import React, { useRef, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";

const Submenu = () => {
  const { isSubmenuItemsOpen, location, text,closeSubmenuItems } = useGlobalContext();
  const container = useRef(null);
  useEffect(() => {
    const submenu = container.current;
    const { top, right } = location;
    submenu.style.left = `${right}px`;
    submenu.style.top = `${top}px`;
  }, [location, text]);
  return (
    <aside
      className={`${
        isSubmenuItemsOpen ? "block z-20 fixed top-0 left-0 " : "hidden"
      }`}
      ref={container}
    >
      <div
        className={`${
          text === "home" ? "block w-44 shadow-sm bg-submenu-light text-submenu-purple" : "hidden"
        }`}
      >
        
        <h1
         
          className="pl-3 py-3 text-white cursor-pointer capitalize text-sm font-"
        >
          dashboard
        </h1>
     
        <NavLink to="/" activeStyle={{color:"white"}} exact>
          <h1
            onClick={() => closeSubmenuItems()}
            className="pl-3 py-3 hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4"
          >
            events
          </h1>
        </NavLink>
        <NavLink to="/analytics" activeStyle={{color:"white"}} exact>
          <h1
            onClick={() => closeSubmenuItems()}
            className="pl-3 py-3  hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4"
          >
            analytics
          </h1>
        </NavLink>
        
      </div>
      <div
        className={`${
          text === "event" ? "block w-44 shadow-sm bg-submenu-light text-submenu-purple" : "hidden"
        }`}
      >
        <h1 className="pl-3 py-3 text-white cursor-pointer capitalize text-sm ">
          event
        </h1>
        <NavLink to="/create-event" activeStyle={{color:"white"}} exact>
          <h1
            onClick={() => closeSubmenuItems()}
            className="pl-3 py-3  hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4"
          >
            create event
          </h1>
        </NavLink>
        <NavLink to="/create-ticket" activeStyle={{color:"white"}} exact>
          <h1
            onClick={() => closeSubmenuItems()}
            className="pl-3 py-3 hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4"
          >
            create ticket
          </h1>
        </NavLink>
        <NavLink to="/create-blog" activeStyle={{color:"white"}} exact>
          <h1
            onClick={() => closeSubmenuItems()}
            className="pl-3 py-3  hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4"
          >
           Create blog
          </h1>
        </NavLink>
        
        <NavLink to="/create-speakers" activeStyle={{color:"white"}} exact>
          <h1
            onClick={() => closeSubmenuItems()}
            className="pl-3 py-3 hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4"
          >
           Create Speakers
          </h1>
        </NavLink>
        
        
        <NavLink to="/create-sponsors" activeStyle={{color:"white"}} exact>
          <h1
            onClick={() => closeSubmenuItems()}
            className="pl-3 py-3  hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4"
          >
           Create Sponsors
          </h1>
        </NavLink>
   
              
      </div>
    </aside>
  );
};

export default Submenu;
