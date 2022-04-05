import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Submenu = () => {
  const { isSubmenuItemsOpen, location, text, closeSubmenuItems } =
    useGlobalContext();
  const container = useRef(null);
  useEffect(() => {
    const submenu = container.current;
    const { top, right } = location;
    submenu.style.left = `${right}px`;
    submenu.style.top = `${top}px`;
  }, [location, text]);
  return (
    <aside
      className={`${
        isSubmenuItemsOpen ? 'block z-20 fixed top-0 left-0 ' : 'hidden'
      }`}
      ref={container}
    >
      <div
        className={`${
          text === 'home' ? 'block w-44 shadow-sm bg-submenu-light' : 'hidden'
        }`}
      >
        <h1 className='pl-3 py-3 text-white cursor-pointer capitalize text-sm font-'>
          dashboard
        </h1>
        <Link to='/'>
          <h1
            onClick={() => closeSubmenuItems()}
            className='pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4'
          >
            events
          </h1>
        </Link>
        <Link to='/analytics'>
          <h1
            onClick={() => closeSubmenuItems()}
            className='pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4'
          >
            analytics
          </h1>
        </Link>
      </div>
      <div
        className={`${
          text === 'event' ? 'block w-44 shadow-sm bg-submenu-light' : 'hidden'
        }`}
      >
        <h1 className='pl-3 py-3 text-white cursor-pointer capitalize text-sm '>
          event
        </h1>
        <Link to='/create-event'>
          <h1
            onClick={() => closeSubmenuItems()}
            className='pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4'
          >
            create event
          </h1>
        </Link>
        <Link to='/manage-rsvps'>
          <h1
            onClick={() => closeSubmenuItems()}
            className='pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4'
          >
            manage RSVPS
          </h1>
        </Link>
        <Link to='/pages'>
          <h1
            onClick={() => closeSubmenuItems()}
            className='pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4'
          >
            pages
          </h1>
        </Link>

        <Link to='/speakers'>
          <h1
            onClick={() => closeSubmenuItems()}
            className='pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4'
          >
            Speakers
          </h1>
        </Link>
        <Link to='/sponsors'>
          <h1
            onClick={() => closeSubmenuItems()}
            className='pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4'
          >
            Sponsors
          </h1>
        </Link>
      </div>
    </aside>
  );
};

export default Submenu;
