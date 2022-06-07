import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
// import SimpleMDE from 'react-simplemde-editor';
// import 'easymde/dist/easymde.min.css';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import Editor from '../components/Editor';
import Layout from '../components/Layout';
import axios from '../utils/axios';
// import { outputHtml } from '../utils/converter';


const Blog = () => {
  const { closeSubmenuItems, getBlogFormData } = useGlobalContext();

  const [name, setName] = useState('');
  const [localContent, setLocalContent] = useState('');
  const [checked, setChecked] = useState(true);
  const [markdown, setMarkdown] = useState('');
  const [pages, setPages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idToEdit, setIdToEdit] = useState('');

  let formValue = {
    name,
    content: JSON.stringify(markdown),
    path: `/${name.split(' ')[0].toLowerCase()}`,
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // console.log(name, value);

    if (name === 'name') {
      setName(value);
    }
    if (name === 'content') {
      setLocalContent(value);
    }
    if (name === 'check') {
      setChecked(value);
    }
  };
  const onChangeMarkdown = (md) => {
    setMarkdown(md);
    setLocalContent(md);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getBlogFormData(formValue);
    console.log(formValue)
    axios.post('/pages/add', formValue).then((res) => {
      console.log(res.data);
    });
    console.log(formValue);
  };
  const handleEdit = (e, speakerId) => {
    e.preventDefault();
    const updatePayload = {};
    if (name) updatePayload.name = name;
    if (localContent) updatePayload.content = localContent;
    updatePayload.path = `/${name.split(' ')[0].toLowerCase()}`;

    axios
      .put(`/pages/edit?id=${speakerId}`, updatePayload)
      .then((res) => {
        const tempSpeaker = res.data.data;
        console.log(tempSpeaker);

        setPages((prevState) => {
          const newpages = [
            ...prevState.filter((item) => item._id !== speakerId),
            tempSpeaker,
          ];
          return newpages;
        });

        setLocalContent('');
        setName('');
 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (speakerId) => {
    axios.delete(`/pages/remove/${speakerId}`).then((res) => {
      const temppages = pages.filter((item) => item._id !== speakerId);
      setPages(temppages);
    });
  };
  const handleUpdate = (data) => {
    // const dataToHTML = outputHtml(data.blocks);
    setMarkdown(data);
    setLocalContent(data);
  }
  useEffect(() => {
    axios.get('/pages').then((res) => {
      setPages(res.data.data);
    });
  }, [markdown]);
  return (
    <Layout>
      <div
        onMouseOver={() => closeSubmenuItems()}
        className='ml-16 bg-gray-main flex-1'
      >
        <div className='px-4 md:px-14  lg:pt-2 lg:px-6  '>
          <div className='mt-4 flex flex-col lg:flex-row xs:flex-col md:flex-col gap-x-6'>
            <section className='mb-8 lg:w-7/12 xs:w-full lg:max-w-6xl mx-auto ml-2'>
              {/* single item */}
              <form action='' className=''>
                <div className='rounded bg-white shadow-sm  '>
                  <div className='px-6 pt-5 pb-5 border-b border-gray-100 flex justify-between'>
                    <h1 className='capitalize text-lg font-medium tracking-wider text-gray-main '>
                      {editMode ? 'Edit Page' : 'Create New Page'}
                    </h1>
                    {editMode && (
                      <button
                        className='py-2 px-3 text-sm font-semibold text-white bg-red-light capitalize hover:bg-purple-light-2 rounded'
                        onClick={() => {
                          setEditMode(false);
                          setName('');
                        }}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                    <label htmlFor='type' className='capitalize'>
                      name
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

                  <div className='flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2'>
                    <div className='editor__wrapper'>
                      <div className='main__editor__wrapper'>
                        <Editor
                          handleUpdate={handleUpdate}
                          data={editMode ? localContent : markdown}
                        />
                      </div>
                      <label htmlFor='post_tags'>
                        Tags{' '}
                        <small>
                          (separate tags by a comma, space or hit enter)
                        </small>
                      </label>
                    </div>
                  </div>

                  <div className='px-6 pb-4'>
                    <div className='flex gap-x-2 items-center mb-2 '>
                      <input
                        className=' h-4 w-4 bg-purple-light-2 text-white '
                        type='checkbox'
                        name='check'
                        id='check'
                        checked={checked}
                        onChange={handleChange}
                      />
                      <label htmlFor='check'>
                        This will generate this page on www.dygycon.com. Kindly
                        check again to ensure that page content are consistent.
                      </label>
                    </div>
                    {editMode ? (
                      <button
                        type='submit'
                        onClick={(e) => handleEdit(e, idToEdit)}
                        className='py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded'
                      >
                        Edit Page
                      </button>
                    ) : (
                      <button
                        type='submit'
                        onClick={handleFormSubmit}
                        className='py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded'
                      >
                        Create Page
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </section>
            <section className='mb-8 lg:w-5/12  xs:w-full mx-auto'>
              {/* single item */}
              <div
                className='rounded bg-white shadow-sm'
                style={{
                  position: 'sticky',
                  postion: '-webkit-sticky',
                  top: '100px',
                }}
              >
                <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                  <h1 className='capitalize text-lg font-normal tracking-wider text-gray-main '>
                    pages
                  </h1>
                </div>
                <div className='pt-7 pb-9 px-6 mt-2 '>
                  <table className='table-fixed   text-gray-light-2 text-sm w-full '>
                    <thead>
                      <tr className='text-gray-light-2   h-12 uppercase text-xs text-center'>
                        <th className=' text-left w-1/12 sm:w- px-0 sm:px-3 border border-gray-100'>
                          #
                        </th>
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
                      {pages?.map((item, index) => {
                        const { _id, name, path, content } = item;
                        return (
                          <tr
                            key={index}
                            className='h-12 font-semibold capitalize'
                          >
                            <td className='  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3'>
                              {index + 1}
                            </td>

                            <td className=' border border-gray-100 px-1 sm:px-3'>
                              {name}
                            </td>

                            <td className='text-left px-1 sm:px-3  border border-gray-100'>
                              {path}
                            </td>
                            <td className='text-left px-3  border border-gray-100 flex gap-x-2 items-center h-12'>
                              <button
                                onClick={() => {
                                  setEditMode(true);
                                  setIdToEdit(_id);
                                  setName(name);
                                  setLocalContent(JSON.parse(content));
                                  console.log(content);
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
    </Layout>
  );
};

export default Blog;
