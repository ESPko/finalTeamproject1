import { motion } from "framer-motion";
import Card from '../ui/Card.jsx';
import CardContent from '../ui/CardContent.jsx';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import Label from '../ui/Label.jsx';
import Checkbox from '../ui/Checkbox.jsx';

export default function Login2() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-cyan-500">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#1f2937] text-white relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-gray-900 px-6 py-2 rounded-b-2xl font-bold">
            SIGN IN
          </div>
          <CardContent className="pt-20 pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input id="username" placeholder="username" className="bg-gray-700 mt-1" />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input id="password" type="password" placeholder="password" className="bg-gray-700 mt-1" />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-gray-400">Remember me</Label>
                </div>
                <button className="hover:underline">Forgot your password?</button>
              </div>

              <Button className="w-full bg-cyan-400 text-gray-900 font-bold mt-6">LOGIN</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
