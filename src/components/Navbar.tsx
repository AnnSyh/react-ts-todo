import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FunctionComponent = () => {
  return (
    <nav className='relative z-10 h-[50px] flex justify-between px-5 bg-gray-500 text-white items-center'>
      <NavLink to="/" className="font-bold">React + TS</NavLink>
      <ul className="flex">
        <li><NavLink to="/">Список дел</NavLink></li>
        <li><NavLink to="/about">Информация</NavLink></li>
      </ul>
    </nav>
  )
}