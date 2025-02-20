// import { useEffect, useState } from "react"
// import { Button } from "../ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Dialog } from "../ui/dialog"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table"
// import AdminOrderDetailsView from "./order-details"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice"
// import { Badge } from "../ui/badge"

// function AdminOrdersView() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
//   const { orderList, orderDetails } = useSelector((state) => state.adminOrder)
//   const dispatch = useDispatch()

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetailsForAdmin(getId))
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin())
//   }, [dispatch])

//   console.log(orderDetails, "orderList")

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true)
//   }, [orderDetails])

//   return (
//     <Card className="shadow-lg border border-gray-200">
//       <CardHeader className="bg-gray-900 text-white rounded-t-md">
//         <CardTitle className="text-lg">All Orders</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table className="w-full border border-gray-300 rounded-md overflow-hidden">
//           <TableHeader className="bg-gray-100 text-gray-700">
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Order Date</TableHead>
//               <TableHead>Order Status</TableHead>
//               <TableHead>Order Price</TableHead>
//               <TableHead>
//                 <span className="sr-only">Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orderList && orderList.length > 0
//               ? orderList.map((orderItem) => (
//                   <TableRow
//                     key={orderItem}
//                     className="hover:bg-gray-100 transition"
//                   >
//                     <TableCell>{orderItem?._id}</TableCell>
//                     <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`py-1 px-3 ${
//                           orderItem?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderItem?.orderStatus === "rejected"
//                             ? "bg-red-600"
//                             : orderItem?.orderStatus === "pending"
//                             ? "bg-yellow-500"
//                             : orderItem?.orderStatus === "inProcess"
//                             ? "bg-blue-500"
//                             : orderItem?.orderStatus === "delivered"
//                             ? "bg-purple-500"
//                             : orderItem?.orderStatus === "inShipping"
//                             ? "bg-orange-500"
//                             : "bg-black"
//                         }`}
//                       >
//                         {orderItem?.orderStatus}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>${orderItem?.totalAmount}</TableCell>
//                     <TableCell>
//                       <Dialog
//                         open={openDetailsDialog}
//                         onOpenChange={() => {
//                           setOpenDetailsDialog(false)
//                           dispatch(resetOrderDetails())
//                         }}
//                       >
//                         <Button
//                           className="bg-black text-white hover:bg-gray-900"
//                           onClick={() =>
//                             handleFetchOrderDetails(orderItem?._id)
//                           }
//                         >
//                           View Details
//                         </Button>
//                         <AdminOrderDetailsView orderDetails={orderDetails} />
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }

// export default AdminOrdersView



import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="shadow-lg border border-gray-200 rounded-md"
    >
      <Card>
        <CardHeader className="bg-gray-900 text-white rounded-t-md">
          <CardTitle className="text-lg">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full border border-gray-300 rounded-md overflow-hidden">
            <TableHeader className="bg-gray-100 text-gray-700">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <motion.tr
                      key={orderItem._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      className="hover:bg-gray-100 transition cursor-pointer"
                    >
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : orderItem?.orderStatus === "pending"
                              ? "bg-yellow-500"
                              : orderItem?.orderStatus === "inProcess"
                              ? "bg-blue-500"
                              : orderItem?.orderStatus === "delivered"
                              ? "bg-purple-500"
                              : orderItem?.orderStatus === "inShipping"
                              ? "bg-orange-500"
                              : "bg-black"
                          }`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>${orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              className="bg-black text-white hover:bg-gray-900"
                              onClick={() =>
                                handleFetchOrderDetails(orderItem?._id)
                              }
                            >
                              View Details
                            </Button>
                          </motion.div>
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </motion.tr>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AdminOrdersView;


// "use client"

// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import AdminOrderDetailsView from "./order-details"
// import { useDispatch, useSelector } from "react-redux"
// import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice"
// import { Badge } from "@/components/ui/badge"
// import { ChevronDown } from "lucide-react"

// function AdminOrdersView() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
//   const [expandedOrder, setExpandedOrder] = useState(null)
//   const { orderList, orderDetails } = useSelector((state) => state.adminOrder)
//   const dispatch = useDispatch()

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetailsForAdmin(getId))
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin())
//   }, [dispatch])

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true)
//   }, [orderDetails])

//   const toggleOrderExpansion = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId)
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-green-500"
//       case "rejected":
//         return "bg-red-600"
//       case "pending":
//         return "bg-yellow-500"
//       case "inProcess":
//         return "bg-blue-500"
//       case "delivered":
//         return "bg-purple-500"
//       case "inShipping":
//         return "bg-orange-500"
//       default:
//         return "bg-black"
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="shadow-lg border border-gray-200 rounded-md"
//     >
//       <Card className="overflow-hidden">
//         <CardHeader className="bg-gray-900 text-white rounded-t-md">
//           <CardTitle className="text-lg font-semibold">All Orders</CardTitle>
//         </CardHeader>
//         <CardContent className="p-0 sm:p-6">
//           <div className="hidden sm:block overflow-x-auto">
//             <Table className="w-full border border-gray-300 rounded-md">
//               <TableHeader className="bg-gray-100 text-gray-700">
//                 <TableRow>
//                   <TableHead className="w-1/5">Order ID</TableHead>
//                   <TableHead className="w-1/5">Order Date</TableHead>
//                   <TableHead className="w-1/5">Order Status</TableHead>
//                   <TableHead className="w-1/5">Order Price</TableHead>
//                   <TableHead className="w-1/5">
//                     <span className="sr-only">Details</span>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orderList && orderList.length > 0
//                   ? orderList.map((orderItem) => (
//                       <motion.tr
//                         key={orderItem._id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
//                         className="hover:bg-gray-50 transition-colors duration-200"
//                       >
//                         <TableCell className="font-medium">{orderItem?._id}</TableCell>
//                         <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                         <TableCell>
//                           <Badge
//                             className={`py-1 px-3 text-xs font-semibold ${getStatusColor(orderItem?.orderStatus)}`}
//                           >
//                             {orderItem?.orderStatus}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>${orderItem?.totalAmount.toFixed(2)}</TableCell>
//                         <TableCell>
//                           <Dialog
//                             open={openDetailsDialog}
//                             onOpenChange={() => {
//                               setOpenDetailsDialog(false)
//                               dispatch(resetOrderDetails())
//                             }}
//                           >
//                             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                               <Button
//                                 className="bg-black text-white hover:bg-gray-800 transition-colors duration-200"
//                                 onClick={() => handleFetchOrderDetails(orderItem?._id)}
//                               >
//                                 View Details
//                               </Button>
//                             </motion.div>
//                             <DialogContent>
//                               <AdminOrderDetailsView orderDetails={orderDetails} />
//                             </DialogContent>
//                           </Dialog>
//                         </TableCell>
//                       </motion.tr>
//                     ))
//                   : null}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="sm:hidden">
//             {orderList && orderList.length > 0
//               ? orderList.map((orderItem) => (
//                   <motion.div
//                     key={orderItem._id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="border-b border-gray-200 py-4 px-4"
//                   >
//                     <div
//                       className="flex justify-between items-center cursor-pointer"
//                       onClick={() => toggleOrderExpansion(orderItem._id)}
//                     >
//                       <div>
//                         <p className="font-semibold text-sm">Order ID: {orderItem?._id}</p>
//                         <p className="text-xs text-gray-500 mt-1">{orderItem?.orderDate.split("T")[0]}</p>
//                       </div>
//                       <motion.div
//                         initial={false}
//                         animate={{ rotate: expandedOrder === orderItem._id ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <ChevronDown className="w-5 h-5 text-gray-500" />
//                       </motion.div>
//                     </div>
//                     <AnimatePresence>
//                       {expandedOrder === orderItem._id && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="mt-4 space-y-3 overflow-hidden"
//                         >
//                           <p className="flex items-center justify-between text-sm">
//                             <span className="text-gray-600">Status:</span>
//                             <Badge className={`py-1 px-2 text-xs ${getStatusColor(orderItem?.orderStatus)}`}>
//                               {orderItem?.orderStatus}
//                             </Badge>
//                           </p>
//                           <p className="flex items-center justify-between text-sm">
//                             <span className="text-gray-600">Price:</span>
//                             <span className="font-semibold">${orderItem?.totalAmount.toFixed(2)}</span>
//                           </p>
//                           <Dialog
//                             open={openDetailsDialog}
//                             onOpenChange={() => {
//                               setOpenDetailsDialog(false)
//                               dispatch(resetOrderDetails())
//                             }}
//                           >
//                             <Button
//                               className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200 mt-2"
//                               onClick={() => handleFetchOrderDetails(orderItem?._id)}
//                             >
//                               View Details
//                             </Button>
//                             <DialogContent>
//                               <AdminOrderDetailsView orderDetails={orderDetails} />
//                             </DialogContent>
//                           </Dialog>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 ))
//               : null}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

// export default AdminOrdersView

