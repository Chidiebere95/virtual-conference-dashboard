import React, { useState } from "react";
import {
  FaTimes,
  FaUser,
} from "react-icons/fa";
// import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import img1 from "../images/event/event-1.png";
import img2 from "../images/event/event-2.png";
import img4 from "../images/analytics/analytics-chart-1.png";
import img5 from "../images/analytics/analytics-chart-2.png";
import img6 from "../images/analytics/analytics-chart-3.png";


const Event = () => {
  const {
    closeSubmenuItems,
  } = useGlobalContext();

  const [showNotification, setShowNotification] = useState(true);
  
  

  return (
  
        <div
          onMouseOver={() => closeSubmenuItems()}
          className="ml-16 bg-gray-main flex-1"
        >
          <div className="px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  ">
            <div className="mt-4 ">
              <section className={`${showNotification?"mb-8 rounded bg-green-light px-4 py-3 flex  sm:flex-row justify-between shadow-sm gap-y-4 text-white":"hidden"}`}>
                <p className=" text-base ">
                  Make sure you get paid out by{" "}
                  <a href="dummy.com" className="font-semibold">
                    confirming your payment options.
                  </a>
                </p>
                <button onClick={()=>setShowNotification(false)} className="">
                  <FaTimes />
                </button>
              </section>

              <section className="mb-8 grid grid-cols-1  lg:grid-cols-2  gap-y-10 gap-x-8">
               {/* single item */}
               <div className="rounded bg-white shadow-sm  ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                      Sales Overview
                    </h1>
                  </div>
                  <div className="pt-7 pb-5 px-6 ">
                    <div className="flex items-center justify-center gap-x-6 mb-16 flex-wrap gap-y-4 ">
                      <button className="rounded py-2 px-3 bg-purple-light capitalize text-white text-sm font-medium">discount codes</button>
                      <button className="rounded py-2 px-3  capitalize text-gray-light-2 hover:text-purple-light bg-transparent shadow-md text-sm font-medium">page views</button>
                      <button className="rounded py-2 px-3  capitalize text-gray-light-2 hover:text-purple-light bg-transparent shadow-md text-sm font-medium">at the door sale</button>
                      
                    </div>
                    <div className=" h-72 object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img1} alt="chart" className="h-full w-full" />
                    </div>
                  </div>
                </div>


              
               {/* single item */}
               <div className="rounded bg-white shadow-sm text-gray-light-2 ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                    Net Sales
                    </h1>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end">
                   <div className="sm:w-3/12 ">
                     <a href="dummy.com" className="">
                     <div className="text-center py-6 text-purple-light cursor-pointer">
                       <h5 className="text-sm font-semibold capitalize mb-3">net sales</h5>
                       <h1 className="text-2xl "><span className="">$</span>0.00</h1>
                     </div>
                     </a>
                     <a href="dummy.com" className="">
                     <div className="text-center py-6 hover:text-purple-light border border-gray-100">
                       <h5 className="text-sm font-semibold capitalize mb-3">tickets sold</h5>
                       <h1 className="text-2xl ">125</h1>
                     </div>
                     </a>
                     <a href="dummy.com" className="">
                     <div className="text-center py-6 hover:text-purple-light border border-gray-100">
                       <h5 className="text-sm font-semibold capitalize mb-3">page views</h5>
                       <h1 className="text-2xl ">5635</h1>
                     </div>
                     </a>
                     <a href="dummy.com" className="">
                     <div className="text-center py-6 hover:text-purple-light border border-gray-100">
                       <h5 className="text-sm font-semibold capitalize mb-3">invites</h5>
                       <h1 className="text-2xl ">23</h1>
                     </div>
                     </a>
                   </div>
                   <div className="sm:flex-1 pt-16 pb-4 px-10 ">
                     <div className="grid grid-cols-3 mb-8 ">
                       <div className="">
                         <h1 className="capitalize ">gross sale</h1>
                         <h1 className="capitalize "><span className="">$</span>750.00</h1>
                       </div>
                       <div className="">
                         <h1 className="capitalize ">online sale</h1>
                         <h1 className="capitalize "><span className="">$</span>450.00</h1>
                       </div>
                       <div className="">
                         <h1 className="capitalize ">offline sale</h1>
                         <h1 className="capitalize "><span className="">$</span>300.00</h1>
                       </div>
                     </div>
                     <div className=" h-72 object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img2} alt="chart" className="h-full w-full" />
                    </div>
                   </div>
                  </div>
                </div>


              

                
              </section>

              <section className=" mb-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-10 gap-x-8 ">
                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 text-gray-main border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                      event goals
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 text-gray-light-2">
                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-semibold text-sm  tracking-wide">
                          Wordpress Theme Development
                        </h1>
                        <span className="font-bold text-gray-main">85%</span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-200 ">
                        <div className="w-9/12 h-1 bg-purple-600 rounded"></div>
                        <div className="w-3/12 h-1 bg-gray "></div>
                      </div>
                    </div>

                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-semibold text-sm  tracking-wide">
                          UI Design
                        </h1>
                        <span className="font-bold text-gray-main">65%</span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-200 ">
                        <div className="w-7/12 h-1 bg-green-600 rounded"></div>
                        <div className="w-5/12 h-1 bg-gray "></div>
                      </div>
                    </div>

                    {/* progress bar container */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h1 className="capitalize font-semibold text-sm tracking-wide">
                          Digital Marketing
                        </h1>
                        <span className="font-bold text-gray-main">65%</span>
                      </div>
                      {/* replace with progress bar */}
                      <div className="flex rounded h-1 bg-gray-200 ">
                        <div className="w-7/12 h-1 bg-purple-600 rounded"></div>
                        <div className="w-5/12 h-1 bg-gray "></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 text-gray-main border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                      Bloomreach Connect
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="img-container h-36 w-36 mx-auto  flex items-center justify-center relative object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img4} alt="chart" className="" />
                      <div className=" absolute top-1/2 transform -translate-y-1/2 flex items-center gap-x-2 text-gray-light-2">
                        <FaUser />
                        <span className="font-normal">960</span>
                      </div>
                    </div>
                    <h1 className="text-center capitalize font-normal text-gray-main">
                      attend
                    </h1>
                  </div>
                </div>

                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 text-gray-main border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                      Tech Inclusion
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="img-container h-36 w-36 mx-auto  flex items-center justify-center relative object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img5} alt="chart" className="" />
                      <div className=" absolute top-1/2 transform -translate-y-1/2 flex items-center gap-x-2 text-gray-light-2">
                        <FaUser />
                        <span className="font-normal">1250</span>
                      </div>
                    </div>
                    <h1 className="text-center capitalize font-normal text-gray-main">
                      attended
                    </h1>
                  </div>
                </div>

                {/* single item */}
                <div className="rounded bg-white shadow-sm ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wide ">
                      Presto Summit
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 ">
                    <div className="img-container h-36 w-36 mx-auto  flex items-center justify-center relative object-contain mb-2">
                      {/* replace with chart */}
                      <img src={img6} alt="chart" className="" />
                      <div className=" absolute top-1/2 transform -translate-y-1/2 flex items-center gap-x-2 text-gray-light-2">
                        <FaUser />
                        <span className="font-normal">100</span>
                      </div>
                    </div>
                    <h1 className="text-center capitalize font-normal text-gray-main">
                      ongoing
                    </h1>
                  </div>
                </div>
              </section>

              <section className="mb-8 ">
                {/* single item */}
                <div className="rounded bg-white shadow-sm  ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                    Sales By Ticket Type
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 mt-2 ">
                  <table className="table-fixed   text-gray-light-2 text-sm w-full ">
                        <thead>
                          <tr className="text-gray-light-2   h-12 uppercase text-xs sm:text-">
                            <th className=" text-left w-2/12 sm:w-5/12 px-0 sm:px-3 border border-gray-100">
                              pe
                            </th>
                            <th className=" text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                              price
                            </th>
                            <th className="text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                              sold
                            </th>
                            <th className=" text-left w-2/12 px-3 border border-gray-100">
                              status
                            </th>
                            <th className=" text-left w-2/12 px-3 border border-gray-100">
                              end sales
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="h-12 font-semibold">
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            Laracon US 2019
                            </td>
                            <td className=" border border-gray-100 px-3">
                            <span className="">$</span> 25.00
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                            0/50
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            On Sale
                            </td>
                            <td className="px-3  border border-gray-100">
                              <div className="flex flex-wrap">
                              <span className="">8/8/19</span><span className=""> 7:00 PM</span>
                              </div>
                            </td>
                          </tr>
                          <tr className="h-12 font-semibold">
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            VOICE 2019
                            </td>
                            <td className=" border border-gray-100 px-3">
                            <span className="">$</span> 25.00
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                            0/50
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            On Sale
                            </td>
                            <td className="px-3  border border-gray-100">
                              <div className="flex flex-wrap">
                              <span className="">8/8/19</span><span className=""> 7:00 PM</span>
                              </div>
                            </td>
                          </tr>
                          <tr className="h-12 font-semibold">
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            Moving Forward Conference NYC 2019
                            </td>
                            <td className=" border border-gray-100 px-3">
                            <span className="">$</span> 25.00
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                            0/50
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            On Sale
                            </td>
                            <td className="px-3  border border-gray-100">
                              <div className="flex flex-wrap">
                              <span className="">8/8/19</span><span className=""> 7:00 PM</span>
                              </div>
                            </td>
                          </tr>
                          <tr className="h-12 font-semibold">
                            <td className="  sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            Biodesign Challenge Summit 2019
                            </td>
                            <td className=" border border-gray-100 px-3">
                            <span className="">$</span> 25.00
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                            0/50
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            On Sale
                            </td>
                            <td className="px-3  border border-gray-100">
                              <div className="flex flex-wrap">
                              <span className="">8/8/19</span><span className=""> 7:00 PM</span>
                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                  </div>
                </div>

               
              </section>

              
              <section className="mb-8 ">
                {/* single item */}
                <div className="rounded bg-white shadow-sm  ">
                  <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                    <h1 className="capitalize text-lg font-normal tracking-wider text-gray-main ">
                    recent orders
                    </h1>
                  </div>
                  <div className="pt-7 pb-9 px-6 mt-2 ">
                  <table className="table-fixed   text-gray-light-2 text-sm w-full ">
                        <thead>
                          <tr className="text-gray-light-2   h-12 uppercase text-xs ">
                            <th className=" text-left w-2/12  px-0 sm:px-3 border border-gray-100">
                              order#
                            </th>
                            <th className=" text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                              ticket buyer
                            </th>
                            <th className="text-left w-2/12 px-1 sm:px-3 border border-gray-100">
                              quantity
                            </th>
                            <th className=" text-left w-2/12 px-3 border border-gray-100">
                              price
                            </th>
                            <th className=" text-left w-2/12 px-3 border border-gray-100">
                              date
                            </th>
                            <th className=" text-left w-2/12 px-3 border border-gray-100">
                              payment
                            </th>
                          </tr>
                        </thead>
                        <tbody className="font-semibold">
                          <tr className="h-12 capitalize">
                            <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            236589
                            </td>
                            <td className=" border border-gray-100 px-3">
                            Mr John
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                              2
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            <span className="">$</span>25.21
                            </td>
                            <td className="px-3  border border-gray-100">
                            feb 09,2022
                            </td>
                            <td className="px-3  border border-gray-100">
                            Guest
                            </td>
                          </tr>
                       
                          <tr className="h-12 capitalize">
                            <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            236589
                            </td>
                            <td className=" border border-gray-100 px-3">
                            Mr John
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                              2
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            <span className="">$</span>25.21
                            </td>
                            <td className="px-3  border border-gray-100">
                            feb 09,2022
                            </td>
                            <td className="px-3  border border-gray-100">
                            Guest
                            </td>
                          </tr>
                         
                          <tr className="h-12 capitalize">
                            <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            236589
                            </td>
                            <td className=" border border-gray-100 px-3">
                            Mr John
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                              2
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            <span className="">$</span>25.21
                            </td>
                            <td className="px-3  border border-gray-100">
                            feb 09,2022
                            </td>
                            <td className="px-3  border border-gray-100">
                            Guest
                            </td>
                          </tr>
                         
                          <tr className="h-12 capitalize ">
                            <td className=" text-xs sm:text-base  border border-gray-100 capitalize px-0 sm:px-3">
                            236589
                            </td>
                            <td className=" border border-gray-100 px-3">
                            Mr John
                            </td>
                            <td className="text-left px-3 font-semibold  border border-gray-100">
                              2
                            </td>
                            <td className="text-left px-3  border border-gray-100">
                            <span className="">$</span>25.21
                            </td>
                            <td className="px-3  border border-gray-100">
                            feb 09,2022
                            </td>
                            <td className="px-3  border border-gray-100">
                            Guest
                            </td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      
  );
};

export default Event;
