import React, { useState } from "react";
import { useUser } from "../../shared/hooks/user/useUser";

export const DeleteProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [disable, setDisable] = useState(true);
  const { deleteProfile } = useUser();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProfile();
    setShowModal(false);
    setConfirmationText("");
  };

  const handleConfirmationText = () => {
    if (confirmationText === "ACEPTAR") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  return (
    <div>
      {/* Botón de eliminar perfil - rojo */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Eliminar perfil
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              ¿Estás seguro de querer eliminar tu perfil?
            </h3>
            <p className="mb-4 text-gray-700">
              Escribe <strong className="text-red-600">"ACEPTAR"</strong> para confirmar.
            </p>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Escribe ACEPTAR"
              onBlur={handleConfirmationText}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleDelete}
                disabled={disable}
                className={`px-4 py-2 rounded text-white ${
                  disable
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setConfirmationText("");
                  setDisable(true);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};