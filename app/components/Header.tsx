"use client";

import { useProgress } from "@/store/progress";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <>
      <ProgressBar />
      <header className="fixed left-0 top-0 w-full flex justify-start items-center p-4 sm:p-8">
        <div className="animate-fadeup-slidein">
          <Logo />
        </div>
      </header>
    </>
  );
}

export function ProgressBar() {
  const progress = useProgress((state) => state.progress);

  return (
    <div className="w-full h-1 bg-blue-500/40 fixed top-0 left-0 z-[9990]">
      <div
        className="h-full bg-blue-500 rounded-r-full transition-[width] duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
