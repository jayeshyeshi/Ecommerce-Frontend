// ProfilePage.jsx
import React, { useState,useEffect } from "react";
import API from "../services/Api";
import "./Profile.css";
import profileImg from "../uploads/Profile.jpg";


const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        //console.log("UserId:", userId); // debug

        const response = await API.get(`/user/getUserById/${userId}`);

        //console.log("API Response:", response.data);

        setUser(response.data);

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const formatDate = (dateString) => {
  return dateString ? dateString.split("T")[0] : "";
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    // TODO: Add API call to save profile updates
    alert("Profile updated successfully!");
  };

  return (
  <div className="container">
   
    <div className="left-section">
      <img src={profileImg} alt="Profile" className="profile-img" />

      <div className="profile details">
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.contactNo}</p>
      </div>

      <div>
        <ul  className="menu">
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Orders</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </div>

    </div>

    <div className="right-section">
      <h2>Profile Details</h2>

            <div className="profile-details">
              <label>First Name : {user.firstName}</label>
              <label>Middle Name : {user.middleName}</label>
              <label>Last Name : {user.lastName}</label>
              <label>Address : {user.address}</label>
              <label>Email : {user.email}</label>
              <label>Contact : {user.contactNo}</label>
              <label>Date of Birth : {user.dateOfBirth}</label>
              <label>Pincode : {user.pincode}</label>
              <label>Village : </label>
              <label>District : </label>
              <label>State : </label>
              <label>Country : </label>
          </div>


    <footer className="bg-white p-4 text-center text-gray-500">
      © 2026 MyApp. All rights reserved.
    </footer>
  </div>
  </div>
);
};

export default ProfilePage;