import React, { useState } from 'react';
import Card from '../ui/Card.jsx';
import CardContent from '../ui/CardContent.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

// npm install framer-motion
// npm install lucide-react

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 via-white to-pink-200">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-6"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Welcome Back
            </h1>
            <form className="space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="mt-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-7 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl">
                Log In
              </Button>
            </form>
            <p className="text-sm text-center text-gray-500 mt-6">
              Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

