import React, { useState, useRef } from "react";
import { useGlobalContext } from "../context";
import Layout from "../components/Layout";

const Login = () => {
  const { closeSubmenuItems } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Refs
  const userNameContainer = useRef(null);
  const passwordContainer = useRef(null);

  let formValue = {
    username,
    password,
  };
  //   console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    name === "username" && setUsername(value);
    name === "password" && setPassword(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      if (username === "") {
        userNameContainer.current.style.borderColor = "red";
      } else {
        userNameContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      }
      if (password === "") {
        passwordContainer.current.style.borderColor = "red";
      } else {
        passwordContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      }
    } else {
      setBackToDefault();
      // console.log("everything complete");
      // console.log(formValue);
    }
  };

  const setBackToDefault = () => {
    userNameContainer.current.value = "";
    passwordContainer.current.value = "";
    userNameContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
    passwordContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
  };
  return (
    <Layout>
      <div
        onMouseOver={() => closeSubmenuItems()}
        className="ml-16 bg-gray-main flex-1"
      >
        <div className="px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  ">
          <div className="mt-4 ">
            <div className="">
              <div className="flex flex-col gap-y-6 lg:w-4/12 mx-auto">
                <section className="mb-8  lg:max-w-6xl mx-auto  w-full bg-white">
                  <form action="" className="">
                    <div className="rounded  shadow-sm w-full ">
                      <div className="px-6 pt-5 pb-5 border-b border-gray-100 flex justify-between">
                        <h1 className="capitalize text-lg font-medium tracking-wider text-gray-main ">
                          Login
                        </h1>
                      </div>

                      <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                        <label htmlFor="type" className="capitalize">
                          username
                        </label>
                        <input
                          ref={userNameContainer}
                          type="text"
                          name="username"
                          id="username"
                          value={username}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 w-full"
                        />
                      </div>

                      <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                        <label htmlFor="type" className="capitalize">
                          password
                        </label>
                        <input
                          ref={passwordContainer}
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 w-full"
                        />
                      </div>

                      <div className="px-6 pb-4">
                        <button
                          type="submit"
                          onClick={handleFormSubmit}
                          className="py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded"
                        >
                          login
                        </button>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
