"use client";

import Image from "next/image";
import { Post } from "@/hooks/apiUtils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { IoEye, IoEyeOff, IoLogInOutline } from "react-icons/io5";

const Login: React.FC = () => {
  const router = useRouter();
  const { token, login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response: any = await Post("/api/admin/login", {
      email,
      password,
    });
    if (response?.success) {
      const token = response?.data?.token;
      const adminDetails = response?.data?.admin;
      login(token, adminDetails);
    }
  };

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  return (
    <>
      {!token && (
        <div className="bg-[url('/assets/bg/bg.jpg')] bg-cover min-h-screen flex justify-center items-center">
          <div className="w-full bg-white backdrop-blur-2xl bg-opacity-30 p-8 mx-4 rounded-2xl md:max-w-lg md:mx-auto">
            <Image
              src="/assets/logo/logo.png"
              alt="Icon"
              width={200}
              height={100}
              className="w-24 mb-5 mx-auto object-contain"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
              Login to your account
            </h2>
            <p className="text-center text-white/50 lg:text-gray-700 mb-8">
              Enter your email and password below to access your account.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  autoComplete="off"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 text-gray-800 placeholder-gray-400 bg-white bg-opacity-50 rounded-xl border-2 border-cyan-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    autoComplete="off"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pr-10 text-gray-800 placeholder-gray-400 bg-white bg-opacity-50 rounded-xl border-2 border-cyan-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 cursor-pointer text-cyan-500 hover:text-primary"
                  >
                    {showPassword ? (
                      <IoEye size={22} />
                    ) : (
                      <IoEyeOff size={22} />
                    )}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 flex text-lg justify-center items-center gap-2 text-white bg-primary hover:bg-primary-dark rounded-lg transition duration-200"
              >
                <IoLogInOutline size={24} />
                Sign In to Your Account
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
