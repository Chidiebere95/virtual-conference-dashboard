import Sidebar from "./Sidebar";
import Submenu from "./Submenu";

const LayoutForNoNav = ({ children }) => {
  return (
    <div className="">
      <Submenu />
      <div className=" relative flex min-h-screen items-center bg-gray-main">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default LayoutForNoNav;
