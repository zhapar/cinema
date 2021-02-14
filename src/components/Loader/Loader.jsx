import React, { useEffect } from "react";

import "./Loader.scss";

function Loader() {
  useEffect(() => {
    setTimeout(function () {
      document.querySelector(".wrappLoader").classList.add("loaded");
    }, 500);
  });
  return (
    <div className='wrappLoader'>
      <div id='loader-wrapper'>
        <div id='loader'></div>
        <div className='loader-section section-left'></div>
        <div className='loader-section section-right'></div>
      </div>
    </div>
  );
}

export default Loader;
