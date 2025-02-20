// import { Card, CardHeader, CardTitle } from "@/components/ui/card"
// import { capturePayment } from "@/store/shop/order-slice"
// import { useEffect, useRef } from "react"
// import { useDispatch } from "react-redux"
// import { useLocation } from "react-router-dom"
// import { motion } from "framer-motion"

// function PaypalReturnPage() {
//   const dispatch = useDispatch()
//   const location = useLocation()
//   const params = new URLSearchParams(location.search)
//   const paymentId = params.get("paymentId")
//   const payerId = params.get("PayerID")
//   const audioRef = useRef(null) // Audio reference

//   useEffect(() => {
//     if (paymentId && payerId) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))

//       dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
//         if (data?.payload?.success) {
//           // Play success sound before redirection
//           if (audioRef.current) {
//             audioRef.current.play().catch((error) => {
//               console.error("Audio playback failed:", error)
//             })
//           }

//           setTimeout(() => {
//             sessionStorage.removeItem("currentOrderId")
//             window.location.href = "/shop/payment-success"
//           }, 1500) // Slight delay to allow sound and animation
//         }
//       })
//     }
//   }, [paymentId, payerId, dispatch])

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//       className="flex justify-center items-center h-screen"
//     >
//       <Card className="max-w-md mx-auto p-6 text-center shadow-lg">
//         <CardHeader>
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <CardTitle className="text-xl font-semibold text-gray-700">
//               Processing Payment... Please wait!
//             </CardTitle>
//           </motion.div>

//           {/* Loading animation */}
//           <motion.div
//             className="mt-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//           >
//             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           </motion.div>
//         </CardHeader>
//       </Card>
//       <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
//     </motion.div>
//   )
// }

// export default PaypalReturnPage





// "use client";

// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// import rupeePaymentAnimation from "@/assets/rupee-payment-processing1.json"; // Make sure the file is correctly placed

// function PaypalReturnPage() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const paymentId = params.get("paymentId");
//   const payerId = params.get("PayerID");
//   const audioRef = useRef(null);
//   const [isProcessing, setIsProcessing] = useState(true);

//   useEffect(() => {
//     if (paymentId && payerId) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId") || "{}");

//       dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
//         if (data?.payload?.success) {
//           setIsProcessing(false); // Stop processing animation

//           if (audioRef.current) {
//             audioRef.current.play().catch((error) => {
//               console.error("Audio playback failed:", error);
//             });
//           }

//           setTimeout(() => {
//             sessionStorage.removeItem("currentOrderId");
//             window.location.href = "/shop/payment-success";
//           }, 2000); // Slight delay for better experience
//         }
//       });
//     }
//   }, [paymentId, payerId, dispatch]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: "easeInOut" }}
//       className="flex justify-center items-center h-screen bg-gray-100"
//     >
//       <Card className="max-w-lg mx-auto p-8 text-center shadow-xl bg-white border border-gray-200 rounded-3xl">
//         <CardHeader>
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.7 }}
//           >
//             <CardTitle className="text-2xl font-bold text-gray-800">
//               {/* {isProcessing ? "Processing Payment..." : "Payment Successful!"} */}
//               Processing Payment... Please wait!
//             </CardTitle>
//           </motion.div>

//           {/* Lottie Animation with Scaling Effect */}
//           <motion.div
//             className="mt-6"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.2, ease: "easeInOut" }}
//           >
//             <Lottie animationData={rupeePaymentAnimation} loop={isProcessing} className="w-60 mx-auto" />
//           </motion.div>

//           {/* Success Message (Visible After Payment Success) */}
//           {!isProcessing && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//               className="mt-6 text-lg font-semibold text-green-600"
//             >
//               {/* Payment Received Successfully! 🎉 */}
//             </motion.div>
//           )}
//         </CardHeader>
//       </Card>
//       <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
//     </motion.div>
//   );
// }

// export default PaypalReturnPage;



"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import rupeePaymentAnimation from "@/assets/rupee-payment-processing.json"; // Ensure the file is correctly placed

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const audioRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId") || "{}");

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          setIsProcessing(false);

          if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.error("Audio playback failed:", error);
            });
          }

          setTimeout(() => {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          }, 2000);
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex justify-center items-center min-h-screen bg-gray-100 px-4"
    >
      <Card className="w-full max-w-lg mx-auto p-6 sm:p-8 text-center shadow-xl bg-white border border-gray-200 rounded-3xl">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              {isProcessing ? "Processing Payment... Please wait!" : "Payment Successful!"}
            </CardTitle>
          </motion.div>

          {/* Lottie Animation */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Lottie 
              animationData={rupeePaymentAnimation} 
              loop={isProcessing} 
              className="w-40 sm:w-60 mx-auto" 
            />
          </motion.div>

          {/* Success Message */}
          {!isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-base sm:text-lg font-semibold text-green-600"
            >
              Payment Received Successfully! 🎉
            </motion.div>
          )}
        </CardHeader>
      </Card>
      <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
    </motion.div>
  );
}

export default PaypalReturnPage;
