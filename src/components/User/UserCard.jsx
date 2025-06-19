import React from 'react';

export const UserCard = ({ userData }) => {
  return (
        <div>
            <section>
                <div>
                <img src={`http://localhost:2636/uploads/img/users/${userData.profilePicture}`}/>
                </div>
                <div>
                <h1>{userData.name} {userData.surname}</h1>
                </div>
            </section>

            <section>
                <h2>Información de Contacto</h2>
                <div>
                <div><strong>Email:</strong> {userData.email}</div>
                <div><strong>Teléfono:</strong> {userData.phone}</div>
                <div><strong>Dirección:</strong> {userData.address}</div>
                </div>
            </section>

            <section>
                <h2>Detalles de la Cuenta</h2>
                <div>
                <div><strong>Rol:</strong> {userData.role}</div>
                <div><strong>Nombre de usuario:</strong> {userData.username}</div>
                </div>
            </section>
        </div>
  )
}
