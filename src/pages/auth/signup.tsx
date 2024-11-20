import { useState } from 'react';
import { auth } from '../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Image from 'next/image';

const db = getFirestore();

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // New state for error message
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        email,
      });

      setErrorMessage(''); // Clear any previous error
      alert('Account Created!');
      router.push('/user/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set the error message
      } else {
        setErrorMessage('An unexpected error occurred'); // Default message for unknown errors
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Side - Sign-up Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">Sign Up</h1>
          <p className="text-lg text-gray-600">
            Create an account to get started with our platform.
          </p>
          <form className="space-y-6">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition-all"
            >
              Sign Up
            </button>
          </form>

          {/* Display Error Message */}
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Right Side - Image and Welcome Message */}
        <div className="w-1/2 bg-blue-100 flex flex-col justify-center items-center p-8 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700">Welcome to Our Platform!</h3>
          <Image
            src="/icons/celebrate.png"
            alt="Welcome"
            width={150}
            height={150}
          />
          <p className="text-center text-lg text-gray-600">
            Create your account to get started with our services and enjoy exclusive features!
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default SignUpPage;
