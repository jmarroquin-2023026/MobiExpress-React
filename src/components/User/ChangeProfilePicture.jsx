import React, { useState, useEffect } from "react";
import { useUser } from "../../shared/hooks/user/useUser";
import { useNavigate } from "react-router-dom";

export const ChangeProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { changeProfilePicture } = useUser();
  const navigate=useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setMessage(null);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Por favor selecciona una imagen.");
      return;
    }

    const data = new FormData();
    data.append("profilePicture", selectedFile);

    setLoading(true);
    const success = await changeProfilePicture(data);
    setLoading(false);
    navigate('/dashboard/profile/updateProfile')
    if (!success) {
      window.location.reload(); 
    } else {
      setMessage("Error al cambiar la foto. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="text-lg font-semibold mb-4">Change your profile picture</h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full border border-gray-400 overflow-hidden">
          <img
            src={
              previewUrl ||
              `http://localhost:2636/uploads/img/users/${user.profilePicture}`
            }
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

        <input
          type="file"
          name="profilePicture"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
          className="hidden"
          id="upload"
        />
        <label
          htmlFor="upload"
          className="bg-blue-400 text-white px-4 py-1.5 rounded hover:bg-blue-500 cursor-pointer"
        >
          Seleccionar imagen
        </label>

        {message && <p className="text-red-500 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-400 text-white px-4 py-1.5 rounded hover:bg-blue-500 cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          
        >
          {loading ? "Cambiando..." : "Cambiar Foto"} 
        </button>
      </form>
    </div>
  );
};
