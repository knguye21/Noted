import { useState } from 'react';
import { auth } from '../../lib/firebase';  // Adjust path if necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/user/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set the error message state
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
          <p className="text-lg text-gray-600">
            Please enter your credentials to access your account.
          </p>
          <form className="space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* Display error message */}
          {errorMessage && (
            <div className="mt-4 text-red-600 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            <p>
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>

        {/* Right Side - Image and Welcome Message */}
        <div className="w-1/2 bg-blue-100 flex flex-col justify-center items-center p-8 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700">Welcome Back!</h3>
          <Image
            src="/icons/wave.png"
            alt="Welcome back"
            width={150}
            height={150}
          />
          <p className="text-center text-lg text-gray-600">
            We are happy to have you back! Please login to continue your journey.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
