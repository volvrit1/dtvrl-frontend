import { useAuth } from "@/context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

const Profile = () => {
  const { user, logout } = useAuth();
  return (
    <div className="group relative">
      <div className="flex gap-2 items-center">
        <p className="text-white font-semibold">{user?.email}</p>
        <p className="uppercase min-h-8 cursor-pointer min-w-8 h-8 w-8 flex justify-center items-center text-lg font-bold aspect-square rounded-full bg-white text-primary">
          {user?.email?.charAt(0)}
        </p>
        <p onClick={logout} className="flex cursor-pointer items-center gap-2">
          <IoLogOutOutline title="Sign Out" className="text-4xl text-white" />
        </p>
      </div>
    </div>
  );
};

export default Profile;
