// LandingNav.js
import Image from "next/image";

const LandingFooter = () => {
  return (
    <nav className="flex justify-between items-center py-20 px-8 bg-white shadow-md">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <div className="flex space-x-4 text-sm">
          <h1>Keep your tasks and ideas Noted.</h1>
      </div>
    </nav>
  );
};

export default LandingFooter;
