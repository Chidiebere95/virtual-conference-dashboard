import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Layout from '../components/Layout';

const Blog = () => {
  const { closeSubmenuItems, getBlogFormData } = useGlobalContext();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(true);
  const [markdown, setMarkdown] = useState('');

  let formValue = {
    name,
    imageUrl,
    description,
    checked,
  };
  // console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log(name, value);

    if (name === 'name') {
      setName(value);
    }
    if (name === 'image url') {
      setImageUrl(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'check') {
      setChecked(value);
    }
  };
  const onChangeMarkdown = (md) => {
    setMarkdown(md);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getBlogFormData(formValue);
    console.log(formValue);
    console.log('blog form submitted');
  };

  return (
    <Layout>
      <div
        onMouseOver={() => closeSubmenuItems()}
        className='ml-16 bg-gray-main flex-1'
      >
        <div className='px-4 md:px-14  lg:pt-2 lg:px-6  '>
          <div className='mt-4 '>
            <section className='mb-8  lg:max-w-6xl mx-auto'>
              {/* single item */}
              <form action='' className=''>
                <div className='rounded bg-white shadow-sm  '>
                  <div className='px-6 pt-5 pb-5 border-b border-gray-100'>
                    <h1 className='capitalize text-lg font-medium tracking-wider text-gray-main '>
                      Create New Page
                    </h1>
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

                  <div className='flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 '>
                    <label htmlFor='type' className='capitalize'>
                      image URL
                    </label>
                    <input
                      type='text'
                      name='image url'
                      id='image url'
                      value={imageUrl}
                      onChange={handleChange}
                      className='p-2 rounded border border-gray-100 w-full'
                    />
                  </div>

                  <div className='flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2'>
                    <div className='editor__wrapper'>
                      <div className='main__editor__wrapper'>
                        <SimpleMDE
                          onChange={onChangeMarkdown}
                          value={markdown}
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
                    <button
                      type='submit'
                      onClick={handleFormSubmit}
                      className='py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded'
                    >
                      Create Page
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
