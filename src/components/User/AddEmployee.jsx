import React, { useState } from "react";
import { useUser } from "../../shared/hooks/user/useUser";

export const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    profilePicture: null
  });

  const { addEmployee } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profilePicture: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    addEmployee(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-center text-xl font-bold mb-4">Add employee</h2>

      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="text-sm text-gray-600">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full bg-gray-100 rounded px-3 py-2 outline-none"
          />
        </label>

        <label className="text-sm text-gray-600">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={30}
            className="mt-1 w-full bg-gray-100 rounded px-3 py-2 outline-none"
          />
        </label>

        <label className="text-sm text-gray-600">
          Surname:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={30}
            className="mt-1 w-full bg-gray-100 rounded px-3 py-2 outline-none"
          />
        </label>

        <label className="text-sm text-gray-600">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={15}
            className="mt-1 w-full bg-gray-100 rounded px-3 py-2 outline-none"
          />
        </label>

        <label className="text-sm text-gray-600">
          Phone Number:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={13}
            className="mt-1 w-full bg-gray-100 rounded px-3 py-2 outline-none"
          />
        </label>

        <label className="text-sm text-gray-600">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={5}
            className="mt-1 w-full bg-gray-100 rounded px-3 py-2 outline-none"
          />
        </label>
      </div>

      <label className="block mt-4 text-sm text-gray-600">
        Address:
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          minLength={20}
          maxLength={200}
          className="mt-1 w-full bg-gray-100 rounded px-3 py-2 outline-none resize-none"
        />
      </label>

      <div className="mt-4">
        <label className="text-sm text-gray-600 block mb-2">Profile Picture:</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-yellow-400 hover:file:bg-yellow-500"
        />
      </div>
    </form>
  );
};
