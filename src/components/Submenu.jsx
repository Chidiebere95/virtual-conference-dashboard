import React, {  useRef, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context'

const Submenu = () => {
    const { isSubmenuItemsOpen, location,text} = useGlobalContext(); 
    const container = useRef(null)
    useEffect(() => {
        const submenu = container.current
        const { top, right } = location
        submenu.style.left = `${right}px`
        submenu.style.top = `${top}px`
        
      }, [ location,text])
  return (
    <aside
      className={`${isSubmenuItemsOpen ? 'block z-20 fixed top-0 left-0 ' : 'hidden'}`}
      ref={container}
    >
     <div className={`${text==='home'?"block w-44 shadow-sm bg-submenu-light":"hidden"}`}>
       {/* <Link to=""></Link> */}
       <h1 className="pl-3 py-3 text-white cursor-pointer capitalize text-sm font-">dashboard</h1>
       <h1 className="pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4">events</h1>
       <h1  className="pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4">analytics</h1>

     </div>
     <div className={`${text==='event'?"block w-44 shadow-sm bg-submenu-light":"hidden"}`}>
       {/* <Link to=""></Link> */}
       <h1 className="pl-3 py-3 text-white cursor-pointer capitalize text-sm font-">event</h1>
       <h1 className="pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4">create event</h1>
       <h1  className="pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4">create ticket</h1>
       <h1  className="pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4">guest</h1>
       <h1  className="pl-3 py-3 text-submenu-purple hover:text-white cursor-pointer capitalize text-sm bg-purple-light-4">blank</h1>
       
       </div>
    </aside>
  )
}

export default Submenu
