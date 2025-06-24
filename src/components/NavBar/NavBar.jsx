import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaTh } from 'react-icons/fa';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const isLogged = true;
  const isAdmin = JSON.parse(localStorage.getItem("user")).role === "ADMIN"

  const handleLogOut=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  return (
    <nav className="w-full bg-yellow-400 shadow-md fixed top-0 left-0 z-50 ">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Link to="/HomePage" className="flex items-center">
            <img
              src="https://placehold.co/40x40/062147/ffffff?text=M"
              alt="Mobi Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              <h1 className="font-extrabold text-sm text-blue-900 leading-tight">
                MOBI <br /> <span className="text-xs">EXPRESS</span>
              </h1>
            </div>
          </Link>
          <Link to="/dashboard/categories">
            <FaTh className="text-black ml-2 text-lg" />
          </Link>
        </div>

        {/* Buscador */}
        <div className="flex-grow mx-6">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full px-4 py-2 bg-gray-200 text-sm focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/dashboard/profile/updateProfile">
            <FaUserCircle className="text-black text-xl cursor-pointer" />
          </Link>
          <Link to="/orders/completeOrder">
            <FaShoppingCart className="text-black text-xl cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Menú inferior */}
      <div className="border-t border-yellow-300 text-sm text-black px-6 py-1 flex justify-between items-center">
        <div className="flex gap-6">
          {isAdmin?(
            <div className="flex gap-6">
              <Link to="/users/getUsers" className="hover:underline">
            Empleados
          </Link>
          <Link to="/orders/Allorders" className="hover:underline">
            pedidos
          </Link>
          <Link to="/products/list" className="hover:underline">
            Productos
          </Link></div>
            
          ):(
            <div className="flex gap-6">
            <Link to="/products/list" className="hover:underline">
            Productos
          </Link>
          </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          {isLogged && (
            <Link to="/">
              <button className="hover:underline" onClick={handleLogOut}>Logout</button>
              <span className="text-xs">▼</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
 export default Navbar
