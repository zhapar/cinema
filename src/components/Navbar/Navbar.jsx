import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Navbar.scss";

function Navbar() {
  const [name, setName] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    if (name.length) {
      history.push(`/search-results/${name}`);
    }
  };

  return (
    <nav className='navbar'>
      <div className='container-wrap'>
        <Link to='/' className='logo'>
          Netfilm
        </Link>
        <form className='search' onSubmit={handleSubmit}>
          <input
            type='text'
            className='searchInput'
            value={name}
            onInput={(e) => setName(e.target.value)}
            placeholder='Search...'
          />
          <button type='submit' className='searchButton'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
