import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import login from "@/assets/login.json"; // Lottie Animation
import { CheckCircle, XCircle } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col gap-2 text-lg"
            >
              <div className="flex flex-row items-center gap-2">
                <CheckCircle className="text-white" size={24} />
                {data?.payload?.message}
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-1 bg-white"
              />
            </motion.div>
          ),
          className:"bg-green-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-5 right-5 sm:right-14 w-[90%] sm:w-[350px] max-w-[350px]",
          duration: 4000,
        });
        
      } else {
        toast({
          title: (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-2 text-lg"
            >
              <div className="flex flex-row items-center gap-2">
                <XCircle className="text-white" size={24} />
                {data?.payload?.message}
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-1 bg-white"
              />
            </motion.div>
          ),
          className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-3 right-5 w-[400px]",
          duration: 2000,
        });
        
      }
    });
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-sm sm:max-w-md mt-[-40px] space-y-6 px-4 sm:px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Lottie Animation */}
      <motion.div
        className="flex justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Lottie animationData={login} loop={true} className="w-32 sm:w-40" />
      </motion.div>

      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Don&#39;t have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </motion.div>

      {/* Form with Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </motion.div>
    </motion.div>
  );
}

export default AuthLogin;


// import CommonForm from "@/components/common/form";
// import { loginFormControls } from "@/config";
// import { useToast } from "@/hooks/use-toast";
// import { loginUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// const initialState = {
//   email: "",
//   password: "",
// };

// function AuthLogin() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();

//     dispatch(loginUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message,
//         });
//       } else {
//         toast({
//           title: data?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }

//   console.log(formData);

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
//       <div className="mx-auto w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6 transform transition duration-500 hover:scale-105">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-800">
//             Sign in to your account
//           </h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Don&#39;t have an account?
//             <Link
//               className="font-medium ml-2 text-primary hover:text-blue-500 underline"
//               to="/auth/register"
//             >
//               Register
//             </Link>
//           </p>
//         </div>

//         <CommonForm
//           formControls={loginFormControls}
//           buttonText={"Sign In"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />

//         <p className="text-center text-sm text-gray-500">
//           Forgot your password?{" "}
//           <Link
//             className="text-blue-500 hover:underline hover:text-blue-700"
//             to="/auth/forgot-password"
//           >
//             Click here
//           </Link>
//         </p>
//       </div>

//       <footer className="mt-6 text-sm text-white opacity-70 hover:opacity-100 transition duration-300">
//         © {new Date().getFullYear()} YourCompany. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default AuthLogin;
