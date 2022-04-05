import React, { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import axios from '../utils/axios';
import { useGlobalContext } from '../context';
import Layout from '../components/Layout';

const Sponsors = () => {
  const { closeSubmenuItems } = useGlobalContext();
  const [showNotification, setShowNotification] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [website, setWebsite] = useState('');
  const [addedSpeaker, setAddedSpeaker] = useState('');
  const [idToEdit, setIdToEdit] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Refs
  const nameContainer = useRef(null);
  const iconUrlContainer = useRef(null);
  const websiteContainer = useRef(null);

  let formValue = {
    name,
    website,
    icon,
  };
  //   console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'website') {
      setWebsite(value);
    }
    if (name === 'name') {
      setName(value);
    }

    if (name === 'icon') {
      setIcon(value);
    }
  };
  const setNotification = (name) => {
    setAddedSpeaker(name);
    setShowNotification(true);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (website === '' || name === '' || icon === '') {
      if (nameContainer.current.value === '') {
        nameContainer.current.style.borderColor = 'red';
        return;
      } else {
        nameContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
      }
      if (iconUrlContainer.current.value === '') {
        iconUrlContainer.current.style.borderColor = 'red';
        return;
      } else {
        iconUrlContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
      }
      if (websiteContainer.current.value === '') {
        websiteContainer.current.style.borderColor = 'red';
        return;
      } else {
        websiteContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
      }
    } else {
      axios
        .post('/sponsors/add', formValue, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          setSponsors((prevState) => {
            const newsponsors = [...prevState, formValue];
            return newsponsors;
          });

          nameContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
          iconUrlContainer.current.style.borderColor =
            'rgba(243, 244, 246,0.5)';
          websiteContainer.current.style.borderColor =
            'rgba(243, 244, 246,0.5)';
          const { name } = formValue;
          setNotification(name);
          setWebsite('');
          setName('');
          setIcon('');
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
    if (website) updatePayload.website = website;
    if (icon) updatePayload.icon = icon;

    axios
      .put(`/sponsors/edit?id=${speakerId}`, updatePayload)
      .then((res) => {
        const tempSpeaker = res.data.data;
        console.log(tempSpeaker);

        setSponsors((prevState) => {
          const newsponsors = [
            ...prevState.filter((item) => item._id !== speakerId),
            tempSpeaker,
          ];
          return newsponsors;
        });

        setWebsite('');
        setName('');
        setIcon('');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (speakerId) => {
    axios.delete(`/sponsors/remove?id=${speakerId}`).then((res) => {
      const tempsponsors = sponsors.filter((item) => item._id !== speakerId);
      setSponsors(tempsponsors);
    });
  };
  useEffect(() => {
    axios.get('/sponsors').then((res) => {
      setSponsors(res.data.data);
    });
  }, []);
  return (
    <Layout>
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
                  <button
                    onClick={() => setShowNotification(false)}
                    className=''
                  >
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
                            website
                          </label>
                          <input
                            ref={websiteContainer}
                            type='text'
                            name='website'
                            id='website'
                            value={website}
                            onChange={handleChange}
                            className='p-2 rounded border border-gray-100 w-full'
                          />
                        </div>

                        <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                          <label htmlFor='type' className='capitalize'>
                            icon URL
                          </label>
                          <input
                            ref={iconUrlContainer}
                            type='text'
                            name='icon'
                            id='icon'
                            value={icon}
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
                            website
                          </label>
                          <input
                            ref={websiteContainer}
                            type='text'
                            name='website'
                            id='website'
                            value={website}
                            onChange={handleChange}
                            className='p-2 rounded border border-gray-100 w-full'
                          />
                        </div>

                        <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                          <label htmlFor='type' className='capitalize'>
                            icon URL
                          </label>
                          <input
                            ref={iconUrlContainer}
                            type='text'
                            name='icon'
                            id='icon'
                            value={icon}
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
                      sponsors
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

                          <th className='text-left w-5/12 px-1 sm:px-3 border border-gray-100 '>
                            website
                          </th>
                          <th className='text-left w-2/12 px-1 sm:px-3 border border-gray-100'>
                            action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sponsors.map((item, index) => {
                          const { _id, name, icon, website } = item;
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
                                  className='table-icon icon'
                                  src={icon}
                                  alt={name}
                                />
                              </td>
                              <td className=' border border-gray-100 px-1 sm:px-3'>
                                {name}
                              </td>

                              <td className='text-left px-1 sm:px-3  border border-gray-100'>
                                {website}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sponsors;
