import "./globals.css";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import { Lato } from "next/font/google";
import Sidebar from "@/components/common/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "DTVRL - Admin Dashboard",
  description:
    "Khetihar empowers modern farming with smart solutions. From seed to harvest, manage your agricultural operations efficiently with our innovative and sustainable platform.",
};

const lato = Lato({
  subsets: ["latin"], // Specify the subset
  display: "swap", // Use swap for better performance
  variable: "--font-lato", // CSS variable for the font
  style: ["normal", "italic"], // Include both normal and italic styles
  weight: ["100", "300", "400", "700", "900"], // Only supported weights
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} relative antialiased`}>
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 w-[83%] border-l border-primary">
              <Navbar />
              <main>{children}</main>
              <div id="modal-root"></div>
              <ToastContainer
                rtl={false}
                autoClose={2000}
                newestOnTop={true}
                position="top-right"
                hideProgressBar={false}
              />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
