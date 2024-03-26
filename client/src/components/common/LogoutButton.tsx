import React from "react";

const LogoutButton: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({...props}) => {
  return (
    <button {...props} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" >
      Log Out
    </button>
  );
};

export default LogoutButton;