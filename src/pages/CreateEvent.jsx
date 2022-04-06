import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context';
import axios from '../utils/axios';

const CreateEvent = () => {
  const { closeSubmenuItems, getCreateTicketFormData } = useGlobalContext();
  const [events, setEvents] = useState([]);

  const [name, setName] = useState('');
  const [eventStarts, setEventStarts] = useState('');
  const [startTime, setStartTime] = useState('');
  const [eventEnds, setEventEnds] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(true);

  let formValue = {
    name,
    starts: eventStarts,
    start_time: startTime,
    ends: eventEnds,
    end_time: endTime,
    description,
    location,
  };
  // console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'event starts') {
      setEventStarts(value);
    }
    if (name === 'start time') {
      setStartTime(value);
    }
    if (name === 'event ends') {
      setEventEnds(value);
    }
    if (name === 'end time') {
      setEndTime(value);
    }
    if (name === 'location') {
      setLocation(value);
    }

    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'check') {
      setPublished(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getCreateTicketFormData(formValue);
    console.log(formValue);
    console.log('create ticket form submitted');
  };
  useEffect(() => {
    axios.get('/events').then((res) => {
      setEvents(res.data.data);
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
            <section className='mb-8 lg:w-8/12 sm:w-full mx-auto'>
              {/* single item */}
              <div className='rounded bg-white shadow-sm  '>
                <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                  <h1 className='capitalize text-lg font-normal tracking-wider text-gray-main '>
                    Past Events
                  </h1>
                </div>
                <div className='pt-7 pb-9 px-6 mt-2 '>
                  <table className='table-fixed   text-gray-light-2 text-sm w-full '>
                    <thead>
                      <tr className='text-gray-light-2   h-12 uppercase text-xs '>
                        <th className=' text-left w-1/12  px-0 sm:px-3 border border-gray-100'>
                          Date
                        </th>
                        <th className=' text-left w-3/12 px-1 sm:px-3 border border-gray-100'>
                          Event Name
                        </th>
                        <th className='text-left w-1/12 px-1 sm:px-3 border border-gray-100'>
                          Start Time
                        </th>
                        <th className=' text-left w-1/12 px-3 border border-gray-100'>
                          End Time
                        </th>
                        <th className=' text-left w-1/12 px-3 border border-gray-100'>
                          Guests
                        </th>
                        <th className=' text-left w-2/12 px-3 border border-gray-100'>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className='font-semibold'>
                      {events.map((event, id) => {
                        const { name, start, end, ongoing } = event;

                        return (
                          <tr className='h-12 capitalize'>
                            <td className=' text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3'>
                              <Moment fromNow>{start}</Moment>
                            </td>
                            <td className=' border border-gray-100 px-3'>
                              {name}
                            </td>
                            <td className='text-left px-3 font-semibold  border border-gray-100'>
                              <Moment format='MMMM/DD/YY'>{start}</Moment>
                            </td>
                            <td className='text-left px-3  border border-gray-100'>
                              <Moment format='MMMM/DD/YY'>{end}</Moment>
                            </td>
                            <td className='px-3  border border-gray-100'>
                              feb 09,2022
                            </td>
                            <td className='px-3  border border-gray-100'>
                              <button className='bg-blue-300 text-white font-small py-1 px-2 rounded-full'>
                                share
                              </button>{' '}
                              <button className='bg-green-400 text-white font-small py-1 px-2 rounded-full'>
                                edit
                              </button>{' '}
                              <button className='bg-red-400 text-white font-small py-1 px-2 rounded-full'>
                                unpublish
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
                        Create Event
                      </h1>
                    </div>
                    <div className='pt-5  px-6 mt-2 text-gray-light-2 mb-'>
                      <div className='flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-2 mb-4'>
                        <div className='flex flex-col gap-y-2 flex-1'>
                          <label htmlFor='type' className='capitalize'>
                            event name
                          </label>
                          <input
                            type='text'
                            name='name'
                            id='name'
                            value={name}
                            onChange={handleChange}
                            className='p-2 rounded border border-gray-100 w-full'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-y-4 gap-x-2 mb-4  px-6 mt-2 text-gray-light-2 '>
                      <div className='flex flex-col gap-y-2 flex-1'>
                        <label htmlFor='type' className='capitalize'>
                          event starts
                        </label>
                        <input
                          type='date'
                          name='event starts'
                          id='event starts'
                          value={eventStarts}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>
                      <div className='flex flex-col gap-y-2 flex-1'>
                        <label htmlFor='type' className='capitalize'>
                          start time
                        </label>
                        <input
                          type='time'
                          name='start time'
                          id='start time'
                          value={startTime}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 focus::border-red-500 w-full block'
                        />
                      </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-y-4 gap-x-2  px-6 mt-2 text-gray-light-2 mb-4'>
                      <div className='flex flex-col gap-y-2 flex-1'>
                        <label htmlFor='type' className='capitalize'>
                          event ends
                        </label>
                        <input
                          type='date'
                          name='event ends'
                          id='event ends'
                          value={eventEnds}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 w-full'
                        />
                      </div>
                      <div className='flex flex-col gap-y-2 flex-1'>
                        <label htmlFor='type' className='capitalize'>
                          end time
                        </label>
                        <input
                          type='time'
                          name='end time'
                          id='end time'
                          value={endTime}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 focus::border-red-500 w-full block'
                        />
                      </div>
                    </div>
                    <div className='flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2'>
                      <div className='flex flex-col gap-y-2 flex-1'>
                        <label htmlFor='type' className='capitalize'>
                          location
                        </label>
                        <input
                          type='time'
                          name='location'
                          id='location'
                          value={location}
                          onChange={handleChange}
                          className='p-2 rounded border border-gray-100 focus::border-red-500 w-full block'
                        />
                      </div>
                    </div>

                    <div className='flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2'>
                      <label htmlFor='type' className='capitalize'>
                        description
                      </label>
                      <textarea
                        type='textarea'
                        name='description'
                        id='description'
                        value={description}
                        onChange={handleChange}
                        className='p-2 rounded border border-gray-100 w-full'
                      />
                    </div>

                    <div className='px-6 pb-4'>
                      <div className='flex gap-x-2 items-center mb-2 '>
                        <input
                          className='p-4 text-3xl bg-purple-light-2 text-white '
                          type='checkbox'
                          name='published'
                          id='published'
                          checked={published}
                          onChange={handleChange}
                        />
                        <label htmlFor='published'>
                          Accept Terms & Condition
                        </label>
                      </div>
                      <button
                        type='submit'
                        onClick={handleFormSubmit}
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

export default CreateEvent;
