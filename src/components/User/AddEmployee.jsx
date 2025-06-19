import React, { useState } from "react";
import { useUser } from "../../shared/hooks/user/useUser";
import { validateEmail } from '../../shared/validators/validators';

export const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    profilePicture: null // Será un File
  });
  const {addEmployee}=useUser()
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
    addEmployee(data)
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={30}
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

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          minLength={5}
          maxLength={15}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={5}
        />
      </label>

      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          minLength={8}
          maxLength={13}
        />
      </label>

      <label>
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
        />
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
};
