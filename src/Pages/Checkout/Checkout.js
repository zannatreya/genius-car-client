import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("order placed successfully");
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <h2 className="text-4xl">You are about to order: {title}</h2>
      <h4 className="text-3xl">Price: {price}</h4>{" "}
      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="last name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="phone"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="input input-bordered w-full "
            readOnly
            defaultValue={user?.email}
          />
        </div>
        <textarea
          className="textarea textarea-bordered h-24 w-full my-4"
          placeholder="message"
          name="message"
          required
        ></textarea>

        <input
          className="btn btn-xs mb-2 sm:btn-sm md:btn-md lg:btn-lg"
          type="submit"
          value="Place Your Order"
        />
      </form>
    </div>
  );
};

export default Checkout;
