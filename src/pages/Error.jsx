import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Layout from "../components/Layout";

const Error = () => {
  const { closeSubmenuItems } = useGlobalContext();

  return (
    <Layout>
      <div
        onMouseOver={() => closeSubmenuItems()}
        className="ml-16 bg-gray-main flex-1"
      >
        <div className="px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6 mt-4  ">
         
            <div className="flex flex-col lg:flex-row gap-x-10">
              <div className="flex flex-col gap-y-6 lg:w-10/12 mx-auto">
                <section className=" w-full h-screen bg-white rounded  shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between lg:px-20 ">
                  <div className="lg:w-5/12 flex flex-col items-center justify-center  mb-10">
                    <div className="h-56 w-56 lg:h-96 lg:w-96  flex flex-col justify-center items-center rounded-full bg-gray-100 ">
                      <div className=" text-gray-500 text-center ">
                        <h1 className="text-8xl lg:text-9xl mb-6">404</h1>
                        <h5 className="capitalize text-xl lg:text-2xl">page not found</h5>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center text-center text-gray-500">
                    <h1 className=" text-6xl lg:text-9xl text-blue-400 mb-10 capitalize">
                      oops!
                    </h1>
                    <h1 className="text-3xl capitalize text-black mb-10 lg:mb-10">
                      page not found on server
                    </h1>
                    <p className="mb-10">
                      The link you followed is either inaccurate, has been
                      removed or the server has been instructed not to let you
                      have it
                    </p>
                    <button className="hidden md:block mx-5 my-auto rounded bg-purple-light text-white capitalize px-5 py-2">
                      <Link to="/">go back home</Link>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Error;
