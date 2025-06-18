import React, { useState } from "react";
import { useUser } from "../../shared/hooks/user/useUser";

export const ChangeProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
    const {changeProfilePicture}=useUser()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    let data = new FormData()
    data.append('profilePicture',selectedFile)
    changeProfilePicture(data)
  }

  return (
    <div>
      <h2>Cambiar foto de perfil</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="profilePicture"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
        />

        <button>Cambiar Foto</button>
      </form>
    </div>
  );
};
