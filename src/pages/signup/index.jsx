import React, { useState } from 'react';
import { motion } from 'motion/react';
import CustomInputField from '../../components/custom_input_field';
import { Link, useNavigate } from 'react-router';
import { signUp } from '../../api/auth';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp(formData);
      if (result) {
        navigate('/signin');
      }
    } catch (error) {
      setError(`${error}`);
    }
  };

  console.log(error);

  return (
    <React.Fragment>
      <div className="h-screen flex flex-col items-center justify-center">
        <img
          src="/images/poster4.jpg"
          alt="Background Poster"
          className="absolute h-screen z-[-10] filter brightness-50"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-1/4 bg-black rounded-lg border border-yellow-400 flex flex-col justify-center p-10 gap-5"
        >
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <CustomInputField
            type="text"
            labelText="What is your name?"
            placeholder="Rei Mizuki"
            inputName="fullName"
            inputValue={formData.fullName}
            onChange={handleChange}
          />
          <CustomInputField
            type="text"
            labelText="What should we call you?"
            placeholder="username"
            inputName="username"
            inputValue={formData.username}
            onChange={handleChange}
          />
          <CustomInputField
            type="email"
            labelText="What is your email?"
            placeholder="example@gmail.com"
            inputName="email"
            inputValue={formData.email}
            onChange={handleChange}
          />
          <CustomInputField
            type="password"
            labelText="Insert a nice password"
            placeholder="Your Password"
            inputName="password"
            inputValue={formData.password}
            onChange={handleChange}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: '#fde047' }}
            className="px-10 py-3 bg-yellow-200 rounded-full text-black font-semibold"
          >
            Sign Up
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
              Sign up with Google
            </div>
          </motion.button>
          <p className="text-center">
            Already have an account?{' '}
            <span>
              <Link
                to="/signin"
                className="text-yellow-200 hover:text-yellow-400"
              >
                Sign In Now!
              </Link>
            </span>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
}
