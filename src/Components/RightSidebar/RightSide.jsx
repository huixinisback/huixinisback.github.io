import React from "react";
import { AuthContext } from "../AppContext/AppContext";
import { useContext } from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import logol from "../../assets/images/logol.png";
import { db } from "../firebase/firebase";

const RightSide = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      {/* Logo at the top */}
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-48 rounded-md" src={logol} alt="logo"></img>
        {/* Line separating the logo and the iframe */}
        <hr className="w-full border-t border-gray-300 my-4" />
      </div>

      {/* iframe below the logo */}
      <iframe
        src="https://www.glamour.com/story/2024-fashion-trends"
        title="Fashion Trends"
        style={{ width: "100%", height: "700px", border: "none" }}
      ></iframe>

      {/* Friends list section removed */}
    </div>
  );
};

export default RightSide;
