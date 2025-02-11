import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  // Debugging
  console.log("Order Details:", orderDetails);

  return (
    <DialogContent className="sm:max-w-[600px] p-6 bg-white rounded-lg shadow-lg z-50">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id || "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate?.split("T")[0] || "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount || "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod || "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus || "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Badge
              className={`py-1 px-3 text-white rounded-md ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : orderDetails?.orderStatus === "pending"
                  ? "bg-yellow-500"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus || "N/A"}
            </Badge>
          </div>
        </div>

        <div className="w-full border-t border-gray-300 my-4"></div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails.cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <span>Title: {item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                  </li>
                ))
              ) : (
                <span>No items in the cart.</span>
              )}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName || "N/A"}</span>
              
              {orderDetails?.addressInfo ? (
                <>
                  <span>{orderDetails.addressInfo.address || "N/A"}</span>
                  <span>{orderDetails.addressInfo.city || "N/A"}</span>
                  <span>{orderDetails.addressInfo.pincode || "N/A"}</span>
                  <span>{orderDetails.addressInfo.phone || "N/A"}</span>
                  <span>{orderDetails.addressInfo.notes || "N/A"}</span>
                </>
              ) : (
                <span className="text-red-500">Address information is missing</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
