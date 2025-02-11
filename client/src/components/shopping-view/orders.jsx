import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table"
import ShoppingOrderDetailsView from "./order-details"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice"
import { Badge } from "../ui/badge"
function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { orderList, orderDetails} = useSelector((state) => state.shopOrder)

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }
  
  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id))
  }, [dispatch, user?.id])

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails")

  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader className="bg-gray-900 text-white rounded-t-md">
        <CardTitle className="text-lg">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full border border-gray-300 rounded-md overflow-hidden">
          <TableHeader className="bg-gray-100 text-gray-700">
            <TableRow >
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
                  <TableRow key={orderItem} className="hover:bg-gray-100 transition">
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
                          setOpenDetailsDialog(false)
                          dispatch(resetOrderDetails())
                        }}
                      >
                        <Button
                          className="bg-black text-white hover:bg-gray-900"
                          onClick={
                            () =>  handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders

// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Dialog } from "../ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import ShoppingOrderDetailsView from "./order-details";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersByUserId,
//   getOrderDetails,
//   resetOrderDetails,
// } from "@/store/shop/order-slice";
// import { Badge } from "../ui/badge";

// function ShoppingOrders() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetails(getId));
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersByUserId(user?.id));
//   }, [dispatch]);

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true);
//   }, [orderDetails]);

//   console.log(orderDetails, "orderDetails");

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order History</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
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
//                   <TableRow key={orderItem}>
//                     <TableCell>{orderItem?._id}</TableCell>
//                     <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`py-1 px-3 ${
//                           orderItem?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderItem?.orderStatus === "rejected"
//                             ? "bg-red-600"
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
//                           setOpenDetailsDialog(false);
//                           dispatch(resetOrderDetails());
//                         }}
//                       >
//                         <Button
//                           onClick={() =>
//                             handleFetchOrderDetails(orderItem?._id)
//                           }
//                         >
//                           View Details
//                         </Button>
//                         <ShoppingOrderDetailsView orderDetails={orderDetails} />
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// export default ShoppingOrders;
