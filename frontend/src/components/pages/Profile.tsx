import React from "react";
import type { Iuser as IUser } from "../../types/interface";

interface ProfileProps {
  user: IUser | null;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200">
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{user.name}</span>
        <span className="text-sm text-gray-500">{user.email}</span>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
};
