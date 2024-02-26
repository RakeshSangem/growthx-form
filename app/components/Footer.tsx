export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full flex justify-end items-center p-4 sm:p-8">
      <div className="animate-fadeup-slidein">
        <a
          href="https://growthx.club/"
          target="__blank"
          className="bg-[#0277FF] hover:bg-[#258BFF]/90 py-2 px-3 opacity-80 hover:opacity-100 duration-300 transition-all rounded-md text-white text-sm font-bold drop-shadow-sm"
        >
          Powered by <span className="font-extrabold">GrowthX</span>
        </a>
      </div>
    </footer>
  );
}
