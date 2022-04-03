import React from 'react';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context';

export const Template = ({ match }) => {
  const { closeSubmenuItems } = useGlobalContext();
  const { id } = match.params;
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
                <h2>Template {id}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Template;
