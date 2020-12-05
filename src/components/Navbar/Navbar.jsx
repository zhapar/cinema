import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='container-wrap'>
        <Link to='/' className='logo'>
          Netfilm
        </Link>
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
