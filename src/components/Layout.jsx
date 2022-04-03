import Sidebar from './Sidebar';
import Submenu from './Submenu';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Submenu />
      <div className='mt-20 relative flex'>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
