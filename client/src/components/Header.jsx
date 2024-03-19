import React from "react";
import cmeLogo from "../assets/cmebot_logo.png";
import { Link } from "react-router-dom";

const Subtitle = ({ otherStyles, data }) => {
  return (
    <p
      className={`text-xl text-dkBlue font-[Poppins] font-semibold ${otherStyles}`}
    >
      {data}
    </p>
  );
};

const Header = ({ userData, onLogout, deactivate }) => {
  return (
    <div className="bg-ltBlue flex justify-between items-center p-6 rounded-md mb-5 drop-shadow-xl w-full">
      <Link to={"/"}>
        <img className="w-16" src={cmeLogo} alt="CMEBOT Logo" />
      </Link>
      <div>
        <h1 className="text-4xl font-bold text-dkBlue font-[Poppins]">
          CME BOT
        </h1>
        <Subtitle data={"Powered by ChatGPT 4"} />
      </div>

      {!userData.token ? (
        <Link to={`/auth`}>
          <button
            className={`${
              deactivate && "hidden"
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          >
            Login
          </button>
        </Link>
      ) : (
        <button
          className={`${
            deactivate && "hidden"
          } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => onLogout({})}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
