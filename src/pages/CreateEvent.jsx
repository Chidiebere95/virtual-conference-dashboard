import React, { useState, useEffect, useRef } from "react";
import { FaChevronRight, FaEnvelope, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const CreateEvent = () => {
  const {
    isSubmenuOpen,
    isSubmenuItemsOpen,
    openSubmenu,
    closeSubmenuItems,
    openSubmenuItems,
    getCreateEventFormData,
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

  const typeList = [
    "appearance or signing",
    "attraction",
    "camp,trip or retreat",
    "class, training or workshop",
    "performance or concert",
    "conference",
  ];
  const categoryList = [
    "auto, boat & air",
    "bussiness & professional",
    "charity & causes",
    "community & culture",
    "family & education",
    "fashion & beauty",
  ];
  const locationList = ["online event", "to be announced"];
  const [title, setTitle] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [type, setType] = useState(typeList[0]);
  const [category, setCategory] = useState(categoryList[0]);
  const [location, setLocation] = useState(locationList[0]);
  const [eventStarts, setEventStarts] = useState("");
  const [startTime, setStartTime] = useState("");
  const [eventEnds, setEventEnds] = useState("");
  const [endTime, setEndTime] = useState("");
  const [checked, setChecked] = useState(true);
  let formValue = {
    title,
    organizer,
    type,
    category,
    location,
    eventStarts,
    startTime,
    eventEnds,
    endTime,
    checked,
  };
  useEffect(() => {
    getCreateEventFormData(formValue);
  }, [
    title,
    organizer,
    type,
    category,
    location,
    eventStarts,
    startTime,
    eventEnds,
    endTime,
    checked,
  ]);
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);
    if (name === "event title") {
      setTitle(value);
    }
    if (name === "organizer") {
      setOrganizer(value);
    }
    if (name === "type") {
      setType(value);
    }
    if (name === "category") {
      setCategory(value);
      console.log(value);
    }
    if (name === "location") {
      setLocation(value);
    }
    if (name === "event starts") {
      setEventStarts(value);
    }
    if (name === "start time") {
      setStartTime(value);
    }
    if (name === "event ends") {
      setEventEnds(value);
    }
    if (name === "end time") {
      setEndTime(value);
    }
    if (name === "check") {
      setChecked(value);
    }
  };

  const handleFormSubmit=()=>{
      console.log('create event form submitted');
  }
  // console.log(formValue);

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
              <section className="mb-8  lg:max-w-2xl mx-auto">
                {/* single item */}
                <form action="" className="">
                  <div className="rounded bg-white shadow-sm  ">
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                      <h1 className="capitalize text-lg font-medium tracking-wider text-gray-main ">
                        Create Event
                      </h1>
                    </div>
                    <div className="pt-5  px-6 mt-2 text-gray-light-2 mb-">
                      <h1 className="capitalize text-lg font-medium tracking-wider mb-4 ">
                        General Info
                      </h1>
                      <div className="flex flex-col md:flex-row gap-y-4 gap-x-2 mb-4">
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            Event Title
                          </label>
                          <input
                            type="text"
                            name="event title"
                            id="event title"
                            value={title}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            organizer
                          </label>
                          <input
                            type="text"
                            name="organizer"
                            id="organizer"
                            value={organizer}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 focus::border-red-500 w-full block"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-y-4 gap-x-2 mb-4">
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            type
                          </label>
                          <select
                            value={type}
                            onChange={handleChange}
                            name="type"
                            id="type"
                            className="p-2 rounded border border-gray-100 w-full text-gray-main capitalize"
                          >
                            {typeList.map((item) => (
                              <option key={item} value={item} className="">
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            category
                          </label>
                          <select
                            value={category}
                            onChange={handleChange}
                            name="category"
                            id="category"
                            className="p-2 rounded border border-gray-100 w-full text-gray-main capitalize"
                          >
                            {categoryList.map((item) => (
                              <option key={item} value={item} className="">
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <label htmlFor="type" className="capitalize">
                            location
                          </label>
                          <select
                            onChange={handleChange}
                            name="location"
                            id="location"
                            className="p-2 rounded border border-gray-100 w-full text-gray-main capitalize"
                          >
                            {locationList.map((item) => (
                              <option key={item} value={item} className="">
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 px-6 mt-2 text-gray-light-2 ">
                      <h1 className="capitalize text-lg font-medium tracking-wider mb-4 ">
                        date and time
                      </h1>
                      <div className="flex flex-col md:flex-row gap-y-4 gap-x-2 mb-4">
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            event starts
                          </label>
                          <input
                            type="password"
                            name="event starts"
                            id="event starts"
                            value={eventStarts}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            start time
                          </label>
                          <input
                            type="password"
                            name="start time"
                            id="start time"
                            value={startTime}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 focus::border-red-500 w-full block"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-y-4 gap-x-2 mb-4">
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            event ends
                          </label>
                          <input
                            type="password"
                            name="event ends"
                            id="event ends"
                            value={eventEnds}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            end time
                          </label>
                          <input
                            type="password"
                            name="end time"
                            id="end time"
                            value={endTime}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 focus::border-red-500 w-full block"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-4">
                      <div className="flex gap-x-2 items-center mb-2 ">
                        <input
                          className="p-4 text-3xl bg-purple-light-2 text-white "
                          type="checkbox"
                          name="check"
                          id="check"
                          checked={checked}
                          onChange={handleChange}
                        />
                        <label htmlFor="check">check me out</label>
                      </div>
                      <button onClick={handleFormSubmit} className="py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded">
                        sign in
                      </button>
                    </div>
                  </div>
                </form>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
