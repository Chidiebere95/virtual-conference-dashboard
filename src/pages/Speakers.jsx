import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { eventOrganizers } from "../data";

const Speakers = () => {
  const { closeSubmenuItems, getSpeakersFormData } = useGlobalContext();
  const [showNotification, setShowNotification] = useState(false);
  const [speakers, setSpeakers] = useState(eventOrganizers);
  const [idAssigned, setIdAssigned] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [img, setImg] = useState("");
  const [addedSpeaker, setAddedSpeaker] = useState("");
  const infoContainer = useRef(null);
  const idContainer = useRef(null);
  const nameContainer = useRef(null);
  const roleContainer = useRef(null);
  const imgUrlContainer = useRef(null);

  const id = parseInt(idAssigned);
  let formValue = {
    name,
    role,
    img,
    id,
  };
  //   console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value =  target.value;
    // console.log(name, value);

    if (name === "id") {
      setIdAssigned(value);
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "role") {
      setRole(value);
    }
    if (name === "image url") {
      setImg(value);
    }
  };
  const setNotification = (name) => {
    setAddedSpeaker(name);
    setShowNotification(true);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const item = speakers.find((item) => item.id === parseInt(id));
    console.log(item);
    if (
      idAssigned === "" ||
      id === 0 ||
      id < 0 ||
      name === "" ||
      role === "" ||
      img === "" ||
      item 
    ) {
      if (idAssigned === "") {
        idContainer.current.style.borderColor = "red";
      } else {
        idContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      }
      if (id === 0 || id < 0) {
        infoContainer.current.textContent =
          "Id cannot be zero or less than zero";
      } else {
        infoContainer.current.textContent = "";
      }

      if (nameContainer.current.value === "") {
        nameContainer.current.style.borderColor = "red";
      } else {
        nameContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      }
      if (roleContainer.current.value === "") {
        roleContainer.current.style.borderColor = "red";
      } else {
        roleContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      }
      if (imgUrlContainer.current.value === "") {
        imgUrlContainer.current.style.borderColor = "red";
      } else {
        imgUrlContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      }
      if (item) {
        infoContainer.current.textContent =
          "Id is already assigned to a a speaker. Use another Id";
          idContainer.current.style.borderColor="red"
      }
    } 
    else {
      setSpeakers((prevState)=>{
        const newSpeakers=[...prevState, formValue]
        return(newSpeakers)
      });
      // console.log(speakers);
      // console.log("all complete");
      infoContainer.current.textContent = "";
      idContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      nameContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      roleContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      imgUrlContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      const { name } = formValue;
      setNotification(name);
      setIdAssigned("");
      setName("");
      setRole("");
      setImg("");
      // console.log(speakers);
    }
  };

  const handleEdit = (speakerId) => {
    const item = speakers.find((item) => item.id === speakerId);
    const{id,name,role,img}=item 
    const tempSpeakers=speakers.filter(item=>item.id!==speakerId)
    setSpeakers(tempSpeakers) 
    console.log(tempSpeakers);
    setIdAssigned(id);
      setName(name);
      setRole(role);
      setImg(img);
    console.log(item);  
  }; 
  const handleDelete = (speakerId) => {
    const tempSpeakers=speakers.filter(item=>item.id!==speakerId)
    setSpeakers(tempSpeakers) 
  }; 
  return (
    <div
      onMouseOver={() => closeSubmenuItems()}
      className="ml-16 bg-gray-main flex-1"
    >
      <div className="px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  ">
        <div className="mt-4 ">
          <div className="flex flex-col lg:flex-row gap-x-10">
            <div className="flex flex-col gap-y-6 lg:w-4/12">
              <section
                className={`${
                  showNotification
                    ? " rounded bg-green-light px-4 py-3 flex  sm:flex-row justify-between items-center shadow-sm gap-y-4 text-white lg:max-w-6xl mx-auto"
                    : "hidden"
                }`}
              >
                <p className=" text-base w-10/12">
                  <span className="font-semibold"> Success!</span> The speaker
                  {` "${addedSpeaker}"`} has been successfully added..
                </p>
                <button onClick={() => setShowNotification(false)} className="">
                  <FaTimes />
                </button>
              </section>
              <section className="mb-8  lg:max-w-6xl mx-auto  w-full bg-white">
                {/* single item */}
                <form action="" className="">
                  <div className="rounded  shadow-sm w-full ">
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                      <h1 className="capitalize text-lg font-medium tracking-wider text-gray-main ">
                        Create speaker
                      </h1>
                    </div>
                    <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                      <div className="flex gap-x-4">
                        <label htmlFor="type" className="capitalize">
                          id
                        </label>
                        <h5
                          ref={infoContainer}
                          className="px-6 mb-2 text-red-500"
                        >{""}</h5>
                      </div>
                      <input
                        ref={idContainer}
                        type="number"
                        name="id"
                        id="id"
                        value={idAssigned}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-100 w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                      <label htmlFor="type" className="capitalize">
                        name
                      </label>
                      <input
                        ref={nameContainer}
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-100 w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                      <label htmlFor="type" className="capitalize">
                        role
                      </label>
                      <input
                        ref={roleContainer}
                        type="text"
                        name="role"
                        id="role"
                        value={role}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-100 w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                      <label htmlFor="type" className="capitalize">
                        image URL
                      </label>
                      <input
                        ref={imgUrlContainer}
                        type="text"
                        name="image url"
                        id="image url"
                        value={img}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-100 w-full"
                      />
                    </div>

                    <div className="px-6 pb-4">
                      <button
                        type="submit"
                        onClick={handleFormSubmit}
                        className="py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded"
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
            <section className="mb-8 lg:w-8/12 mx-auto">
              {/* single item */}
              <div className="rounded bg-white shadow-sm  ">
                <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                  <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                    speakers
                  </h1>
                </div>
                <div className="pt-7 pb-9 px-6 mt-2 ">
                  <table className="table-fixed   text-gray-light-2 text-sm w-full ">
                    <thead>
                      <tr className="text-gray-light-2   h-12 uppercase text-xs text-center">
                        <th className=" text-left w-1/12 sm:w- px-0 sm:px-3 border border-gray-100">
                          #
                        </th>
                        <th className=" text-left w-1/12 sm:w- px-0 sm:px-3 border border-gray-100">
                          id
                        </th>
                        <th className=" text-left w-3/12 sm:w-4/12 sm:w- px-0 sm:px-3 border border-gray-100">
                          name
                        </th>
                        <th className=" text-left w-3/12 px-1 sm:px-3 border border-gray-100">
                          role
                        </th>
                        <th className="text-left w-5/12 px-1 sm:px-3 border border-gray-100 ">
                          img URL
                        </th>
                        <th className="text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {speakers.map((item, index) => {
                        const { id, name, role, img } = item;
                        return (
                          <tr key={id} className="h-12 font-semibold capitalize">
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                              {index+1}
                            </td>
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                              {id}
                            </td>
                            <td className=" border border-gray-100 px-1 sm:px-3">
                              {name}
                            </td>
                            <td className="text-left px-1 sm:px-3 font-semibold  border border-gray-100">
                              {role}
                            </td>
                            <td className="text-left px-1 sm:px-3  border border-gray-100">
                              {img}
                            </td>
                            <td className="text-left px-3  border border-gray-100 flex gap-x-2 items-center h-12">
                              <button
                                onClick={() => handleEdit(id)}
                                className=""
                              >
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDelete(id)} className="">
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          <section className="mb-8 ">
            {/* single item */}
            {/* <div className="rounded bg-white shadow-sm  ">
              <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                  Sales By Ticket Type
                </h1>
              </div>
              <div className="pt-7 pb-9 px-6 mt-2 ">
                <table className="table-fixed   text-gray-light-2 text-sm w-full ">
                  <thead>
                    <tr className="text-gray-light-2   h-12 uppercase text-xs ">
                      <th className=" text-left w-2/12  px-0 sm:px-3 border border-gray-100">
                        order#
                      </th>
                      <th className=" text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                        ticket buyer
                      </th>
                      <th className="text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                        quantity
                      </th>
                      <th className=" text-left w-2/12 px-3 border border-gray-100">
                        price
                      </th>
                      <th className=" text-left w-2/12 px-3 border border-gray-100">
                        date
                      </th>
                      <th className=" text-left w-2/12 px-3 border border-gray-100">
                        payment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-semibold">
                    <tr className="h-12 capitalize">
                      <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                        236589
                      </td>
                      <td className=" border border-gray-100 px-3">Mr John</td>
                      <td className="text-left px-3 font-semibold  border border-gray-100">
                        2
                      </td>
                      <td className="text-left px-3  border border-gray-100">
                        <span className="">$</span>25.21
                      </td>
                      <td className="px-3  border border-gray-100">
                        feb 09,2022
                      </td>
                      <td className="px-3  border border-gray-100">Guest</td>
                    </tr>

                    <tr className="h-12 capitalize">
                      <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                        236589
                      </td>
                      <td className=" border border-gray-100 px-3">Mr John</td>
                      <td className="text-left px-3 font-semibold  border border-gray-100">
                        2
                      </td>
                      <td className="text-left px-3  border border-gray-100">
                        <span className="">$</span>25.21
                      </td>
                      <td className="px-3  border border-gray-100">
                        feb 09,2022
                      </td>
                      <td className="px-3  border border-gray-100">Guest</td>
                    </tr>

                    <tr className="h-12 capitalize">
                      <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                        236589
                      </td>
                      <td className=" border border-gray-100 px-3">Mr John</td>
                      <td className="text-left px-3 font-semibold  border border-gray-100">
                        2
                      </td>
                      <td className="text-left px-3  border border-gray-100">
                        <span className="">$</span>25.21
                      </td>
                      <td className="px-3  border border-gray-100">
                        feb 09,2022
                      </td>
                      <td className="px-3  border border-gray-100">Guest</td>
                    </tr>

                    <tr className="h-12 capitalize ">
                      <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                        236589
                      </td>
                      <td className=" border border-gray-100 px-3">Mr John</td>
                      <td className="text-left px-3 font-semibold  border border-gray-100">
                        2
                      </td>
                      <td className="text-left px-3  border border-gray-100">
                        <span className="">$</span>25.21
                      </td>
                      <td className="px-3  border border-gray-100">
                        feb 09,2022
                      </td>
                      <td className="px-3  border border-gray-100">Guest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
