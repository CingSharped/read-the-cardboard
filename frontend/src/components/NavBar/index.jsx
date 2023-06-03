import React from 'react'
import { Outlet } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <h2>NavBar</h2>
      <Outlet />
    </>
  );
}

export default NavBar