import React from 'react';

export const UserCard = ({ userData }) => {
  return (
    <div className="flex items-start bg-gray-100 rounded-lg p-4 shadow-sm">
      {/* Imagen de perfil */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={`http://localhost:2636/uploads/img/users/${userData.profilePicture}`}
          alt="Foto de perfil"
          className="w-16 h-16 rounded-full border-2 border-black object-cover"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="bg-white rounded-md p-4 w-full">
        <section className="mb-4">
          <h1 className="text-lg font-semibold text-gray-800">
            {userData.name} {userData.surname}
          </h1>
        </section>

        <section className="mb-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Información de Contacto</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Teléfono:</strong> {userData.phone}</div>
            <div><strong>Dirección:</strong> {userData.address}</div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-700 mb-2">Detalles de la Cuenta</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Rol:</strong> {userData.role}</div>
            <div><strong>Nombre de usuario:</strong> {userData.username}</div>
          </div>
        </section>
      </div>
    </div>
  );
};