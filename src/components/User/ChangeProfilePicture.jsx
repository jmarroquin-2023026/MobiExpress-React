import React, { useState } from "react";
import { useUser } from "../../shared/hooks/user/useUser";

export const ChangeProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { changeProfilePicture } = useUser();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("profilePicture", selectedFile);
    changeProfilePicture(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="text-lg font-semibold mb-4">Change your profile picture</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
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
          Change
        </label>

        <button
          type="submit"
          className="hidden"
        >
          Cambiar Foto
        </button>
      </form>
    </div>
  );
};