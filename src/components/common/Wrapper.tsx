"use client";

import Link from "next/link";

const Wrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="ml-[17%] flex flex-col min-h-screen bg-gradient-to-b from-cyan-50 via-cyan-100 to-primary">
      <main className="flex-1 p-4 backdrop-blur-md">{children}</main>
      <footer className="text-sm text-white bg-[url('/assets/bg/bg.jpg')] bg-no-repeat bg-cover bg-top py-4 px-4 flex flex-wrap justify-center items-center gap-1 text-center">
        <span>© {new Date().getFullYear()} </span>
        <strong className="text-primary">DTVRL</strong>
        <span>. Designed with ❤️ by</span>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.volvrit.com"
          className="underline text-cyan-300 font-medium"
        >
          Volvrit
        </Link>
        <span>. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Wrapper;
