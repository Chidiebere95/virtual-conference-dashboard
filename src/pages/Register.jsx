import React, { useState, useRef } from "react";
import { useGlobalContext } from "../context";
import Layout from "../components/Layout";

const Register = () => {
  const { closeSubmenuItems } = useGlobalContext();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Refs
  const fullNameContainer = useRef(null);
  const userNameContainer = useRef(null);
  const emailContainer = useRef(null);
  const passwordContainer = useRef(null);
  const confirmPasswordContainer = useRef(null);
  const passwordsMatchInfoContainer = useRef(null);

  let formValue = {
    fullName,
    username,
    email,
    password,
    confirmPassword,
  };
  //   console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    name === "full name" && setFullName(value);
    name === "username" && setUsername(value);
    name === "email" && setEmail(value);
    name === "password" && setPassword(value);
    name === "confirm password" && setConfirmPassword(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      if (fullName === "") {
        fullNameContainer.current.style.borderColor = "red";
      } else {
        fullNameContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      }
      if (username === "") {
        userNameContainer.current.style.borderColor = "red";
      } else {
        userNameContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      }
      if (email === "") {
        emailContainer.current.style.borderColor = "red";
      } else {
        emailContainer.current.style.borderColor = " rgba(243, 244, 246,0.5)";
      }
      if (password === "") {
        passwordContainer.current.style.borderColor = "red";
      } else {
        passwordContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
      }
      if (confirmPassword === "") {
        confirmPasswordContainer.current.style.borderColor = "red";
      } else {
        confirmPasswordContainer.current.style.borderColor =
          "rgba(243, 244, 246,0.5)";
      }
      if (password !== confirmPassword) {
        passwordContainer.current.style.borderColor = "red";
        confirmPasswordContainer.current.style.borderColor = "red";
        passwordsMatchInfoContainer.current.textContent =
          "passwords do not match";
        passwordsMatchInfoContainer.current.style.color = "red";
      }
    } else {
      setBackToDefault()
      // console.log("everything complete");
      // console.log(formValue);
    }
  };

  const setBackToDefault=()=>{
    fullNameContainer.current.value = "";
    userNameContainer.current.value = "";
    emailContainer.current.value = "";
    passwordContainer.current.value = "";
    confirmPasswordContainer.current.value = "";
    fullNameContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
    userNameContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
    emailContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
    passwordContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
    confirmPasswordContainer.current.style.borderColor = "rgba(243, 244, 246,0.5)";
  }
  return (
    <Layout>
      <div
        onMouseOver={() => closeSubmenuItems()}
        className="ml-16 bg-gray-main flex-1"
      >
        <div className="px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  ">
          <div className="mt-4 ">
            <div className=" ">
              <div className="flex flex-col gap-y-6 lg:w-4/12 mx-auto ">
                <section className="mb-8  lg:max-w-6xl mx-auto  w-full bg-white">
             
                  <form action="" className="">
                    <div className="rounded  shadow-sm w-full ">
                      <div className="px-6 pt-5 pb-5 border-b border-gray-100 flex justify-between">
                        <h1 className="capitalize text-lg font-medium tracking-wider text-gray-main ">
                          Register
                        </h1>
                      </div>
                      <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                        <label htmlFor="type" className="capitalize">
                          full name
                        </label>
                        <input
                          ref={fullNameContainer}
                          type="text"
                          name="full name"
                          id="full name"
                          value={fullName}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 w-full"
                        />
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
                          email
                        </label>
                        <input
                          ref={emailContainer}
                          type="email"
                          name="email"
                          id="email"
                          value={email}
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
                      <h1
                        ref={passwordsMatchInfoContainer}
                        className="px-6"
                      >{''}</h1>
                      <div className="flex flex-col gap-y-2 mb-4  px-6 pt-5 text-gray-light-2 ">
                        <label htmlFor="type" className="capitalize">
                          confirm password
                        </label>
                        <input
                          ref={confirmPasswordContainer}
                          type="password"
                          name="confirm password"
                          id="confirm password"
                          value={confirmPassword}
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
                          register
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

export default Register;
