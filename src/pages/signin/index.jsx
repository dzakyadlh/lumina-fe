import React, { useState } from 'react';
import CustomInputField from '../../components/custom_input_field';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { signIn } from '../../api/auth';

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn(formData);
      if (result) {
        navigate('/');
      }
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col items-center justify-center px-2 py-10">
        <img
          src="/images/poster5.jpg"
          alt="Background Poster"
          className="absolute h-screen z-[-10] filter brightness-50"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-2/3 md:w-1/2 xl:w-1/3 2xl:w-1/4 bg-black rounded-lg border border-yellow-400 flex flex-col justify-center px-5 md:px-10 py-10 gap-5"
        >
          <h1 className="text-3xl font-bold">Sign In</h1>
          <CustomInputField
            type="email"
            placeholder="Your Email Address"
            inputName="email"
            inputValue={formData.email}
            onChange={handleChange}
          />
          <CustomInputField
            type="password"
            placeholder="Your Password"
            inputName="password"
            inputValue={formData.password}
            onChange={handleChange}
          />
          <div className="flex justify-between mb-2">
            <div className="flex items-start ml-2">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link to="#" className="text-end text-sm hover:text-yellow-400">
              Forgot Password?
            </Link>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: '#fde047' }}
            className="px-10 py-3 bg-yellow-200 rounded-full text-black font-semibold"
          >
            Sign In
          </motion.button>
          <p className="text-center text-gray-500">OR</p>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: '#fde047' }}
            className="px-10 py-3 bg-transparent border-neutral-600 border rounded-full dark:text-white font-semibold"
            onClick={() => {}}
          >
            <div className="flex items-center justify-center gap-2">
              <img
                src="/images/google.png"
                alt="google icon"
                className="w-8 h-8"
              />
              Sign in with Google
            </div>
          </motion.button>
          <p className="text-center">
            New to Lumina?{' '}
            <span>
              <Link
                to="/signup"
                className="text-yellow-200 hover:text-yellow-400"
              >
                Sign Up Now!
              </Link>
            </span>
          </p>
          <p className="text-center text-red-800">{error}</p>
        </form>
      </div>
    </React.Fragment>
  );
}
