import React from "react";
import { useNavigate } from "react-router-dom";
import uploadIcon from '../../assets/images/upload - Copy.png';
import clothesIcon from '../../assets/images/clothes - Copy.png';
import homeIcon from '../../assets/images/homeIcon - Copy.png';
import wardrobeIcon from '../../assets/images/wardrobe.png';

const NavLinks = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation, receiving the path as a parameter
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-center items-center cursor-pointer space-x-4">
      <div className="text-center">
        <button
          className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500"
          onClick={() => handleNavigate("/")} // Navigate to homepage/feed
        >
          {/* Image for Home */}
          <img src={homeIcon} alt="Home" className="w-6 h-6" />
        </button>
        <div>Home</div>
      </div>

      <div className="text-center">
        <button
          className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500"
          onClick={() => handleNavigate("/clothes")} // Navigate to clothes generation
        >
          {/* Image for Clothes Generation */}
          <img src={clothesIcon} alt="Clothes" className="w-6 h-6" />
        </button>
        <div>Generation</div>
      </div>

      <div className="text-center">
        <button
          className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500"
          onClick={() => handleNavigate("/upload")} // Navigate to Shop
        >
          {/* Image for Upload */}
          <img src={uploadIcon} alt="Upload" className="w-6 h-6" />
        </button>
        <div>Upload</div>
      </div>

      <div className="text-center">
        <button
          className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500"
          onClick={() => handleNavigate("/gallery")} // Navigate to Gallery
        >
          {/* Image for Gallery */}
          <img src={wardrobeIcon} alt="Gallery" className="w-6 h-6" />
        </button>
        <div>Gallery</div>
      </div>
    </div>
  );
};

export default NavLinks;
