"use client"

import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

function PaymentSuccessPage() {
  const navigate = useNavigate()
  const audioRef = useRef(null) // Corrected useRef initialization

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error)
      })
    }
  }, [])

  return (
    <Card className="max-w-md mx-auto mt-20 p-6">
      <CardHeader className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <CheckCircle className="w-24 h-24 mx-auto text-green-500" />
        </motion.div>
        <CardTitle className="text-4xl">
          <motion.p
            className="mt-2 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Payment is successful!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Button className="mt-6" onClick={() => navigate("/shop/account")}>
              View Orders
            </Button>
          </motion.div>
        </CardTitle>
      </CardHeader>
      <audio ref={audioRef} src="/success-sound.mp3" preload="auto" />
    </Card>
  )
}

export default PaymentSuccessPage