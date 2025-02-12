import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import AdminOrderDetailsView from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice"
import { Badge } from "../ui/badge"

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder)
  const dispatch = useDispatch()

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  console.log(orderDetails, "orderList")

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true)
  }, [orderDetails])

  return (
    <Card className="shadow-lg border border-gray-200">
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
                  <TableRow
                    key={orderItem}
                    className="hover:bg-gray-100 transition"
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
                            : orderItem?.orderStatus === "in process"
                            ? "bg-blue-500"
                            : orderItem?.orderStatus === "delivered"
                            ? "bg-purple-500"
                            : orderItem?.orderStatus === "in shipping"
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
                          setOpenDetailsDialog(false)
                          dispatch(resetOrderDetails())
                        }}
                      >
                        <Button
                          className="bg-black text-white hover:bg-gray-900"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView
