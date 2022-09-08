import React from "react";
import { BiCopyright } from "react-icons/bi";
const Footer = () => {
  return (
    <div className="footer">
      Copyright <BiCopyright /> {new Date().getFullYear()} All Rights Reserved
    </div>
  );
};

export default Footer;
