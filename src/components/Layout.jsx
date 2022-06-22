import Sidebar from './Sidebar';
import Submenu from './Submenu';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Submenu />
      <div
        className='mt-20 relative flex bg-red-500'
        style={{
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
