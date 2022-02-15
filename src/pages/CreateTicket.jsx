import React, { useState } from "react";
import { useGlobalContext } from "../context";

const CreateTicket = () => {
  const {
    closeSubmenuItems,
    getCreateTicketFormData,
  } = useGlobalContext();
  

  
  const visibilityList = ["online event", "to be announced"];
  const salesChannelList = ["everywhere", "online only", "at the door only"];
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [eventStarts, setEventStarts] = useState("");
  const [startTime, setStartTime] = useState("");
  const [eventEnds, setEventEnds] = useState("");
  const [endTime, setEndTime] = useState("");
  const [visibility, setVisibility] = useState(visibilityList[0]);
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const [maximumQuantity, setMaximumQuantity] = useState("");
  const [salesChannel, setSalesChannel] = useState(salesChannelList[0]);
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(true);

  let formValue = {
    type,
    name,
    quantity,
    price,
    eventStarts,
    startTime,
    eventEnds,
    endTime,
    visibility,
    minimumQuantity,
    maximumQuantity,
    salesChannel,
    description,
    checked,
  };
// console.log(formValue);
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // console.log(name, value);
    if (name === "type") {
        setType(value);
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "quantity") {
      setQuantity(value);
    }
    if (name === "price") {
      setPrice(value);
    }
    if (name === "event starts") {
      setEventStarts(value);
    }
    if (name === "start time") {
      setStartTime(value);
    }
    if (name === "event ends") {
      setEventEnds(value);
    }
    if (name === "end time") {
      setEndTime(value);
    }
    if (name === "visibility") {
      setVisibility(value);
    }
    if (name === "minimum quantity") {
      setMinimumQuantity(value);
    }
    if (name === "maximum quantity") {
      setMaximumQuantity(value);
    }
    if (name === "sales channel") {
      setSalesChannel(value);
    }
    if (name === "description") { 
      setDescription(value);
    }
    if (name === "check") {
      setChecked(value);
    }
  };
 

  const handleFormSubmit = (e) => {
    e.preventDefault()
    getCreateTicketFormData(formValue);
    console.log(formValue);
    console.log("create ticket form submitted");
  };

  return (
        <div
          onMouseOver={() => closeSubmenuItems()}
          className="ml-16 bg-gray-main flex-1"
        >
          <div className="px-4 md:px-14 md:pt-6 lg:pt-2 lg:px-6  ">
            <div className="mt-4 ">
              <section className="mb-8  lg:max-w-2xl mx-auto">
                {/* single item */}
                <form action="" className="">
                  <div className="rounded bg-white shadow-sm  ">
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100">
                      <h1 className="capitalize text-lg font-medium tracking-wider text-gray-main ">
                        Create Ticket
                      </h1>
                    </div>
                    <div className="pt-5  px-6 mt-2 text-gray-light-2 mb-">
                      <div className="flex gap-x-5 capitalize items-center mb-4">
                        <div className="flex items-center gap-x-1">
                          <input
                            onChange={handleChange}
                            type="radio"
                            className="bg-purple-light-2 text-purple-light h-5 w-5"
                            name="type"
                            value="paid"
                           
                          />
                          <label htmlFor="type" className="capitalize">
                            paid
                          </label>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <input
                            onChange={handleChange}
                            type="radio"
                            className="bg-purple-light-2 text-purple-light h-5 w-5"
                            name="type"
                            value="free"
                          />
                          <label htmlFor="type" className="capitalize">
                            free
                          </label>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <input
                            onChange={handleChange}
                            type="radio"
                            className="bg-purple-light-2 text-purple-light h-5 w-5"
                            name="type"
                            value="donation"
                          />
                          <label htmlFor="type" className="capitalize">
                            donation
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-2 mb-4">
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="type" className="capitalize">
                            quantity
                          </label>
                          <input
                            type="password"
                            name="quantity"
                            id="quantity"
                            value={quantity}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2 md:w-full">
                          <label htmlFor="type" className="capitalize">
                            price
                          </label>
                          <input
                            type="password"
                            name="price"
                            id="price"
                            value={price}
                            onChange={handleChange}
                            className="p-2 rounded border border-gray-100 w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-y-4 gap-x-2 mb-4  px-6 mt-2 text-gray-light-2 ">
                      <div className="flex flex-col gap-y-2 flex-1">
                        <label htmlFor="type" className="capitalize">
                          event starts
                        </label>
                        <input
                          type="password"
                          name="event starts"
                          id="event starts"
                          value={eventStarts}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <label htmlFor="type" className="capitalize">
                          start time
                        </label>
                        <input
                          type="password"
                          name="start time"
                          id="start time"
                          value={startTime}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 focus::border-red-500 w-full block"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-y-4 gap-x-2  px-6 mt-2 text-gray-light-2 mb-4">
                      <div className="flex flex-col gap-y-2 flex-1">
                        <label htmlFor="type" className="capitalize">
                          event ends
                        </label>
                        <input
                          type="password"
                          name="event ends"
                          id="event ends"
                          value={eventEnds}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <label htmlFor="type" className="capitalize">
                          end time
                        </label>
                        <input
                          type="password"
                          name="end time"
                          id="end time"
                          value={endTime}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 focus::border-red-500 w-full block"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2 mb-4">
                      <label htmlFor="type" className="capitalize">
                        visibility
                      </label>
                      <select
                        value={visibility}
                        onChange={handleChange}
                        name="visibility"
                        id="visibility"
                        className="p-2 rounded border border-gray-100 w-full text-gray-main capitalize"
                      >
                        {visibilityList.map((item) => (
                          <option key={item} value={item} className="">
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className=" px-6 mt-2 flex flex-col md:flex-row  gap-y-4 gap-x-2 mb-4 text-gray-light-2">
                      <div className="flex flex-col gap-y-2 flex-1">
                        <label htmlFor="type" className="capitalize">
                          minimum quantity
                        </label>
                        <input
                          type="text"
                          name="minimum quantity"
                          id="minimum quantity"
                          value={minimumQuantity}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 w-full"
                        />
                      </div>

                      <div className="flex flex-col gap-y-2 flex-1">
                        <label htmlFor="type" className="capitalize">
                          maximum quantity
                        </label>
                        <input
                          type="password"
                          name="maximum quantity"
                          id="maximum quantity"
                          value={maximumQuantity}
                          onChange={handleChange}
                          className="p-2 rounded border border-gray-100 w-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2 mb-4">
                      <label htmlFor="type" className="capitalize">
                        sales channel
                      </label>
                      <select
                        onChange={handleChange}
                        name="sales channel"
                        id="sales channel"
                        className="p-2 rounded border border-gray-100 w-full text-gray-main capitalize"
                      >
                        {salesChannelList.map((item) => (
                          <option key={item} value={item} className="">
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-y-2 flex-1 md:w-full px-6 text-gray-light-2">
                      <label htmlFor="type" className="capitalize">
                        description
                      </label>
                      <textarea
                        type="textarea"
                        name="description"
                        id="description"
                        value={description}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-100 w-full"
                      />
                    </div>

                    <div className="px-6 pb-4">
                      <div className="flex gap-x-2 items-center mb-2 ">
                        <input
                          className="p-4 text-3xl bg-purple-light-2 text-white "
                          type="checkbox"
                          name="check"
                          id="check"
                          checked={checked}
                          onChange={handleChange}
                        />
                        <label htmlFor="check">Accept Terms & Condition</label>
                      </div>
                      <button
                        type="submit"
                        onClick={handleFormSubmit}
                        className="py-2 px-3 text-sm font-semibold text-white bg-purple-light capitalize hover:bg-purple-light-2 rounded"
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      
  );
};

export default CreateTicket;
