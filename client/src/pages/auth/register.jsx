// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/config";
// import { useToast } from "@/hooks/use-toast";
// import { registerUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom"

// const initialState = {
//   userName: "",
//   email: "",
//   password: "",
// };
// function AuthRegister() {

//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();
//     dispatch(registerUser(formData)).then((data) => {
//         if (data?.payload?.success) {
//             toast({
//                 title: data?.payload?.message,
//                 className: "bg-green-500 text-white", // Success background color
//             });
//             navigate("/auth/login");
//         } else {
//             toast({
//                 title: data?.payload?.message,
//                 className: "bg-red-500 text-white", // Error background color
//                 variant: "destructive",
//             });
//         }
//     });
// }


//   console.log(formData);

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p className="mt-2">
//           Already have an account
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/login"
//           >
//             Login
//           </Link>
//         </p>
//       </div>

//       <CommonForm
//         formControls={registerFormControls}
//         buttonText={"Sign Up"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   )
// }

// export default AuthRegister

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";

// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/config";
// import { useToast } from "@/hooks/use-toast";
// import { registerUser } from "@/store/auth-slice";
// import registration from "@/assets/registration.json"; // Lottie Animation
// import { CheckCircle, XCircle } from "lucide-react";

// const initialState = {
//   userName: "",
//   email: "",
//   password: "",
// };

// function AuthRegister() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();
//     dispatch(registerUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               className="flex items-center gap-2"
//             >
//               <CheckCircle className="text-green-500" size={20} />
//               {data?.payload?.message}
//             </motion.div>
//           ),
//           className: "bg-white text-black shadow-lg px-4 py-2 rounded-lg",
//         });
//         // toast({
//         //   title: data?.payload?.message,
//         //   className: "bg-white text-black shadow-lg",
//         // });
//         navigate("/auth/login");
//       } else {
//         toast({
//           title: (
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               whileTap={{ scale: 0.9 }}
//               className="flex items-center gap-2"
//             >
//               <XCircle className="text-green-500" size={20} />
//               <span>{data?.payload?.message}</span>
//             </motion.div>
//           ),
//           className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
//         })
//         // toast({
//         //   title: data?.payload?.message,
//         //   className: "bg-red-500 text-white shadow-lg",
//         //   variant: "destructive",
//         // });
//       }
//     });
//   }

//   return (
//     <motion.div
//       className="mx-auto w-full max-w-md space-y-4 -mt-14" // Reduced top margin
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//     >
//       {/* Lottie Animation */}
//       <motion.div
//         className="flex justify-center"
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeInOut" }}
//       >
//         <Lottie animationData={registration} loop={true} className="w-40" />
//       </motion.div>
  
//       {/* Header */}
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p className="mt-1 text-sm text-gray-600">
//           Already have an account?
//           <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
//             Login
//           </Link>
//         </p>
//       </motion.div>
  
//       {/* Form with Motion */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//       >
//         <CommonForm
//           formControls={registerFormControls}
//           buttonText={"Sign Up"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />
//       </motion.div>
//     </motion.div>
//   );
  
// }

// export default AuthRegister;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import registration from "@/assets/registration.json"; // Lottie Animation
import { CheckCircle, XCircle } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="text-green-500" size={20} />
              {data?.payload?.message}
            </motion.div>
          ),
          className: "bg-white text-black shadow-lg px-4 py-2 rounded-lg",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2"
            >
              <XCircle className="text-red-500" size={20} />
              <span>{data?.payload?.message}</span>
            </motion.div>
          ),
          className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
        });
      }
    });
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-md space-y-4 mt-[-150px] px-4 sm:px-6 lg:px-8"
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
        <Lottie animationData={registration} loop={true} className="w-40 mt-0" />
      </motion.div>
  
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Already have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
            Login
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
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </motion.div>
    </motion.div>
  );
  
}

export default AuthRegister;
