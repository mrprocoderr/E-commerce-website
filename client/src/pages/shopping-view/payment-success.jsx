// "use client"

// import { useEffect, useRef } from "react"
// import { useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle } from "@/components/ui/card"
// import { CheckCircle } from "lucide-react"

// function PaymentSuccessPage() {
//   const navigate = useNavigate()
//   const audioRef = useRef(null) // Corrected useRef initialization

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.play().catch(error => {
//         console.error("Audio playback failed:", error)
//       })
//     }
//   }, [])

//   return (
//     <Card className="max-w-md mx-auto mt-20 p-6">
//       <CardHeader className="text-center">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{
//             type: "spring",
//             stiffness: 260,
//             damping: 20,
//           }}
//         >
//           <CheckCircle className="w-24 h-24 mx-auto text-green-500" />
//         </motion.div>
//         <CardTitle className="text-4xl">
//           <motion.p
//             className="mt-2 text-gray-600"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             Payment is successful!
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.9, duration: 0.5 }}
//           >
//             <Button className="mt-6" onClick={() => navigate("/shop/account")}>
//               View Orders
//             </Button>
//           </motion.div>
//         </CardTitle>
//       </CardHeader>
//       <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
//     </Card>
//   )
// }

// export default PaymentSuccessPage


// "use client"

// import { useEffect, useRef } from "react"
// import { useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { CheckCircle } from "lucide-react"

// function PaymentSuccessPage() {
//   const navigate = useNavigate()
//   const audioRef = useRef(null)

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.play().catch(error => {
//         console.error("Audio playback failed:", error)
//       })
//     }
//   }, [])

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       >
//         <Card className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition-transform">
//           <CardHeader className="text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             >
//               <CheckCircle className="w-24 h-24 mx-auto text-green-500 drop-shadow-md animate-pulse" />
//             </motion.div>
//             <CardTitle className="text-4xl font-extrabold text-gray-800 mt-4">
//               Payment Successful!
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center">
//             <motion.p
//               className="text-gray-600 text-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.5 }}
//             >
//               Your payment has been processed successfully.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9, duration: 0.5 }}
//             >
//               <div className="mt-6 space-x-4">
//                 <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-transform" onClick={() => navigate("/shop/account")}>
//                   View Orders
//                 </Button>
//                 <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-transform" onClick={() => navigate("/shop/details")}>
//                   View Details
//                 </Button>
//               </div>
//             </motion.div>
//           </CardContent>
//           <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
//         </Card>
//       </motion.div>
//     </div>
//   )
// }

// export default PaymentSuccessPage


// "use client";

// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { CheckCircle } from "lucide-react";

// function PaymentSuccessPage() {
//   const navigate = useNavigate();
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.play().catch((error) => {
//         console.error("Audio playback failed:", error);
//       });
//     }
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//       className="flex items-center justify-center min-h-screen h-screen bg-gray-100"
//     >
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ type: "spring", stiffness: 200, damping: 20 }}
//       >
//         <Card className="max-w-md mx-auto p-8 bg-white shadow-2xl rounded-3xl">
//           <CardHeader className="text-center">
//             <motion.div
//               initial={{ rotate: 0, scale: 0.5 }}
//               animate={{ rotate: 360, scale: 1 }}
//               transition={{ duration: 1, ease: "easeInOut" }}
//             >
//               <CheckCircle className="w-24 h-24 mx-auto text-green-500 drop-shadow-lg" />
//             </motion.div>
//             <CardTitle className="text-4xl font-bold text-gray-800 mt-4">
//               Payment Successful! 🎉
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center">
//             <motion.p
//               className="text-gray-600 text-lg"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//             >
//               Your payment has been processed successfully.
//             </motion.p>
//             <motion.div
//               className="mt-6 space-x-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//             >
//               <Button
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
//                 onClick={() => navigate("/shop/account")}
//               >
//                 View Orders
//               </Button>
//               {/* <Button
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
//                 onClick={() => navigate("/shop/details")}
//               >
//                 View Details
//               </Button> */}
//             </motion.div>
//           </CardContent>
//           <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
//         </Card>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default PaymentSuccessPage;


"use client";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Lottie from "lottie-react";
import successAnimation from "@/assets/succesful-payment.json"; // Ensure the JSON file is in the correct path

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex items-center justify-center min-h-screen h-screen bg-gradient-to-r from-green-400 to-blue-500"
      // className="flex items-center justify-center min-h-screen h-screen bg-gray-100"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Card className="max-w-md mx-auto p-4 bg-white shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* Lottie Animation */}
              <Lottie animationData={successAnimation} loop={false} className="w-40 mx-auto" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800 mt-4">
              Payment Successful! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Your payment has been processed successfully.
            </motion.p>
            <motion.div
              className="mt-6 space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
                onClick={() => navigate("/shop/account")}
              >
                View Orders
              </Button>
            </motion.div>
          </CardContent>
          <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default PaymentSuccessPage;
