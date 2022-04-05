import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context';

const CreateEvent = () => {
  const { closeSubmenuItems, getCreateTicketFormData } = useGlobalContext();
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [eventStarts, setEventStarts] = useState('');
  const [startTime, setStartTime] = useState('');
  const [eventEnds, setEventEnds] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(true);

  let formValue = {
    type,
    name,
    eventStarts,
    startTime,
    eventEnds,
    endTime,
    description,
    checked,
  };
  // console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log(name, value);
    if (name === 'type') {
      setType(value);
    }
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

    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'check') {
      setChecked(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getCreateTicketFormData(formValue);
    console.log(formValue);
    console.log('create ticket form submitted');
  };

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
                      Past Events
                    </h1>
                  </div>
                  <div className='pt-5  px-6 mt-2 text-gray-light-2 mb-'>
                    <div className='flex gap-x-5 capitalize items-center mb-4'>
                      <div className='flex items-center gap-x-1'>
                        <input
                          onChange={handleChange}
                          type='radio'
                          className='bg-purple-light-2 text-purple-light h-5 w-5'
                          name='type'
                          value='paid'
                        />
                        <label htmlFor='type' className='capitalize'>
                          paid
                        </label>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <input
                          onChange={handleChange}
                          type='radio'
                          className='bg-purple-light-2 text-purple-light h-5 w-5'
                          name='type'
                          value='free'
                        />
                        <label htmlFor='type' className='capitalize'>
                          free
                        </label>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <input
                          onChange={handleChange}
                          type='radio'
                          className='bg-purple-light-2 text-purple-light h-5 w-5'
                          name='type'
                          value='donation'
                        />
                        <label htmlFor='type' className='capitalize'>
                          donation
                        </label>
                      </div>
                    </div>

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
                        type='password'
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
                        type='password'
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
                        type='password'
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
                        type='password'
                        name='end time'
                        id='end time'
                        value={endTime}
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
                        name='check'
                        id='check'
                        checked={checked}
                        onChange={handleChange}
                      />
                      <label htmlFor='check'>Accept Terms & Condition</label>
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
                      <div className='flex gap-x-5 capitalize items-center mb-4'>
                        <div className='flex items-center gap-x-1'>
                          <input
                            onChange={handleChange}
                            type='radio'
                            className='bg-purple-light-2 text-purple-light h-5 w-5'
                            name='type'
                            value='paid'
                          />
                          <label htmlFor='type' className='capitalize'>
                            paid
                          </label>
                        </div>
                        <div className='flex items-center gap-x-1'>
                          <input
                            onChange={handleChange}
                            type='radio'
                            className='bg-purple-light-2 text-purple-light h-5 w-5'
                            name='type'
                            value='free'
                          />
                          <label htmlFor='type' className='capitalize'>
                            free
                          </label>
                        </div>
                        <div className='flex items-center gap-x-1'>
                          <input
                            onChange={handleChange}
                            type='radio'
                            className='bg-purple-light-2 text-purple-light h-5 w-5'
                            name='type'
                            value='donation'
                          />
                          <label htmlFor='type' className='capitalize'>
                            donation
                          </label>
                        </div>
                      </div>

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
                          name='check'
                          id='check'
                          checked={checked}
                          onChange={handleChange}
                        />
                        <label htmlFor='check'>Accept Terms & Condition</label>
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
