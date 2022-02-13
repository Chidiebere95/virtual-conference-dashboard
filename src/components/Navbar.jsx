import React, {  useEffect } from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import img from "../images/navbar/nav-img.jpg";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const { isSubmenuOpen, openSubmenu, closeSubmenu, closeSubmenuItems } =
    useGlobalContext();
  // console.log(isSubmenuOpen);
  useEffect(() => {}, []);

  const handleSubmenu = () => {
    if (isSubmenuOpen) {
      closeSubmenu();
    } else {
      openSubmenu();
    }
  };

  return (
    <nav
      onMouseOver={() => closeSubmenuItems()}
      className="h-20 fixed top-0 left-0 right-0 border-t-nav  border-gray-500 z-50 bg-white"
    >
      <div className="flex justify-between h-full ">
        <div className="flex    ">
          <div
            className={`${
              isSubmenuOpen
                ? "bg-dark  transit-nav logo text-2xl font-bold text-white  overflow-hidden w-16  md:w-72 flex items-center justify-start px-8"
                : "bg-dark  transit-nav logo text-2xl font-bold text-white  w-16 flex items-center justify-center"
            }`}
          >
            <h1
              className={`${
                isSubmenuOpen
                  ? "text-lg font-bold hidden"
                  : "text-lg font-bold block "
              }`}
            >
              D
            </h1>
            <h1
              className={`${
                isSubmenuOpen ? "hidden md:block text-lg" : "hidden"
              }`}
            >
              DLAB
            </h1>
          </div>
        </div>
        <div className="  flex justify-between flex-1  shadow-sm">
          <div className="flex flex-1">
            <div className="w-16 md:w-20 flex items-center justify-center border-r-nav  font-extralight">
              <FaBars
                onClick={handleSubmenu}
                className="text-purple-500 font-extralight bg-transparent text-2xl cursor-pointer  "
              />
            </div>
            <div className="flex items-center px-3  ">
              <FaSearch className="cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-1  justify-end">
            <button className="hidden md:block mx-5 my-auto rounded bg-purple-light-2 text-white capitalize px-5 py-2">
              create event
            </button>
            <div className="w-16 md:w-20 flex items-center justify-center border-l-nav border-r-nav">
              <FaBell className="text-purple-500 font-extralight bg-transparent text-xl   " />
            </div>
            <div className="ml-5 mr-10 flex  items-center justify-center img-container w-10 h-10 border-radius object-contain overflow-hidden my-auto border-b-nav">
              <img className=" " src={img} alt="nav-img" />
            </div>
          </div>
        </div>

        {/* <div className="flex"></div> */}
      </div>
    </nav>
  );
};

export default Navbar;
