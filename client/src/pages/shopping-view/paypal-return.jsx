import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { capturePayment } from "@/store/shop/order-slice"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"

function PaypalReturnPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paymentId = params.get("paymentId")
  const payerId = params.get("PayerID")
  const audioRef = useRef(null) // Audio reference

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          // Play success sound before redirection
          if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.error("Audio playback failed:", error)
            })
          }

          setTimeout(() => {
            sessionStorage.removeItem("currentOrderId")
            window.location.href = "/shop/payment-success"
          }, 1500) // Slight delay to allow sound and animation
        }
      })
    }
  }, [paymentId, payerId, dispatch])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center items-center h-screen"
    >
      <Card className="max-w-md mx-auto p-6 text-center shadow-lg">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardTitle className="text-xl font-semibold text-gray-700">
              Processing Payment... Please wait!
            </CardTitle>
          </motion.div>

          {/* Loading animation */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </motion.div>
        </CardHeader>
      </Card>
      <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
    </motion.div>
  )
}

export default PaypalReturnPage





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
//           }, 2000) // Slight delay to allow sound and animation
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
//       <Card className="max-w-md mx-auto p-6 text-center shadow-xl bg-white rounded-2xl">
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

//           {/* High-quality animated loader */}
//           <motion.div
//             className="mt-6 flex justify-center"
//             initial={{ scale: 0 }}
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//           >
//             <motion.div
//               className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//             />
//           </motion.div>

//           {/* Pulsating glow effect */}
//           <motion.div
//             className="mt-4"
//             initial={{ opacity: 0.6 }}
//             animate={{ opacity: [0.6, 1, 0.6] }}
//             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//           >
//             <p className="text-gray-500">Do not refresh or close the page.</p>
//           </motion.div>
//         </CardHeader>
//       </Card>
//       <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
//     </motion.div>
//   )
// }

// export default PaypalReturnPage

