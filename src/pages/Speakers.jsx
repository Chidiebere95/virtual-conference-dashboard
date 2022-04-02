import React, { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import axios from '../utils/axios';
import { useGlobalContext } from '../context';
import { eventOrganizers } from '../data';

const Speakers = () => {
  const { closeSubmenuItems } = useGlobalContext();
  const [showNotification, setShowNotification] = useState(false);
  const [speakers, setSpeakers] = useState(eventOrganizers);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [avatar, setAvatar] = useState('');
  const [company, setCompany] = useState('');
  const [addedSpeaker, setAddedSpeaker] = useState('');
  const [idToEdit, setIdToEdit] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Refs
  const nameContainer = useRef(null);
  const positionContainer = useRef(null);
  const avatarUrlContainer = useRef(null);
  const companyContainer = useRef(null);

  let formValue = {
    name,
    position,
    avatar,
    company,
  };
  //   console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'company') {
      setCompany(value);
    }
    if (name === 'name') {
      setName(value);
    }
    if (name === 'position') {
      setPosition(value);
    }
    if (name === 'avatar') {
      setAvatar(value);
    }
  };
  const setNotification = (name) => {
    setAddedSpeaker(name);
    setShowNotification(true);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (company === '' || name === '' || position === '' || avatar === '') {
      if (nameContainer.current.value === '') {
        nameContainer.current.style.borderColor = 'red';
        return;
      } else {
        nameContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
      }
      if (positionContainer.current.value === '') {
        positionContainer.current.style.borderColor = 'red';
        return;
      } else {
        positionContainer.current.style.borderColor =
          ' rgba(243, 244, 246,0.5)';
      }
      if (avatarUrlContainer.current.value === '') {
        avatarUrlContainer.current.style.borderColor = 'red';
        return;
      } else {
        avatarUrlContainer.current.style.borderColor =
          ' rgba(243, 244, 246,0.5)';
      }
      if (companyContainer.current.value === '') {
        companyContainer.current.style.borderColor = 'red';
        return;
      } else {
        companyContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
      }
    } else {
      axios
        .post('/speakers/add', formValue, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          setSpeakers((prevState) => {
            const newSpeakers = [...prevState, formValue];
            return newSpeakers;
          });

          nameContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
          positionContainer.current.style.borderColor =
            'rgba(243, 244, 246,0.5)';
          avatarUrlContainer.current.style.borderColor =
            'rgba(243, 244, 246,0.5)';
          companyContainer.current.style.borderColor =
            'rgba(243, 244, 246,0.5)';
          const { name } = formValue;
          setNotification(name);
          setCompany('');
          setName('');
          setPosition('');
          setAvatar('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = (e, speakerId) => {
    e.preventDefault();
    const updatePayload = {};

    if (name) updatePayload.name = name;
    if (company) updatePayload.company = company;
    if (position) updatePayload.position = position;
    if (avatar) updatePayload.avatar = avatar;

    axios
      .put(`/speakers/edit?id=${speakerId}`, updatePayload)
      .then((res) => {
        const tempSpeaker = res.data.data;
        console.log(tempSpeaker);

        setSpeakers((prevState) => {
          const newSpeakers = [
            ...prevState.filter((item) => item._id !== speakerId),
            tempSpeaker,
          ];
          return newSpeakers;
        });

        setCompany('');
        setName('');
        setPosition('');
        setAvatar('');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (speakerId) => {
    axios.delete(`/speakers/remove?id=${speakerId}`).then((res) => {
      const tempSpeakers = speakers.filter((item) => item._id !== speakerId);
      setSpeakers(tempSpeakers);
    });
  };
  useEffect(() => {
    axios.get('/speakers').then((res) => {
      setSpeakers(res.data.data);
    });
  }, []);
  return (
    <div
      onMouseOver={() => closeSubmenuItems()}
      className='ml-16 bg-gray-main flex-1'
    >
      <div className='px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  '>
        <div className='mt-4 '>
          <div className='flex flex-col lg:flex-row gap-x-10'>
            <div className='flex flex-col gap-y-6 lg:w-4/12'>
              <section
                className={`${
                  showNotification
                    ? ' rounded bg-green-light px-4 py-3 flex  sm:flex-row justify-between items-center shadow-sm gap-y-4 text-white lg:max-w-6xl mx-auto'
                    : 'hidden'
                }`}
              >
                <p className=' text-base w-10/12'>
                  <span className='font-semibold'> Success!</span> The speaker
                  {` "${addedSpeaker}"`} has been successfully added..
                </p>
                <button onClick={() => setShowNotification(false)} className=''>
                  <FaTimes />
                </button>
              </section>
              <section className='mb-8  lg:max-w-6xl mx-auto  w-full bg-white'>
                {/* Start of Edit Mode Wrapper */}
                <form action='' className=''>
                  {editMode ? (
                    <div className='rounded  shadow-sm w-full '>
                      <div className='px-6 pt-5 pb-5 border-b border-gray-100 flex justify-between'>
                        <h1 className='capitalize text-lg font-medium tracking-wider text-gray-main '>
                          Edit speaker
                        </h1>
                        <button
                          className='py-2 px-3 text-sm font-semibold text-white bg-red-light capitalize hover:bg-purple-light-2 rounded'
                          onClick={() => setEditMode(false)}
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          name
                        </label>
                        <input
                          ref={nameContainer}
                          type='text'
                          name='name'
                          id='name'
                          value={name}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>
                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          company
                        </label>
                        <input
                          ref={companyContainer}
                          type='text'
                          name='company'
                          id='company'
                          value={company}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>

                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          position
                        </label>
                        <input
                          ref={positionContainer}
                          type='text'
                          name='position'
                          id='position'
                          value={position}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>

                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          Avatar URL
                        </label>
                        <input
                          ref={avatarUrlContainer}
                          type='text'
                          name='avatar'
                          id='avatar'
                          value={avatar}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>

                      <div className='px-6 pb-4'>
                        <button
                          type='submit'
                          onClick={(e) => handleEdit(e, idToEdit)}
                          className='py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded'
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='rounded  shadow-sm w-full '>
                      <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                        <h1 className='capitalize text-lg font-medium tracking-wider text-gray-main '>
                          Create speaker
                        </h1>
                      </div>

                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          name
                        </label>
                        <input
                          ref={nameContainer}
                          type='text'
                          name='name'
                          id='name'
                          value={name}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>
                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          company
                        </label>
                        <input
                          ref={companyContainer}
                          type='text'
                          name='company'
                          id='company'
                          value={company}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>

                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          position
                        </label>
                        <input
                          ref={positionContainer}
                          type='text'
                          name='position'
                          id='position'
                          value={position}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>

                      <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                        <label htmlFor='type' className='capitalize'>
                          Avatar URL
                        </label>
                        <input
                          ref={avatarUrlContainer}
                          type='text'
                          name='avatar'
                          id='avatar'
                          value={avatar}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>

                      <div className='px-6 pb-4'>
                        <button
                          type='submit'
                          onClick={handleFormSubmit}
                          className='py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded'
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                </form>
                {/* End of Edit Mode Wrapper */}
              </section>
            </div>
            <section className='mb-8 lg:w-8/12 mx-auto'>
              {/* single item */}
              <div className='rounded bg-white shadow-sm  '>
                <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                  <h1 className='capitalize text-lg font-normal tracking-wider text-gray-main '>
                    speakers
                  </h1>
                </div>
                <div className='pt-7 pb-9 px-6 mt-2 '>
                  <table className='table-fixed   text-gray-light-2 text-sm w-full '>
                    <thead>
                      <tr className='text-gray-light-2   h-12 uppercase text-xs text-center'>
                        <th className=' text-left w-1/12 sm:w- px-0 sm:px-3 border border-gray-100'>
                          #
                        </th>
                        <th className=' text-left w-1/12 sm:w- px-0 sm:px-3 border border-gray-100'></th>
                        <th className=' text-left w-3/12 sm:w-4/12 sm:w- px-0 sm:px-3 border border-gray-100'>
                          name
                        </th>
                        <th className=' text-left w-3/12 px-1 sm:px-3 border border-gray-100'>
                          position
                        </th>
                        <th className='text-left w-5/12 px-1 sm:px-3 border border-gray-100 '>
                          company
                        </th>
                        <th className='text-left w-2/12 px-1 sm:px-3 border border-gray-100'>
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {speakers.map((item, index) => {
                        const { _id, name, position, avatar, company } = item;
                        return (
                          <tr
                            key={index}
                            className='h-12 font-semibold capitalize'
                          >
                            <td className='  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3'>
                              {index + 1}
                            </td>
                            <td className='  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3'>
                              <img
                                className='table-avatar avatar'
                                src={avatar}
                                alt={name}
                              />
                            </td>
                            <td className=' border border-gray-100 px-1 sm:px-3'>
                              {name}
                            </td>
                            <td className='text-left px-1 sm:px-3 font-semibold  border border-gray-100'>
                              {position}
                            </td>
                            <td className='text-left px-1 sm:px-3  border border-gray-100'>
                              {company}
                            </td>
                            <td className='text-left px-3  border border-gray-100 flex gap-x-2 items-center h-12'>
                              <button
                                onClick={() => {
                                  setEditMode(true);
                                  setIdToEdit(_id);
                                }}
                                className=''
                              >
                                <FaEdit />
                              </button>
                              <span> </span>
                              <button
                                onClick={() => handleDelete(_id)}
                                className=''
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

          <section className='mb-8 '>
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
