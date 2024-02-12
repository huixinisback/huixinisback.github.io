import React, { useContext } from "react";
import { Avatar, Tooltip } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import { AuthContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import about from "../../assets/images/about.jpg";

const UserLinks = () => {
  const { signOutUser, user, userData } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-center items-center cursor-pointer">
      {/* Account navigation button */}
      <button
        className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500"
        onClick={() => handleNavigate('/account')}
      >
        {/* SVG for account */}
        <img src={about} alt="about" className="w-6 h-6" />
      </button>
      {/* User avatar and sign out */}
      <div className="mx-4 flex items-center" onClick={signOutUser}>
        <Tooltip content="Sign Out" placement="bottom">
          <Avatar src={user?.photoURL || avatar} size="sm" alt="avatar"></Avatar>
        </Tooltip>
        <p className="ml-4 font-roboto text-sm text-black font-medium no-underline">
          {user?.displayName || (userData?.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : 'User')}
        </p>
      </div>
    </div>
  );
};

export default UserLinks;
