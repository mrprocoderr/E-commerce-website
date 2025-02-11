import { Dialog } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { useState } from "react"

import AdminOrderDetailsView from "./order-details"

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader className="bg-gray-900 text-white rounded-t-md">
        <CardTitle className="text-lg"> All Orders</CardTitle>
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
            <TableRow className="hover:bg-gray-100 transition">
              <TableCell> 12345</TableCell>
              <TableCell> 2024-02-10</TableCell>
              <TableCell> Completed</TableCell>
              <TableCell> $120.00</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  <Button
                    className="bg-black text-white hover:bg-gray-900"
                    onClick={() => setOpenDetailsDialog(true)}
                  >
                    View Details
                  </Button>
                  <AdminOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView
