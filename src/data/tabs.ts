import {
  FaHome,
  FaUsers,
  FaQuestion,
  FaPen,
  FaMapMarkerAlt,
  FaBell,
  FaComments,
  FaUserFriends,
  FaImages,
  FaDatabase,
} from "react-icons/fa";

export const tabs: any = [
  {
    id: 1,
    icon: FaHome,
    label: "Dashboard",
    href: "/dashboard",
    pageTitle: "Overview",
    permission: "Dashboard",
  },
  {
    id: 3,
    icon: FaUsers,
    label: "Manage Users",
    href: "/dashboard/users",
    pageTitle: "Users",
    permission: "Manage Users",
  },
  {
    id: 12,
    icon: FaQuestion,
    label: "Manage Reviews",
    href: "/dashboard/testimonials",
    pageTitle: "Testimonials",
    permission: "Testimonials",
  },
  {
    id: 4,
    icon: FaPen,
    label: "Posts",
    href: "/dashboard/posts",
    pageTitle: "Posts",
    permission: "Manage Posts",
  },
  {
    id: 5,
    icon: FaMapMarkerAlt,
    label: "Locations",
    href: "/dashboard/locations",
    pageTitle: "Locations",
    permission: "Manage Locations",
  },
  {
    id: 6,
    icon: FaBell,
    label: "Notifications",
    href: "/dashboard/notifications",
    pageTitle: "Notifications",
    permission: "View Notifications",
  },
  {
    id: 7,
    icon: FaComments,
    label: "Chats",
    href: "/dashboard/messages",
    pageTitle: "Chats",
    permission: "Manage Chats",
  },
  {
    id: 8,
    icon: FaUserFriends,
    label: "Group Chat",
    href: "/dashboard/group-messages",
    pageTitle: "Group Chat",
    permission: "Manage Group Chat",
  },
  {
    id: 9,
    icon: FaImages,
    label: "Gallery",
    href: "/dashboard/gallery",
    pageTitle: "Gallery",
    permission: "Manage Gallery",
  },
  {
    id: 10,
    icon: FaDatabase,
    label: "Buckets",
    href: "/dashboard/buckets",
    pageTitle: "Buckets",
    permission: "Manage Buckets",
  },
];
