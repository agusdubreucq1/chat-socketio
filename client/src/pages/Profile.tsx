import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    (
      <div className="flex">
        <div className="flex w-1/2 justify-center items-center p-4">
          <img className="bg-gray-200 flex rounded-full w-64 h-64" src={user?.picture} alt={user?.name} />
        </div>
        <div className="flex flex-col items-center w-1/2 p-4">
          <h2 className="text-2xl text-center">{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;