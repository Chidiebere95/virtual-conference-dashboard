import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context';
import { FaTrash, FaReply } from 'react-icons/fa';
import axios from '../utils/axios';
import md5 from 'md5';

const CreateTicket = () => {
  const { closeSubmenuItems } = useGlobalContext();
  const [rsvps, setRsvps] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [checked, setChecked] = useState(true);
  const [order, setOrder] = useState('asc');

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log(name, value);
    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'message') {
      setMessage(value);
    }
    if (name === 'subject') {
      setSubject(value);
    }

    if (name === 'check') {
      setChecked(value);
    }
  };

  const handleReponse = (e, rsvpId, confirm) => {
    e.preventDefault();
    const updatePayload = {};
    updatePayload.id = rsvpId;
    updatePayload.confirmed = confirm;

    axios
      .post(`/rsvp/confirm`, updatePayload)
      .then((res) => {
        const tempRsvp = res.data.data;

        setRsvps(tempRsvp);

        setEmail('');

        setMessage('');
        setOrder('asc');
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`/rsvp/remove/${id}`).then((res) => {
      const tempsponsors = rsvps.filter((item) => item._id !== id);
      setRsvps(tempsponsors);
    });
  };
  const handleSort = (type) => {
    if (type === 'asc') {
      setOrder('asc');

      axios.get('/rsvp').then((res) => {
        setRsvps(
          res.data.data.sort((a, b) => {
            return a.created_at.localeCompare(b.created_at);
          }),
        );
      });
    } else if (type === 'desc') {
      setOrder('desc');
      axios.get('/rsvp').then((res) => {
        setRsvps(
          res.data.data.sort((a, b) => {
            return b.created_at.localeCompare(a.created_at);
          }),
        );
      });
    } else if (type === 'con') {
      setOrder('con');
      axios.get('/rsvp').then((res) => {
        setRsvps(res.data.data.filter((rsvp) => rsvp.confirmed === true));
      });
      // const tempRsvp = rsvps.filter((rsvp) => rsvp.confirmed === true);
      // setRsvps(tempRsvp);
    } else {
      setOrder('uncon');

      // const tempRsvp = rsvps.filter((rsvp) => rsvp.confirmed === false);
      // setRsvps(tempRsvp);
      axios.get('/rsvp').then((res) => {
        setRsvps(res.data.data.filter((rsvp) => rsvp.confirmed === false));
      });
    }
  };

  useEffect(() => {
    axios.get('/rsvp').then((res) => {
      setRsvps(res.data.data);
    });
  }, []);
  return (
    <Layout>
      <div
        onMouseOver={() => closeSubmenuItems()}
        className='ml-16 bg-gray-main flex-1'
      >
        <div className='px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  '>
          <div className='mt-4 flex flex-col lg:flex-row gap-6'>
            <section className='mb-8  lg:w-8/12 sm:w-full mx-auto'>
              {/* single item */}
              <form action='' className=''>
                <div className='rounded bg-white shadow-sm  '>
                  <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                    <h1 className='capitalize text-lg font-medium tracking-wider text-gray-main '>
                      RSVPS
                    </h1>
                  </div>
                  <div className='pt-5  px-6 mt-2 text-gray-light-2 mb-'>
                    <div className='flex gap-x-5 capitalize items-center mb-4'>
                      <div className='flex items-center gap-x-1'>
                        <input
                          onChange={() => handleSort('asc')}
                          type='radio'
                          className='bg-purple-light-2 text-purple-light h-5 w-5'
                          name='type'
                          value={order}
                        />
                        <label htmlFor='type' className='capitalize'>
                          Ascending
                        </label>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <input
                          onChange={() => handleSort('desc')}
                          type='radio'
                          className='bg-purple-light-2 text-purple-light h-5 w-5'
                          name='type'
                          value='desc'
                        />
                        <label htmlFor='type' className='capitalize'>
                          Descending
                        </label>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <input
                          onChange={() => handleSort('con')}
                          type='radio'
                          className='bg-purple-light-2 text-purple-light h-5 w-5'
                          name='type'
                          value='con'
                        />
                        <label htmlFor='type' className='capitalize'>
                          confirmed
                        </label>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <input
                          onChange={() => handleSort('uncon')}
                          type='radio'
                          className='bg-purple-light-2 text-purple-light h-5 w-5'
                          name='type'
                          value='uncon'
                        />
                        <label htmlFor='type' className='capitalize'>
                          unconfirmed
                        </label>
                      </div>
                    </div>
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
                            email
                          </th>
                          <th className='text-left w-5/12 px-1 sm:px-3 border border-gray-100 '>
                            message
                          </th>

                          <th className='text-left w-2/12 px-1 sm:px-3 border border-gray-100'>
                            action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rsvps.map((item, index) => {
                          const { _id, name, email, message, confirmed } = item;

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
                                  src={`https://www.gravatar.com/avatar/
                                    ${md5(
                                      email.trim().toLowerCase(),
                                    )}.jpg?d=identicon`}
                                  alt={name}
                                />
                              </td>
                              <td
                                className=' border border-gray-100 px-1 sm:px-3 cursor-pointer'
                                datatype='tool-tip'
                                title={confirmed ? 'confirmed' : 'unconfirmed'}
                              >
                                {name} {confirmed ? '✅' : ''}
                              </td>
                              <td className=' border border-gray-100 px-1 sm:px-3'>
                                {email.toLowerCase()}
                              </td>
                              <td className='text-left px-1 sm:px-3  border border-gray-100'>
                                {message}
                              </td>
                              <td className='text-left px-3  border border-gray-100 flex gap-x-2 items-center h-12'>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setMessage(`Hello ${name}`);

                                    setEmail(email);
                                  }}
                                  className=''
                                >
                                  <FaReply />
                                </button>
                                <span> </span>
                                <button
                                  onClick={(e) => handleDelete(e, _id)}
                                  className=''
                                >
                                  <FaTrash />
                                </button>
                                {confirmed ? (
                                  <button
                                    onClick={(e) =>
                                      handleReponse(e, _id, !confirmed)
                                    }
                                  >
                                    ✖️
                                  </button>
                                ) : (
                                  <button
                                    onClick={(e) =>
                                      handleReponse(e, _id, !confirmed)
                                    }
                                  >
                                    ✅
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
            </section>
            <section className='mb-8  lg:w-4/12 mx-auto'>
              {/* single item */}
              <div
                style={{
                  position: 'sticky',
                  postion: '-webkit-sticky',
                  top: '100px',
                }}
              >
                <form action='' className=''>
                  <div className='rounded bg-white shadow-sm  '>
                    <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                      <h1 className='capitalize text-lg font-medium tracking-wider text-gray-main '>
                        Reply RSVPS
                      </h1>
                    </div>
                    <div className='pt-5  px-6 mt-2 text-gray-light-2 mb-'>
                      <div className='flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-2 mb-4'>
                        <div className='flex flex-col gap-y-2 flex-1'>
                          <label htmlFor='type' className='capitalize'>
                            Topic
                          </label>
                          <input
                            type='text'
                            name='subject'
                            id='subject'
                            value={subject}
                            onChange={handleChange}
                            className='p-2 rounded border border-gray-100 w-full'
                          />
                        </div>
                      </div>
                      <div className='flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-2 mb-4'>
                        <div className='flex flex-col gap-y-2 flex-1'>
                          <label htmlFor='type' className='capitalize'>
                            Email
                          </label>
                          <input
                            type='text'
                            name='email'
                            id='email'
                            value={email.toLowerCase()}
                            onChange={handleChange}
                            className='p-2 rounded border border-gray-100 w-full'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2'>
                      <label htmlFor='type' className='capitalize'>
                        message
                      </label>
                      <textarea
                        type='textarea'
                        name='message'
                        id='message'
                        value={message}
                        onChange={handleChange}
                        className='p-2 rounded border border-gray-100 w-full'
                      />
                    </div>

                    <div className='px-6 pb-4'>
                      <div className='flex gap-x-2 items-center mb-2 '>
                        <input
                          className='p-4 text-3xl bg-purple-light-2 text-white '
                          type='checkbox'
                          name='check'
                          id='check'
                          checked={checked}
                          onChange={handleChange}
                        />
                        <label htmlFor='check'>Accept Terms & Condition</label>
                      </div>
                      <button
                        // href={`mailto:${email}?subject=${subject}&body=${message}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `mailto:${email}?subject=${subject}&body=${message}`;

                          setMessage('');
                          setSubject('');
                          setEmail('');
                        }}
                        className='py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded'
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTicket;
