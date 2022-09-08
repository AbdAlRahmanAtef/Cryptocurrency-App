import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/crypto.png";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineMoneyCollect, AiOutlineFund } from "react-icons/ai";
import { BsLightbulb } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
const Navbar = () => {
  const [activeMenu, setactiveMenu] = useState(false);
  const checkActiveMenue = () => {
    if (activeMenu) {
      return "pages on";
    } else {
      return "pages";
    }
  };
  window.onscroll = () => {
    setactiveMenu(false);
  };
  const [activeClass, setActiveClass] = useState({
    active: null,
    objects: [
      { id: 0, icon: <BiHomeAlt className="icon" />, title: "Home", path: "/" },
      {
        id: 1,
        icon: <AiOutlineFund className="icon" />,
        title: "Cryotocurrencies",
        path: "/cryptocurrencies",
      },
      {
        id: 2,
        icon: <BsLightbulb className="icon" />,
        title: "News",
        path: "/news",
      },
    ],
  });

  const setActive = (index) => {
    setActiveClass({ ...activeClass, active: activeClass.objects[index].id });
  };
  const setClass = (index) => {
    if (activeClass.active === index) {
      return "page active";
    } else {
      return "page";
    }
  };
  return (
    <div className="navbar">
      <div className="logo">
        <Link className="link" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <FaBars
        onClick={(e) => {
          setactiveMenu(!activeMenu);
        }}
        className={activeMenu ? "toggle appeared" : "toggle"}
      />
      <div className={checkActiveMenue()}>
        {activeClass.objects.map((obj, index) => {
          return (
            <Link
              key={index}
              className={setClass(index)}
              to={obj.path}
              onClick={() => {
                setActive(index);
              }}
            >
              <div>
                {obj.icon}
                <span>{obj.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
