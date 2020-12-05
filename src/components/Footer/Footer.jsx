import React from "react";
import logo from "../../logo.svg";

import "./Footer.scss";

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-detail'>© 2020 Zhapar Manas uulu</div>
      <img src={logo} alt='The Movie DB' className='logoDB' />
    </div>
  );
}

export default Footer;
