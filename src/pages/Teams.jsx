import React, { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import axios from '../utils/axios';
import { useGlobalContext } from '../context';
import Layout from '../components/Layout';

const Teams = () => {
  const { closeSubmenuItems } = useGlobalContext();
  const [showNotification, setShowNotification] = useState(false);
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('');
  const [addedSpeaker, setAddedSpeaker] = useState('');
  const [idToEdit, setIdToEdit] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Refs
  const nameContainer = useRef(null);
  const avatarUrlContainer = useRef(null);
  const roleContainer = useRef(null);

  let formValue = {
    name,
    role,
    avatar,
  };
  //   console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'role') {
      setRole(value);
    }
    if (name === 'name') {
      setName(value);
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
    if (role === '' || name === '' || avatar === '') {
      if (nameContainer.current.value === '') {
        nameContainer.current.style.borderColor = 'red';
        return;
      } else {
        nameContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
      }
      if (avatarUrlContainer.current.value === '') {
        avatarUrlContainer.current.style.borderColor = 'red';
        return;
      } else {
        avatarUrlContainer.current.style.borderColor =
          ' rgba(243, 244, 246,0.5)';
      }
      if (roleContainer.current.value === '') {
        roleContainer.current.style.borderColor = 'red';
        return;
      } else {
        roleContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
      }
    } else {
      axios
        .post('/teams/add', formValue, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          setTeams((prevState) => {
            const newteams = [...prevState, formValue];
            return newteams;
          });

          nameContainer.current.style.borderColor = ' rgba(243, 244, 246,0.5)';
          avatarUrlContainer.current.style.borderColor =
            'rgba(243, 244, 246,0.5)';
          roleContainer.current.style.borderColor = 'rgba(243, 244, 246,0.5)';
          const { name } = formValue;
          setNotification(name);
          setRole('');
          setName('');
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
    if (role) updatePayload.role = role;
    if (avatar) updatePayload.avatar = avatar;

    axios
      .put(`/teams/edit?id=${speakerId}`, updatePayload)
      .then((res) => {
        const tempSpeaker = res.data.data;
        console.log(tempSpeaker);

        setTeams((prevState) => {
          const newteams = [
            ...prevState.filter((item) => item._id !== speakerId),
            tempSpeaker,
          ];
          return newteams;
        });

        setRole('');
        setName('');
        setAvatar('');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (speakerId) => {
    axios.delete(`/teams/remove?id=${speakerId}`).then((res) => {
      const tempteams = teams.filter((item) => item._id !== speakerId);
      setTeams(tempteams);
    });
  };
  useEffect(() => {
    axios.get('/teams').then((res) => {
      setTeams(res.data.data);
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
                            Edit Team Member
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
                            role
                          </label>
                          <input
                            ref={roleContainer}
                            type='text'
                            name='role'
                            id='role'
                            value={role}
                            onChange={handleChange}
                            className='p-2 rounded border border-gray-100 w-full'
                          />
                        </div>

                        <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                          <label htmlFor='type' className='capitalize'>
                            avatar URL
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
                            submit edit
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className='rounded  shadow-sm w-full '>
                        <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                          <h1 className='capitalize text-lg font-medium tracking-wider text-gray-main '>
                            Create Team Member
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
                            role
                          </label>
                          <input
                            ref={roleContainer}
                            type='text'
                            name='role'
                            id='role'
                            value={role}
                            onChange={handleChange}
                            className='p-2 rounded border border-gray-100 w-full'
                          />
                        </div>

                        <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                          <label htmlFor='type' className='capitalize'>
                            avatar URL
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
                      teams
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
                            role
                          </th>
                          <th className='text-left w-2/12 px-1 sm:px-3 border border-gray-100'>
                            action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map((item, index) => {
                          const { _id, name, avatar, role } = item;
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
                                  src={avatar}
                                  alt={name}
                                />
                              </td>
                              <td className=' border border-gray-100 px-1 sm:px-3'>
                                {name}
                              </td>

                              <td className='text-left px-1 sm:px-3  border border-gray-100'>
                                {role}
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

export default Teams;
