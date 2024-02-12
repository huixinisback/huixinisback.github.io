import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftSide from "../LeftSidebar/LeftSide";
import Navbar from "../Navbar/Navbar";
import RightSide from "../RightSidebar/RightSide";
import Main from "../Main/Main";
import profilePic from "../../assets/images/profilePic.jpg";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";

const FriendProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const url = `http://localhost:3000/api/user/${id}`; // Ensure this URL is correct
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Profile not found');
        }
        const profileData = await response.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    getUserProfile();
  }, [id]);

  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar />
      </div>
      <div className="flex bg-gray-100">
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSide />
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl">
          <div className="w-[80%] mx-auto">
            <div>
              <div className="relative py-4">
                <img className="h-96 w-full rounded-md" src={profilePic} alt="profilePic" />
                <div className="absolute bottom-10 left-6">
                  <Avatar size="xl" variant="circular" src={profile?.image || avatar} alt="avatar" />
                  <p className="py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                    {profile?.email}
                  </p>
                  <p className="py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                    {profile?.name}
                  </p>
                </div>
                {/* Additional profile details here */}
              </div>
            </div>
            <Main />
          </div>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
