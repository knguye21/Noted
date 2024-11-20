import Image from "next/image";
import { useRouter } from "next/router";

const LandingNav = () => {
    const router = useRouter();

    const handleLogin = () => router.push("/auth/login");
    const handleSignUp = () => router.push("/auth/signup");

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <div className="space-x-4">
        <button
          onClick={handleLogin}
          className="px-4 py-2 rounded hover:bg-base300"
        >
          Login
        </button>
        <button
          onClick={handleSignUp}
          className="px-4 py-2 text-white bg-base800 rounded hover:bg-base600"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default LandingNav;
