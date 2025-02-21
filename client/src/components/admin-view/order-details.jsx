// import { useState } from "react"
// import CommonForm from "../common/form"
// import { DialogContent } from "../ui/dialog"
// import { Label } from "../ui/label"
// import { Separator } from "../ui/separator"
// import { Badge } from "../ui/badge"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   updateOrderStatus,
// } from "@/store/admin/order-slice"
// import { useToast } from "@/hooks/use-toast"

// const initialFormData = {
//   status: "",
// }

// function AdminOrderDetailsView({ orderDetails }) {
//   const [formData, setFormData] = useState(initialFormData)
//   const { user } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const { toast } = useToast()

//   console.log(orderDetails, "orderDetailsorderDetails")

//   function handleUpdateStatus(event) {
//     event.preventDefault()
//     const { status } = formData

//     dispatch(
//       updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(getOrderDetailsForAdmin(orderDetails?._id))
//         dispatch(getAllOrdersForAdmin())
//         setFormData(initialFormData)
//         toast({
//           title: data?.payload?.message,
//           className:"bg-white text-black shadow-lg"
//         })
//       }
//     })
//   }

//   return (
//     <DialogContent className="sm:max-w-[600px] p-6 bg-white rounded-lg shadow-lg z-50">
//       <div className="grid gap-6">
//         <div className="grid gap-2">
//           <div className="flex mt-6 items-center justify-between">
//             <p className="font-medium">Order ID</p>
//             <Label>{orderDetails?._id}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Date</p>
//             <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Price</p>
//             <Label>${orderDetails?.totalAmount}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment method</p>
//             <Label>{orderDetails?.paymentMethod}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment Status</p>
//             <Label>{orderDetails?.paymentStatus}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Status</p>
//             <Label>
//               <Badge
//                 className={`py-1 px-3 text-white rounded-md ${
//                   orderDetails?.orderStatus === "confirmed"
//                     ? "bg-green-500"
//                     : orderDetails?.orderStatus === "rejected"
//                     ? "bg-red-600"
//                     : orderDetails?.orderStatus === "pending"
//                     ? "bg-yellow-500"
//                     : "bg-black"
//                 }`}
//               >
//                 {orderDetails?.orderStatus}
//               </Badge>
//             </Label>
//           </div>
//         </div>
//         <Separator />
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Order Details</div>
//             <ul className="grid gap-3">
//               {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
//                 ? orderDetails?.cartItems.map((item) => (
//                     <li
//                       key={item}
//                       className="flex items-center justify-between"
//                     >
//                       <span>Title: {item.title}</span>
//                       <span>Quantity: {item.quantity}</span>
//                       <span>Price: ${item.price}</span>
//                     </li>
//                   ))
//                 : null}
//             </ul>
//           </div>
//         </div>
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Shipping Info</div>
//             <div className="grid gap-0.5 text-muted-foreground">
//               <span>{user.userName}</span>
//               <span>{orderDetails?.addressInfo?.address}</span>
//               <span>{orderDetails?.addressInfo?.city}</span>
//               <span>{orderDetails?.addressInfo?.pincode}</span>
//               <span>{orderDetails?.addressInfo?.phone}</span>
//               <span>{orderDetails?.addressInfo?.notes}</span>
//             </div>
//           </div>
//         </div>

//         <div>
//           <CommonForm
//             formControls={[
//               {
//                 label: "Order Status",
//                 name: "status",
//                 componentType: "select",
//                 options: [
//                   { id: "pending", label: "Pending" },
//                   { id: "inProcess", label: "In Process" },
//                   { id: "inShipping", label: "In Shipping" },
//                   { id: "delivered", label: "Delivered" },
//                   { id: "rejected", label: "Rejected" },
//                 ],
//               },
//             ]}
//             formData={formData}
//             setFormData={setFormData}
//             buttonText={"Update Order Status"}
//             onSubmit={handleUpdateStatus}
//           />
//         </div>
//       </div>
//     </DialogContent>
//   )
// }

// export default AdminOrderDetailsView



"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CommonForm from "../common/form"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"

const initialFormData = {
  status: "",
}

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { toast } = useToast()

  function handleUpdateStatus(event) {
    event.preventDefault()
    const { status } = formData

    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id))
        dispatch(getAllOrdersForAdmin())
        setFormData(initialFormData)
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
                {/* <span>Product is added to cart</span> */}
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
          className: "bg-green-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-5 w-[320px]",
          duration: 4000,
        });
        // toast({
        //   title: data?.payload?.message,
        //   className: "bg-white text-black shadow-lg",
        // })
      }
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "rejected":
        return "bg-red-600"
      case "pending":
        return "bg-yellow-500"
      case "inProcess":
        return "bg-blue-500"
      case "delivered":
        return "bg-purple-500"
      case "inShipping":
        return "bg-orange-500"
      default:
        return "bg-black"
    }
  }

  return (
    <DialogContent className="sm:max-w-[600px] pt-6 p-4 sm:p-6 bg-white rounded-lg shadow-lg z-50 overflow-y-auto max-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-6"
      >
        <div className="grid gap-4">
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderDetails?._id}</Label>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Order Price</p>
              <Label>${orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Payment Method</p>
              <Label>{orderDetails?.paymentMethod}</Label>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderDetails?.paymentStatus}</Label>
            </div>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between"
          >
            <p className="font-medium text-lg">Order status</p>
            <Badge
              className={`py-1 px-3 text-white rounded-md mt-2 sm:mt-0 ${getStatusColor(orderDetails?.orderStatus)}`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </motion.div>
          </div>
        </div>
        <Separator />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4"
        >
          <div className="font-medium text-lg">Order Items</div>
          <ul className="grid gap-3">
            <AnimatePresence>
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails?.cartItems.map((item, index) => (
                  <motion.li
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-3 rounded-md"
                  >
                    <span className="font-medium">Title: {item.title}</span>
                    <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                    <span className="text-sm font-semibold">Price: Rs.{item.price}</span>
                  
                  </motion.li>
                ))
              ) : (
                <p className="text-gray-500">No items in this order.</p>
              )}
            </AnimatePresence>
          </ul>
        </motion.div>
        <Separator />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid gap-4"
        >
          <div className="font-medium text-lg">Shipping Info</div>
          <div className="grid gap-2 text-sm text-gray-600">
            <p>{user.userName}</p>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>
              {orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}
            </p>
            <p>Phone: {orderDetails?.addressInfo?.phone}</p>
            {orderDetails?.addressInfo?.notes && <p className="italic">Notes: {orderDetails?.addressInfo?.notes}</p>}
          </div>
        </motion.div>
        <Separator />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <CommonForm
            formControls={[
              {
                label: "Update Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
          />
        </motion.div>
      </motion.div>
    </DialogContent>
  )
}

export default AdminOrderDetailsView

