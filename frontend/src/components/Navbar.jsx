import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Container, CustomBtn } from "./index";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
const Navbar = ({ isDarkMode, setIsDarkMode }) => {

  const toggleDarkMode = () => {
    if (!isDarkMode) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  };
  return (
    <Container>
      <div className="w-full flex flex-col justify-between items-center sm:flex-row  mt-4 ">
        <div className="uppercase font-bold text-[22px] sm:text-[28px] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          <Link to="/">Product Store 🛒</Link>
        </div>
        <div className="space-x-5">
          <Link to="/create">
            <CustomBtn className="bg-[ #292B34]  hover:bg-[#3A3B44] dark:bg-[#EDF2F7] dark:text-black dark:hover:bg-[#E4EAF2]">
              <CiSquarePlus size={20} />
            </CustomBtn>
          </Link>
          <CustomBtn
            className="bg-[ #292B34]  hover:bg-[#3A3B44] dark:bg-[#EDF2F7] dark:text-black dark:hover:bg-[#E4EAF2]"
            onClick={toggleDarkMode}>
            {isDarkMode ? <LuSun size={20} /> : <IoMoon size={20} />}
          </CustomBtn>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
