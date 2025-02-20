// import { Outlet } from "react-router-dom"

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 w-1/2 px-12">
//         <div className="max-w-md space-y-8 text-center text-primary-foreground">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">Welcome to ECommerce Shopping</h1>
//           <div className="relative">
//             <div className="absolute -inset-2 rounded-xl blur-2xl bg-blue-500/20"></div>
//             <img
//               src="https://www.udyogmart.com/wp-content/uploads/2020/01/ezgif.com-video-to-gif.gif"
//               alt="E-commerce shopping animation"
//               className="relative w-full max-w-[400px] h-auto mx-auto rounded-xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export default AuthLayout























// import { Outlet } from "react-router-dom";
// import layout from "@/assets/layout.json";
// import Lottie from "lottie-react";
// import { motion } from "framer-motion";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       {/* Left Section */}
//       <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 w-1/2 px-12">
//         <div className="max-w-md space-y-8 text-center text-primary-foreground">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//               Welcome to
//             </span>
//             <br />
//             <span className="relative">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500">
//               Modern Hub
//               </span>
//               <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500"></span>
//             </span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//               {" "}
//               Shopy
//             </span>
//           </h1>
          
//           {/* Animated Lottie Component */}
//           <motion.div
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//           >
//             <Lottie animationData={layout} loop={true} className="w-60 mx-auto" />
//           </motion.div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;

import { Outlet } from "react-router-dom";
import layout from "@/assets/layout.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 w-full lg:w-1/2 px-6 py-12 lg:px-12 lg:py-0">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Welcome to
            </span>
            <br />
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500">
                Modern Hub
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500"></span>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              {" "}Shopy
            </span>
          </h1>
          
          {/* Animated Lottie Component */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Lottie animationData={layout} loop={true} className="w-48 md:w-60 mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;






































// import { Outlet } from "react-router-dom";
// import layout from "@/assets/layout.json";
// import Lottie from "lottie-react";
// import { motion } from "framer-motion";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
//       {/* Background Animated Blur Effects */}
//       <motion.div
//         className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-pink-500/10 to-transparent"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 2, ease: "easeInOut" }}
//       />

//       {/* Left Section */}
//       <motion.div
//         className="hidden lg:flex flex-col items-center justify-center w-1/2 px-12 relative"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1, ease: "easeInOut" }}
//       >
//         <div className="max-w-md space-y-8 text-center">
//           <motion.h1
//             className="text-5xl font-extrabold tracking-tight text-white mb-8"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//               Welcome to
//             </span>
//             <br />
//             <span className="relative">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500">
//                 E-Commerce
//               </span>
//               <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500"></span>
//             </span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//               {" "}Shopping
//             </span>
//           </motion.h1>

//           {/* Animated Lottie Component */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//           >
//             <Lottie animationData={layout} loop={true} className="w-72 mx-auto" />
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Right Section with Floating Cards Effect */}
//       <motion.div
//         className="flex flex-1 items-center justify-center bg-white/10 px-4 py-12 sm:px-6 lg:px-8 min-h-screen backdrop-blur-md relative z-10 shadow-lg rounded-lg"
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1, ease: "easeInOut" }}
//       >
//         {/* <motion.div
//           // className="p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl border border-white/10"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         > */}
//           <Outlet />
//         {/* </motion.div> */}
//       </motion.div>

//       {/* Floating Gradient Lights */}
//       <motion.div
//         className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full"
//         animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full"
//         animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </div>
//   );
// }

// export default AuthLayout;
