import React, { useState } from "react";
import { useUser } from "../../shared/hooks/user/useUser";
import { validateEmail,} from '../../shared/validators/validators'
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
  const [emailError, setEmailError]= useState('')
  
  const {addEmployee, emailExist,emailMessage,usernameExist,usernameMessage}=useUser()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
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

  const handleOnBlurEmail =(e)=>{
    emailExist(e.target.value)
    if(validateEmail(e.target.value) === false){
      setEmailError('Ingrese una direccion de corre valida')
    }else{
      setEmailError('')
    }
  }

  const handleUsernameBlur =(e)=>{
        usernameExist(e.target.value)
    }


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

      <label>
        Surname:
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={30}
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
          onBlur={handleOnBlurEmail}
        />
      </label>
      <span>{emailError}</span>
      <span>{emailMessage}</span>
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
          onBlur={handleUsernameBlur}
        />
      </label>
        <span>{usernameMessage}</span>
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
          placeholder="+502 12345678"
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
        />
      </label>

      <label>
        Profile Picture:
        <input
          type="file"
          name="profilePicture"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
          required
        />
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
};
