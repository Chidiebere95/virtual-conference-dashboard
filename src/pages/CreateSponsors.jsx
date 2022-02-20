import React, { useState, useRef } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context";

const CreateSponsors = () => {
  const { closeSubmenuItems } = useGlobalContext();
  const [showNotification, setShowNotification] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [idAssigned, setIdAssigned] = useState("");
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [edit, setEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addedSpeaker, setAddedSpeaker] = useState("");
  const infoContainer = useRef(null);
  const idContainer = useRef(null);
  const nameContainer = useRef(null);
  const imgUrlContainer = useRef(null);
  const websiteContainer = useRef(null);

  const id = parseInt(idAssigned);
  let formValue = {
    name,
    imgUrl,
    website,
    id,
  };
  //   console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    e.target.style.borderColor = "rgba(243, 244, 246,0.4)"
    // console.log(name, value);

    if (name === "id") {
      setIdAssigned(value);
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "img url") {
      setImgUrl(value);
    }
    if (name === "website") {
      setWebsite(value);
    }
  };
  const setNotification = (name) => {
    setAddedSpeaker(name);
    setShowNotification(true);
    const timeout = setTimeout(() => {
      setShowNotification(false);
      return () => clearTimeout(timeout);
    }, 3000);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const item = sponsors.find((item) => item.id === parseInt(id));
    // console.log(item);
    if (
      idAssigned === "" ||
      id === 0 ||
      id < 0 ||
      name === "" ||
      imgUrl === "" ||
      website === "" ||
      item
    ) {
      if (idAssigned === "") {
        idContainer.current.style.borderColor = "red";
      } else {
        idContainer.current.style.borderColor = " rgba(243, 244, 246,0.3)";
      }
      if (id === 0 || id < 0) {
        infoContainer.current.textContent =
          "Id should not be zero or less than zero";
      } else {
        infoContainer.current.textContent = "";
      }

      if (nameContainer.current.value === "") {
        nameContainer.current.style.borderColor = "red";
      } else {
        nameContainer.current.style.borderColor = " rgba(243, 244, 246,0.3)";
      }
      if (imgUrlContainer.current.value === "") {
        imgUrlContainer.current.style.borderColor = "red";
      } else {
        imgUrlContainer.current.style.borderColor = " rgba(243, 244, 246,0.3)";
      }
      if (websiteContainer.current.value === "") {
        websiteContainer.current.style.borderColor = "red";
      } else {
        websiteContainer.current.style.borderColor = " rgba(243, 244, 246,0.3)";
      }
      if (item) {
        infoContainer.current.textContent =
          "Id is already assigned to a a speaker. Use another Id";
        idContainer.current.style.borderColor = "red";
      }
    } else if (edit) {
      setSponsors((prevState) => {
        const newSponsors = [...prevState, formValue];
        return newSponsors;
      });
      idContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      idContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      nameContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      imgUrlContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      websiteContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      infoContainer.current.textContent = "";
      const { name } = formValue;
      setNotification(name);
      setIdAssigned("");
      setName("");
      setImgUrl("");
      setWebsite("");
      setIsEditing(false);
      // console.log(edit);
    } else {
      setSponsors((prevState) => {
        const newSponsors = [...prevState, formValue];
        return newSponsors;
      });
      // console.log(sponsors);
      // console.log("all complete");
      infoContainer.current.textContent = "";
      idContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      nameContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      imgUrlContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      websiteContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      const { name } = formValue;
      setNotification(name);
      setIdAssigned("");
      setName("");
      setImgUrl("");
      setWebsite("");
      setIsEditing(false);
    }
  };

  const handleEdit = (sponsorId) => {
    if (!isEditing) {
      const item = sponsors.find((item) => item.id === sponsorId);
      // console.log(item);
      const { id, name, imgUrl, website } = item;
      const tempSponsors = sponsors.filter((item) => item.id !== sponsorId);
      setSponsors(tempSponsors);
      setIdAssigned(id);
      setName(name);
      setImgUrl(imgUrl);
      setWebsite(website);
      setEdit(true);
      setIsEditing(true);
    }
  };
  const handleDelete = (sponsorId) => {
    const tempSponsors = sponsors.filter((item) => item.id !== sponsorId);
    setSponsors(tempSponsors);
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
                  <span className="font-semibold"> Success!</span> The sponsor
                  {` "${addedSpeaker}"`} has been successfully added..
                </p>
                <button onClick={() => setShowNotification(false)} className="">
                  <FaTimes />
                </button>
              </section>
              <section className="mb-8  lg:max-w-6xl mx-auto  w-full bg-white lg:mb-20">
                {/* single item */}
                <form action="" className="">
                  <div className="rounded  shadow-sm w-full ">
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                      <h1 className="capitalize text-lg font-medium tracking-wider text-gray-main ">
                        Create sponsor
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
                        >
                          {""}
                        </h5>
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
                        img Url
                      </label>
                      <input
                        ref={imgUrlContainer}
                        type="text"
                        name="img url"
                        id="img url"
                        value={imgUrl}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-100 w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                      <label htmlFor="type" className="capitalize">
                        website
                      </label>
                      <input
                        ref={websiteContainer}
                        type="text"
                        name="website"
                        id="website"
                        value={website}
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
                       {`${isEditing?'edit':'submit'}`}
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
            <section className="mb-8 lg:w-8/12 mx-auto">
              {/* single item */}
              <div className="rounded bg-white shadow-sm ">
                <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                  <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                    sponsors
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
                          Img URL
                        </th>
                        <th className="text-left w-5/12 px-1 sm:px-3 border border-gray-100 ">
                          website
                        </th>
                        <th className="text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sponsors.map((item, index) => {
                        const { id, name, imgUrl, website } = item;
                        return (
                          <tr
                            key={id}
                            className="h-12 font-semibold capitalize"
                          >
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                              {index + 1}
                            </td>
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                              {id}
                            </td>
                            <td className=" border border-gray-100 px-1 sm:px-3">
                              {name}
                            </td>
                            <td className="text-left px-1 sm:px-3 font-semibold  border border-gray-100">
                              {imgUrl}
                            </td>
                            <td className="text-left px-1 sm:px-3  border border-gray-100">
                              {website}
                            </td>
                            <td className="text-left px-3  border border-gray-100 flex gap-x-2 items-center h-12">
                              <button
                                onClick={() => handleEdit(id)}
                                className={`${
                                  isEditing
                                    ? "cursor-default text-green-500"
                                    : "cursor-pointer text-green-500"
                                }`}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(id)}
                                className="text-red-500"
                              >
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
        </div>
      </div>
    </div>
  );
};

export default CreateSponsors;
