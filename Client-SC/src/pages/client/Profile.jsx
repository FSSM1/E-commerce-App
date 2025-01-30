import React from "react";
import { useAuth } from "../context/AuthContext"; // Example: Fetch user role from context

const Profile = () => {
  const { user } = useAuth(); // Assume you have a way to get the user's role

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user?.name}!</p>
      <p>Role: {user?.role}</p>
      {/* Add profile management options here */}
      {user?.role === "client" && (
        <div>
          <h2>Client Options</h2>
          <p>Manage your orders, address, etc.</p>
        </div>
      )}
      {user?.role === "seller" && (
        <div>
          <h2>Seller Options</h2>
          <p>Manage your products, sales, etc.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
