import Link from "next/link";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = () => {
  return (
    <Link className="relative group" href={"/dashboard/notifications"}>
      <IoIosNotificationsOutline className="text-4xl group-hover:scale-110 text-black transition cursor-pointer" />
      <span className="bg-blue-500 flex justify-center items-center absolute -top-0.5 -right-0.5 text-[10px] text-white w-5 h-5 min-w-5 min-h-5 aspect-square rounded-full">
        2
      </span>
    </Link>
  );
};

export default Notification;
