import React from "react";

import "./Navbar.scss";

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='container-wrap'>
        <div className='logo'>Netfilm</div>
        <a href='#' className='link'>
          Movies
        </a>
        <form className='search'>
          <input type='text' className='searchInput' placeholder='Search...' />
          <button type='submit' className='searchButton'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
