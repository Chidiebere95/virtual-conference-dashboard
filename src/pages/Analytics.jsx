import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBarcode,
  FaChevronRight,
  FaComment,
  FaEnvelope,
  FaHeart,
  FaHome,
  FaPencilAlt,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import img1 from "../images/analytics/analytics-1.png";
import img2 from "../images/analytics/analytics-2.png";
import img3 from "../images/analytics/analytics-3.png";
import img4 from "../images/analytics/analytics-chart-1.png";
import img5 from "../images/analytics/analytics-chart-2.png";
import img6 from "../images/analytics/analytics-chart-3.png";
import img7 from "../images/analytics/svg.PNG";
import email from "../images/analytics/email-analytics.png";
import ticket from "../images/analytics/ticket-analytics.png";
import ursula from "../images/analytics/ursula.png";
import alan from "../images/analytics/alan.png";
import lurch from "../images/analytics/lurch.png";
import people from "../images/analytics/people.jpg";

const Analytics = () => {
  const {
    isSubmenuOpen,
    isSubmenuItemsOpen,
    openSubmenu,
    closeSubmenuItems,
    openSubmenuItems,
  } = useGlobalContext();
  //   console.log(isSubmenuItemsOpen);
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
    const text = e.currentTarget.getAttribute("data-id");
    const { top, right } = e.currentTarget.getBoundingClientRect();
    if (!e.target.classList.contains("submenuitems-btn")) {
      closeSubmenuItems();
    }
    
  };
  // const container = useRef(null);

  const [toggleDigital, setToggleDigital] = useState(false);
  const [toggleUi, setToggleUi] = useState(false);
  const [toggleFrontEnd, setToggleFrontEnd] = useState(false);

  const handleDigital = () => {
    setToggleDigital((prevState) => !prevState);
    if (toggleUi) {
      setToggleUi(false);
    }
    if (toggleFrontEnd) {
      setToggleFrontEnd(false);
    }
  };
  const handleUi = () => {
    setToggleUi((prevState) => !prevState);
    if (toggleDigital) {
      setToggleDigital(false);
    }
    if (toggleFrontEnd) {
      setToggleFrontEnd(false);
    }
  };
  const handleFrontEnd = () => {
    setToggleFrontEnd((prevState) => !prevState);
    if (toggleUi) {
      setToggleUi(false);
    }
    if (toggleDigital) {
      setToggleDigital(false);
    }
  };

  return (
    <div className="mt-20 ">
      <div className="flex  relative">
        {/* submenu */}
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
              onClick=""
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
                <li className=" py-4 capitalize transition-none hover:text-white cursor-pointer ">event</li>
                <li className=" py-4 capitalize transition-none hover:text-white cursor-pointer">analytics</li>
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
                  {/* <Link to="#"> create event</Link> */}
                  create ticket
                </li>
                <li className=" py-4 capitalize transition-none">
                  {/* <Link to="#"> create event</Link> */}
                  guest
                </li>
                <li className=" py-4 capitalize transition-none">
                  {/* <Link to="#"> create event</Link> */}
                  blank
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* main page */}
        <div
          onMouseOver={() => closeSubmenuItems()}
          className="ml-16 bg-gray-main flex-1"
        >
          <div className="px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  ">
            <div className="mt-4 ">
              <section className="mb-8 bg-white p-4 flex flex-col sm:flex-row justify-between shadow-sm gap-y-2 text-gray-light-2">
                <h1 className="font-semibold capitalize ">
                  hi, <span className="font-normal  text-sm">welcome</span>
                </h1>
                <div className="flex gap-x-1 items-center ">
                  <button className="bg-transparent capitalize hover:text-purple-light">home</button>
                  {/* <FaChevronRight/> */}
                  <i className="">{">"}</i>
                  <button className="bg-transparent capitalize  hover:text-purple-light">
                    dashboard
                  </button>
                </div>
              </section>


              <section className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-8">
                {/* single item */}
                <div className="">
                  <div className="img-container h-40 w-full bg-purple-light object-cover rounded-md">
                    {/* replace with chart */}
                    <img src={img1} alt="" className="" />
                  </div>
                  <div className="w-11/12 mx-auto rounded-b shadow-sm p-3 px-6 flex justify-between items-start bg-white">
                    <div className="capitalize">
                      <h1 className="font-normal mb-2 text-lg tracking-wide text-gray-main">
                        online sales
                      </h1>
                      <h5 className="text-gray-light flex items-center gap-x-1">
                        sales of this month <span>|</span> <span>45% </span>
                        <FaArrowUp className="text-green-500" />
                      </h5>
                    </div>
                    <h1 className="text-2xl font-normal flex items-center text-gray-main">
                      <span className="">$</span> 260
                    </h1>
                  </div>
                </div>

                {/* single item */}
                <div className="">
                  <div className="img-container h-40 w-full bg-green-light object-cover rounded-md">
                    {/* replace with chart */}

                    <img src={img2} alt="" className="" />
                  </div>
                  <div className="w-11/12 mx-auto rounded-b shadow-sm p-3 px-6 flex justify-between items-start bg-white">
                    <div className="capitalize">
                      <h1 className="font-normal mb-2 text-lg tracking-wide text-gray-main">
                        Total Earning
                      </h1>
                      <h5 className="text-gray-light flex items-center gap-x-1">
                        earning of this month <span>|</span> <span>4% </span>
                        <FaArrowDown className="text-red-500" />
                      </h5>
                    </div>
                    <h1 className="text-2xl font-normal flex items-center text-gray-main">
                      <span className="">$</span> 950
                    </h1>
                  </div>
                </div>

                {/* single item */}
                <div className="">
                  <div className="img-container h-40 w-full bg-blue-light object-cover rounded-md">
                    {/* replace with chart */}
                    <img src={img3} alt="" className="" />
                  </div>
                  <div className="w-11/12 mx-auto rounded-b shadow-sm p-3 px-6 flex justify-between items-start bg-white">
                    <div className="capitalize">
                      <h1 className="font-normal mb-2 text-lg tracking-wide text-gray-main">
                        total profit
                      </h1>
                      <h5 className=" flex items-center gap-x-1 text-gray-light">
                        profit of this month <span>|</span> <span>4% </span>
                        <FaArrowDown className="text-red-500" />
                      </h5>
                    </div>
                    <h1 className="text-2xl font-normal flex items-center text-gray-main">
                      <span className="">$</span> 2050
                    </h1>
                  </div>
                </div>
              </section>


              <section className=" mb-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-10 gap-x-8 ">
                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 text-gray-main border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                      event goals
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 text-gray-light-2">
                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-semibold text-sm  tracking-wide">
                          Wordpress Theme Development
                        </h1>
                        <span className="font-bold text-gray-main">
                          85%
                        </span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-200 ">
                        <div className="w-9/12 h-1 bg-purple-600 rounded"></div>
                        <div className="w-3/12 h-1 bg-gray "></div>
                      </div>
                    </div>

                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-semibold text-sm  tracking-wide">
                          UI Design
                        </h1>
                        <span className="font-bold text-gray-main">
                          65%
                        </span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-200 ">
                        <div className="w-7/12 h-1 bg-green-600 rounded"></div>
                        <div className="w-5/12 h-1 bg-gray "></div>
                      </div>
                    </div>

                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-semibold text-sm tracking-wide">
                          Digital Marketing
                        </h1>
                        <span className="font-bold text-gray-main">
                          65%
                        </span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-200 ">
                        <div className="w-7/12 h-1 bg-purple-600 rounded"></div>
                        <div className="w-5/12 h-1 bg-gray "></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 text-gray-main border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                    Bloomreach Connect
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="img-container h-36 w-36 mx-auto  flex items-center justify-center relative object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img4} alt="chart" className="" />
                      <div className=" absolute top-1/2 transform -translate-y-1/2 flex items-center gap-x-2 text-gray-light-2">
                        <FaUser />
                        <span className="font-normal">960</span>
                      </div>
                    </div>
                    <h1 className="text-center capitalize font-normal text-gray-main">
                      attend
                    </h1>
                  </div>
                </div>

                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 text-gray-main border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                    Tech Inclusion
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="img-container h-36 w-36 mx-auto  flex items-center justify-center relative object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img5} alt="chart" className="" />
                      <div className=" absolute top-1/2 transform -translate-y-1/2 flex items-center gap-x-2 text-gray-light-2">
                        <FaUser />
                        <span className="font-normal">1250</span>
                      </div>
                    </div>
                    <h1 className="text-center capitalize font-normal text-gray-main">
                      attended
                    </h1>
                  </div>
                </div>

                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                    Presto Summit
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="img-container h-36 w-36 mx-auto  flex items-center justify-center relative object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img6} alt="chart" className="" />
                      <div className=" absolute top-1/2 transform -translate-y-1/2 flex items-center gap-x-2 text-gray-light-2">
                        <FaUser />
                        <span className="font-normal">100</span>
                      </div>
                    </div>
                    <h1 className="text-center capitalize font-normal text-gray-main">
                      ongoing
                    </h1>
                  </div>
                </div>
              </section>
              
              <section className="mb-8 flex flex-col xl:flex-row xl:items-start  gap-y-10 gap-x-8">
                {/* single item */}
                <div className="rounded bg-white shadow-sm xl:w-8/12 ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                      Sales Overview
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="grid grid-cols-3 mb-6 ">
                      <div className="">
                        <h5 className="capitalize text-gray-light-2 mb-1">
                          ticket 1
                        </h5>
                        <h1 className="text-lg font-normal text-gray-main">
                          <span>$</span>5550.00
                        </h1>
                      </div>
                      <div className="">
                        <h5 className="capitalize text-gray-light-2 mb-1">
                          ticket 2
                        </h5>
                        <h1 className="text-lg font-normal text-gray-main">
                          <span>$</span>6550.00
                        </h1>
                      </div>
                      <div className="">
                        <h5 className="capitalize text-gray-light-2 mb-1">
                          ticket 3
                        </h5>
                        <h1 className="text-lg font-normal text-gray-main">
                          <span>$</span>7540.00
                        </h1>
                      </div>
                    </div>
                    <div className="img-container h-96   flex items-center justify-center relative object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img7} alt="" className="h-full w-full" />
                    </div>
                  </div>
                </div>

                {/* single item */}
                <div className="rounded bg-white shadow-sm xl:w-4/12 ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                      Upcoming Events
                    </h1>
                  </div>
                  <div className="pt-9 pb-9 px-14 ">
                    <a href="" className="">
                      <div className=" border-l-2 border-gray-100 text-gray-light-2 hover:text-purple-light flex gap-x-6 ">
                        <div className="h-4 w-4 rounded-full bg-purple-light m-left "></div>
                        <div className="pb-4">
                          <h5 className="flex gap-x-1  capitalize mb-1 ">
                            january 22, monday <span className="">|</span>
                            <span className="uppercase">11:00 am</span>
                          </h5>
                          <h5 className="text-lg font-semibold capitalize mb-1 ">
                            digital marketing
                          </h5>
                          <button className="py-1 px-3  bg-red-light text-white text-xs capitalize">
                            Sold out
                          </button>
                        </div>
                      </div>
                    </a>

                    <a href="" className="">
                      <div className="border-l-2 border-gray-100 text-gray-light-2 hover:text-purple-light flex gap-x-6 ">
                        <div className="h-4 w-4 rounded-full bg-green-light m-left mt-1"></div>
                        <div className="pb-4">
                          <h5 className="flex gap-x-1  capitalize mb-1 ">
                            january 22, monday <span className="">|</span>
                            <span className="uppercase">11:00 am</span>
                          </h5>
                          <h5 className="text-lg font-semibold capitalize mb-1 ">
                            5 orders delivered
                          </h5>
                          <button className="py-1 px-3  bg-yellow-light text-white text-xs capitalize">
                            Pending
                          </button>
                        </div>
                      </div>
                    </a>

                    <a href="" className="">
                      <div className="border-l-2 border-gray-100 text-gray-light-2 hover:text-purple-light flex gap-x-6 ">
                        <div className="h-4 w-4 rounded-full bg-yellow-light m-left mt-1"></div>
                        <div className="pb-4">
                          <h5 className="flex gap-x-1  capitalize mb-1 ">
                            january 22, monday <span className="">|</span>
                            <span className="uppercase">11:00 am</span>
                          </h5>
                          <h5 className="text-lg font-semibold capitalize mb-1 ">
                            3 new tickets
                          </h5>
                          <button className="py-1 px-3  bg-red-light text-white text-xs capitalize">
                            Sold out
                          </button>
                        </div>
                      </div>
                    </a>

                    <a href="" className="">
                      <div className="border-l-2 border-gray-100 text-gray-light-2 hover:text-purple-light flex gap-x-6 ">
                        <div className="h-4 w-4 rounded-full bg-purple-light m-left mt-1"></div>
                        <div className="pb-4">
                          <h5 className="flex gap-x-1  capitalize mb-1 ">
                            january 22, monday <span className="">|</span>
                            <span className="uppercase">11:00 am</span>
                          </h5>
                          <h5 className="text-lg font-semibold capitalize mb-1 ">
                            8 new reviews
                          </h5>
                          <button className="py-1 px-3  bg-green-light text-white text-xs capitalize">
                            Free
                          </button>
                        </div>
                      </div>
                    </a>

                    <a href="" className="">
                      <div className="border-l-2 border-gray-100 text-gray-light-2 hover:text-purple-light flex gap-x-6 ">
                        <div className="h-4 w-4 rounded-full bg-gray-600 m-left mt-1"></div>
                        <div className="">
                          <h5 className="flex gap-x-1  capitalize mb-1 ">
                            january 22, monday <span className="">|</span>
                            <span className="uppercase">11:00 am</span>
                          </h5>
                          <h5 className="text-lg font-semibold capitalize mb-1 ">
                            50 new facebook likes
                          </h5>
                          <button className="py-1 px-3  bg-purple-light-2 text-white text-xs capitalize">
                            Pending
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8 flex flex-col lg:flex-row flex-wrap   xl:grid  xl:grid-cols-3 gap-y-10 gap-x-8 lg:items-start">
                {/* single grid item */}
                <div className="rounded bg-white shadow-sm  lg:flex-1">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                      Email Campaign
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="img-container h-60   flex items-center justify-center relative object-contain mb-12">
                      {/* replace with chart */}
                      <img src={email} alt="email" className="w-full h-full " />
                    </div>

                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-normal text-sm text-gray-light-2 tracking-wide">
                          Send Emails
                        </h1>
                        <span className="font-bold text-gray-light-2">
                          +125
                        </span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-100 ">
                        <div className="w-9/12 h-1 bg-purple-light rounded"></div>
                        <div className="w-3/12 h-1 bg-gray "></div>
                      </div>
                    </div>

                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-semibold text-sm text-gray-light-2 tracking-wide">
                          Clicks
                        </h1>
                        <span className="font-bold text-gray-light-2">
                          1800
                        </span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-100 ">
                        <div className="w-9/12 h-1 bg-purple-light rounded"></div>
                        <div className="w-3/12 h-1 bg-gray "></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* single grid item */}
                <div className="rounded bg-white shadow-sm lg:flex-1  p ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                      tickets sold
                    </h1>
                  </div>
                  <div className="pt-7  px-6">
                    <div className="img-container h-52 w-52  mx-auto    mb-8">
                      {/* replace with chart */}
                      <img
                        src={ticket}
                        alt="email"
                        className="h-full w-full  object-cover "
                      />
                    </div>
                  </div>
                  <div className=" border-t border-gray-100 flex capitalize  rounded-b">
                    <div className="px-6 pt-5 pb-0 border-r border-gray-100 flex-1">
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-light-2">online booking</h1>
                        <span className="bg-purple-light text-white py-1 px-2 rounded-xl text-xs font-bold">
                          14
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-light-2">Telemarketing</h1>
                        <span className="bg-purple-light text-white py-1 px-2 rounded-xl text-xs font-bold">
                          14
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-light-2">Book Store</h1>
                        <span className="bg-purple-light text-white py-1 px-2 rounded-xl text-xs font-bold">
                          14
                        </span>
                      </div>
                    </div>

                    <div className="px-6 pt-5 pb-0 border-r border-gray-100 flex-1">
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-light-2">Booth Event</h1>
                        <span className="bg-purple-light text-white py-1 px-2 rounded-xl text-xs font-bold">
                          14
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-light-2">Social Media</h1>
                        <span className="bg-purple-light text-white py-1 px-2 rounded-xl text-xs font-bold">
                          14
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-light-2">Others</h1>
                        <span className="bg-purple-light text-white py-1 px-2 rounded-xl text-xs font-bold">
                          14
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* single grid item */}
                <div className="rounded bg-white shadow-sm  lg:w-full">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                      Support Team
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="rounded bg-gray-main p-6 flex items-center gap-x-5 mb-8 ">
                      <div className="h-12 w-12 rounded-full overflow-hidden ">
                        <img
                          src={lurch}
                          alt=""
                          className="object-contain w-full h-full1"
                        />
                      </div>
                      <div className="">
                        <h1 className="font-semibold text-gray-light-2 capitalize mb-1 text-base">
                          Lurch Schpellchek
                        </h1>
                        <h5 className=" text-gray-light-2 ">
                          support@example.com
                        </h5>
                      </div>
                    </div>

                    <div className="rounded bg-gray-main p-6 flex items-center gap-x-5 mb-8 ">
                      <div className="h-12 w-12 rounded-full overflow-hidden ">
                        <img
                          src={ursula}
                          alt=""
                          className="object-contain w-full h-full1"
                        />
                      </div>
                      <div className="">
                        <h1 className="font-semibold text-gray-light-2 capitalize mb-1 text-base">
                          Ursula Gurnmeister
                        </h1>
                        <h5 className=" text-gray-light-2 ">
                          support@example.com
                        </h5>
                      </div>
                    </div>

                    <div className="rounded bg-gray-main p-6 flex items-center gap-x-5  ">
                      <div className="h-12 w-12 rounded-full overflow-hidden ">
                        <img
                          src={alan}
                          alt=""
                          className="object-contain w-full h-full1"
                        />
                      </div>
                      <div className="">
                        <h1 className="font-semibold text-gray-light-2 capitalize mb-1 text-base">
                          Alan Fresco
                        </h1>
                        <h5 className=" text-gray-light-2 ">
                          support@example.com
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8 xl:flex xl:flex-row   gap-y-10 gap-x-8">
                <div className="lg:flex lg:items-start xl:w-8/12  gap-x-8 gap-y-8 mb-12 flex-wrap ">
                  {/* single grid item */}
                  <div className="rounded bg-white shadow-sm  lg:flex-1 mb-8 lg:mb-0">
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                      <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                        Event Calendar
                      </h1>
                    </div>
                    <div className="pt-7 pb-6 px-6  ">
                      <h1 className="bg-table-light text-center py-4 text-gray-light-2 text-2xl uppercase font-bold">
                        february 2022
                      </h1>
                      <table class="table-fixed  w-full text-gray-light text-sm font-semibold">
                        <thead>
                          <tr className="text-gray-light-2  bg-table-light-2  h-10 uppercase">
                            <th>sun</th>
                            <th>mon</th>
                            <th>teu</th>
                            <th>wed</th>
                            <th>thu</th>
                            <th>fri</th>
                            <th>sat</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="h-12">
                            <td className="text-center"></td>
                            <td className="text-center"></td>
                            <td className="text-center">1</td>
                            <td className="text-center">2</td>
                            <td className="text-center">3</td>
                            <td className="text-center">4</td>
                            <td className="text-center">5</td>
                          </tr>
                          <tr className="h-12">
                            <td className="text-center">6</td>
                            <td className="text-center bg-purple-light text-white">
                              7
                            </td>
                            <td className="text-center">8</td>
                            <td className="text-center">9</td>
                            <td className="text-center">10</td>
                            <td className="text-center">11</td>
                            <td className="text-center">12</td>
                          </tr>
                          <tr className="h-12">
                            <td className="text-center">13</td>
                            <td className="text-center">14</td>
                            <td className="text-center">15</td>
                            <td className="text-center">16</td>
                            <td className="text-center">17</td>
                            <td className="text-center">18</td>
                            <td className="text-center">19</td>
                          </tr>
                          <tr className=" h-12">
                            <td className="text-center">20</td>
                            <td className="text-center">21</td>
                            <td className="text-center">22</td>
                            <td className="text-center">23</td>
                            <td className="text-center">24</td>
                            <td className="text-center">25</td>
                            <td className="text-center">26</td>
                          </tr>
                          <tr className=" h-12">
                            <td className="text-center">27</td>
                            <td className="text-center">28</td>
                            <td className="text-center">29</td>
                            <td className="text-center">30</td>
                            <td className="text-center"></td>
                            <td className="text-center"></td>
                            <td className="text-center"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* single grid item */}
                  <div className="rounded-b bg-white shadow-sm  lg:flex-1 mb-10 lg:mb-0">
                    <div className="object-contain relative">
                      <img
                        src={people}
                        alt="people"
                        className="w-full h-full"
                      />
                      <h1 className="absolute bottom-4 left-4 capitalize font bold text-2xl text-white font-bold">
                        event name
                      </h1>
                    </div>
                    <div className="px-6 pt-5 pb-6 flex gap-x-8">
                      <div className="">
                        <h5 className="text-bold text-sm text-gray-dark capitalize mb-3 font-bold">
                          date
                        </h5>
                        <p className="text-xs text-gray-light  capitalize font-medium tracking-wide">
                          June 16, 2018
                        </p>
                      </div>
                      <div className="">
                        <h5 className="text-bold text-sm text-gray-dark capitalize mb-3 font-bold">
                          Location
                        </h5>
                        <p className="text-xs text-gray-light capitalize font-medium tracking-wide">
                          New York
                        </p>
                      </div>
                      <div className="">
                        <h5 className="text-bold text-sm text-gray-dark capitalize mb-3 font-bold">
                          Tickets
                        </h5>
                        <p className="text-xs text-gray-light capitalize font-medium tracking-wide">
                          Avilable 26/ 100
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                      <div className="flex items-center gap-x-3">
                        <h5 className="text-bold text-base text-gray-dark  font-bold">
                          Sponsor by
                        </h5>
                        <div className="flex gap-x-1">
                          <a href="" className="">
                            <div className="w-9 h-9 rounded-full overflow-hidden ">
                              <img
                                src={ursula}
                                alt="person"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </a>

                          <a href="" className="">
                            <div className="w-9 h-9 rounded-full overflow-hidden ">
                              <img
                                src={lurch}
                                alt="person"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </a>

                          <a href="" className="">
                            <div className="w-9 h-9 rounded-full overflow-hidden ">
                              <img
                                src={alan}
                                alt="person"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </a>

                          <a href="" className="">
                            <div className="w-9 h-9 rounded-full overflow-hidden ">
                              <img
                                src={ursula}
                                alt="person"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </a>
                        </div>
                      </div>

                      <span className="text-red-dark capitalize font-semibold">
                        free
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-6 pt-4 pb-6">
                      <div className="flex gap-x-8">
                        <a
                          href=""
                          className="flex items-center gap-x-1 text-base"
                        >
                          <FaHeart className="text-gray-font text-sm" />
                          <span className="text-gray-light-3">126</span>
                        </a>
                        <a
                          href=""
                          className="flex items-center gap-x-1 text-base"
                        >
                          <FaComment className="text-gray-font text-sm" />
                          <span className="text-gray-light-3">03</span>
                        </a>
                        <a
                          href=""
                          className="flex items-center gap-x-1 text-base"
                        >
                          <FaSignOutAlt className="text-gray-font text-sm" />
                        </a>
                      </div>
                      <a href="" className="flex items-center gap-x-1">
                        <FaBarcode />
                        <span className="capitalize text-gray-dark">
                          insights
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* single grid item */}
                  <div className="rounded bg-white shadow-sm  lg:w-full">
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                      <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                        Event List
                      </h1>
                    </div>
                    <div className="pt-7 pb-9 px-6  relative overflow-auto mt-2">
                      <table class="table-fixed   text-gray-light-2 text-sm w-full ">
                        <thead>
                          <tr className="text-gray-light-2   h-12 uppercase text-xs sm:text-">
                            <th className=" text-left w-2/12 sm:w-5/12 px-0 sm:px-3 border border-gray-100">
                              event
                            </th>
                            <th className=" text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                              progress
                            </th>
                            <th className="text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                              deadline
                            </th>
                            <th className=" text-left w-2/12 px-3 border border-gray-100">
                              label
                            </th>
                            <th className=" text-left w-2/12 px-3 border border-gray-100">
                              action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="h-12">
                            <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                              Wordpress Theme Development
                            </td>
                            <td className=" border border-gray-100 px-3">
                              {/* replace with progress bar */}
                              <div className="flex bg-gray-300 rounded h-1 w-full mx-auto ">
                                <div className="h-1 bg-purple-500 w-8/12 rounded"></div>
                                <div className="h-1  w-4/12 "></div>
                              </div>
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                              Apr 20,2018
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                              <span className="bg-purple-500 rounded-md text-white py-1 px-2 text-xs font-bold">
                                70%
                              </span>
                            </td>
                            <td className="px-3  border border-gray-100">
                              <div className="flex flex-col sm:flex-row gap-x-6 ">
                                <button className="bg-transparent">
                                  <FaPencilAlt />
                                </button>
                                <button className="bg-transparent">
                                  <FaTimes />
                                </button>
                              </div>
                            </td>
                          </tr>

                          <tr className="h-12">
                            <td className=" text-xs sm:text-base  border border-gray-100 capitalizep  px-0 sm:px-3">
                              Web Development
                            </td>
                            <td className=" border border-gray-100 px-3">
                              {/* replace with progress bar */}
                              <div className="flex bg-gray-300 rounded h-1 w-full mx-auto ">
                                <div className="h-1 bg-green-500 w-8/12 rounded"></div>
                                <div className="h-1  w-4/12 "></div>
                              </div>
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                              Apr 20,2018
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                              <span className="bg-green-500 rounded-md text-white py-1 px-2 text-xs font-bold">
                                70%
                              </span>
                            </td>
                            <td className="px-3  border border-gray-100">
                              <div className="flex flex-col sm:flex-row gap-x-6 ">
                                <button className="bg-transparent">
                                  <FaPencilAlt />
                                </button>
                                <button className="bg-transparent">
                                  <FaTimes />
                                </button>
                              </div>
                            </td>
                          </tr>

                          <tr className="h-12">
                            <td className=" text-sm sm:text-base  border border-gray-100 px-0 sm:px-3">
                              UI Design
                            </td>
                            <td className=" border border-gray-100 px-3">
                              {/* replace with progress bar */}
                              <div className="flex bg-gray-300 rounded h-1 w-full mx-auto ">
                                <div className="h-1 bg-gray-900 w-8/12 rounded"></div>
                                <div className="h-1  w-4/12 "></div>
                              </div>
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                              Apr 20,2018
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                              <span className="bg-gray-900 rounded-md text-white py-1 px-2 text-xs font-bold">
                                70%
                              </span>
                            </td>
                            <td className="px-3  border border-gray-100">
                              <div className="flex flex-col sm:flex-row gap-x-6 ">
                                <button className="bg-transparent">
                                  <FaPencilAlt />
                                </button>
                                <button className="bg-transparent">
                                  <FaTimes />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="xl:w-4/12  ">
                  {/* single grid item */}
                  <div className="rounded bg-white shadow-sm  lg:w-full">
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                      <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                        Event Detail
                      </h1>
                    </div>
                    <div className="pt-7 pb-9 px-6 ">
                      <div className="">
                        <div
                          onClick={handleDigital}
                          className={`${
                            toggleDigital
                              ? "flex  justify-between items-center py-2 px-3 text-white mb-5 rounded-sm bg-purple-500 border border-transparent cursor-pointer "
                              : "flex  justify-between items-center py-2 px-3 text-gray-main mb-4 rounded-sm bg-white border border-gray-100 cursor-pointer "
                          }`}
                        >
                          <h1 className="capitalize">
                            digital marketing conference
                          </h1>
                          <span
                            className={`${
                              toggleDigital
                                ? "hidden"
                                : "block text-3xl font-thin"
                            }`}
                          >
                            +
                          </span>
                          <span
                            className={`${
                              toggleDigital
                                ? "block text-3xl font-thin"
                                : "hidden"
                            }`}
                          >
                            -
                          </span>
                        </div>
                        <div
                          className={`${
                            toggleDigital
                              ? "h-96 overflow-hidden transit "
                              : "h-0 overflow-hidden transit"
                          }`}
                        >
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              event ID:
                            </h1>
                            <p className="flex-1 text-base ">
                              <span className="">#</span>9580
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Status:
                            </h1>
                            <p className=" px-2 py-1 text-xs bg-green-500 rounded capitalize text-black  ">
                              ongoing
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Event Date:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              08 July 2015 - 30 January 2015
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Show Date:
                            </h1>
                            <p className="flex-1 text-base  ">
                              25 January 2015
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              venue
                            </h1>
                            <p className="flex-1 text-base ">
                              Southpark Station, Hamelton, CA 20155
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Vendor:
                            </h1>
                            <p className="flex-1 text-base inline-block ">10</p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Tickets:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                1000
                              </a>
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Crew:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                200
                              </a>
                            </p>
                          </div>
                          <div className="px-3 mb-5">
                            <div className="border-t border-gray-200"></div>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Revenue:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <span className="">$</span>10.405,00
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Exhibitor:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                5
                              </a>
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              Total Invitation:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                200
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <div
                          onClick={handleUi}
                          className={`${
                            toggleUi
                              ? "flex  justify-between items-center py-2 px-3 text-white mb-5 rounded-sm bg-purple-500 border border-transparent cursor-pointer "
                              : "flex  justify-between items-center py-2 px-3 text-gray-main mb-4 rounded-sm bg-white border border-gray-100 cursor-pointer "
                          }`}
                        >
                          <h1 className="capitalize">
                            digital marketing conference
                          </h1>
                          <span
                            className={`${
                              toggleUi ? "hidden" : "block text-3xl font-thin"
                            }`}
                          >
                            +
                          </span>
                          <span
                            className={`${
                              toggleUi ? "block text-3xl font-thin" : "hidden"
                            }`}
                          >
                            -
                          </span>
                        </div>
                        <div
                          className={`${
                            toggleUi
                              ? "h-96 overflow-hidden transit "
                              : "h-0 overflow-hidden transit"
                          }`}
                        >
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              event ID:
                            </h1>
                            <p className="flex-1 text-base ">
                              <span className="">#</span>9580
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Status:
                            </h1>
                            <p className=" px-2 py-1 text-xs bg-green-500 rounded capitalize text-black  ">
                              ongoing
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Event Date:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              08 July 2015 - 30 January 2015
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Show Date:
                            </h1>
                            <p className="flex-1 text-base  ">
                              25 January 2015
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              venue
                            </h1>
                            <p className="flex-1 text-base ">
                              Southpark Station, Hamelton, CA 20155
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Vendor:
                            </h1>
                            <p className="flex-1 text-base inline-block ">10</p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Tickets:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                1000
                              </a>
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Crew:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                200
                              </a>
                            </p>
                          </div>
                          <div className="px-3 mb-5">
                            <div className="border-t border-gray-200"></div>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Revenue:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <span className="">$</span>10.405,00
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Exhibitor:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                5
                              </a>
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              Total Invitation:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                200
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div
                          onClick={handleFrontEnd}
                          className={`${
                            toggleFrontEnd
                              ? "flex  justify-between items-center py-2 px-3 text-white mb-5 rounded-sm bg-purple-500 border border-transparent cursor-pointer "
                              : "flex  justify-between items-center py-2 px-3 text-gray-main mb-4 rounded-sm bg-white border border-gray-100 cursor-pointer "
                          }`}
                        >
                          <h1 className="capitalize">
                            digital marketing conference
                          </h1>
                          <span
                            className={`${
                              toggleFrontEnd
                                ? "hidden"
                                : "block text-3xl font-thin"
                            }`}
                          >
                            +
                          </span>
                          <span
                            className={`${
                              toggleFrontEnd
                                ? "block text-3xl font-thin"
                                : "hidden"
                            }`}
                          >
                            -
                          </span>
                        </div>
                        <div
                          className={`${
                            toggleFrontEnd
                              ? "h-96 transit overflow-hidden "
                              : "h-0 overflow-hidden transit"
                          }`}
                        >
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              event ID:
                            </h1>
                            <p className="flex-1 text-base ">
                              <span className="">#</span>9580
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Status:
                            </h1>
                            <p className=" px-2 py-1 text-xs bg-green-500 rounded capitalize text-black  ">
                              ongoing
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Event Date:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              08 July 2015 - 30 January 2015
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Show Date:
                            </h1>
                            <p className="flex-1 text-base  ">
                              25 January 2015
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              venue
                            </h1>
                            <p className="flex-1 text-base ">
                              Southpark Station, Hamelton, CA 20155
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Vendor:
                            </h1>
                            <p className="flex-1 text-base inline-block ">10</p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Tickets:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                1000
                              </a>
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Crew:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                200
                              </a>
                            </p>
                          </div>
                          <div className="px-3 mb-5">
                            <div className="border-t border-gray-200"></div>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Revenue:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <span className="">$</span>10.405,00
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              {" "}
                              Total Exhibitor:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                5
                              </a>
                            </p>
                          </div>
                          <div className="flex mb-5  px-3 text-gray-light-2 ">
                            <h1 className="font-semibold w-36 text-left capitalize text-base">
                              Total Invitation:
                            </h1>
                            <p className="flex-1 text-base inline-block ">
                              <a href="dummy.com" className="">
                                200
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white shadow py-2 text-center">copyright</section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
