// src/components/ProfilePage.js

import { useState } from "react";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    profileImage: "url/to/profile-image.jpg",
  });

  const handleUsernameChange = (e) => {
    setUserInfo({ ...userInfo, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const handleProfileImageChange = () => {
    // Handle profile image change and upload to Cloudinary
  };

  return (
    <div className="container-fluid bg-dark vh-100 d-flex align-items-center justify-content-center">
      <h1 className="text-white">Profile Page</h1>
      <input
        type="text"
        value={userInfo.username}
        onChange={handleUsernameChange}
      />
      <input type="email" value={userInfo.email} onChange={handleEmailChange} />
      <input type="file" onChange={handleProfileImageChange} />
      <img src={userInfo.profileImage} alt="Profile" />
    </div>
  );
};

export default ProfilePage;
