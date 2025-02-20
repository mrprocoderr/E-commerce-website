// import Address from "@/components/shopping-view/address"
// import img from "../../assets/account.jpg"
// import { useState } from "react"
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content"
// import { useDispatch, useSelector } from "react-redux"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { createNewOrder } from "@/store/shop/order-slice"
// import { XCircle } from "lucide-react"
// import { motion } from "framer-motion"
// // import { Button } from "@/components/ui/button";

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart)
//   const { user } = useSelector((state) => state.auth)
//   const { approvalURL } = useSelector((state) => state.shopOrder)
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
//   const [isPaymentStart, setIsPaymemntStart] = useState(false)
//   const dispatch = useDispatch()
//   const { toast } = useToast()

//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0

//   function handleInitiatePaypalPayment() {
//     if (cartItems.length === 0) {
//       toast({
//         title: (
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             whileTap={{ scale: 0.9 }}
//             className="flex items-center gap-2"
//           >
//             <XCircle className="text-green-500" size={20} />
//             Your cart is empty. Please add items to proceed
//           </motion.div>
//         ),
//         className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
//    });
//       // toast({
//       //   title: "Your cart is empty. Please add items to proceed",
//       //   className: "bg-red-500 text-white shadow-lg",
//       // })

//       return
//     }
//     if (currentSelectedAddress === null) {
//       toast({
//         title: (
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             whileTap={{ scale: 0.9 }}
//             className="flex items-center gap-2"
//           >
//             <XCircle className="text-green-500" size={20} />
//             Please select one address to proceed.
//           </motion.div>
//         ),
//         className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
//    });
//       // toast({
//       //   title: "Please select one address to proceed.",
//       //   className: "bg-red-500 text-white shadow-lg",
//       // })

//       return
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id,
//       cartItems: cartItems.items.map((singleCartItem) => ({
//         productId: singleCartItem?.productId,
//         title: singleCartItem?.title,
//         image: singleCartItem?.image,
//         price:
//           singleCartItem?.salePrice > 0
//             ? singleCartItem?.salePrice
//             : singleCartItem?.price,
//         quantity: singleCartItem?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paypal",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     }

//     dispatch(createNewOrder(orderData)).then((data) => {
//       console.log(data, "Vaibhav")
//       if (data?.payload?.success) {
//         setIsPaymemntStart(true)
//       } else {
//         setIsPaymemntStart(false)
//       }
//     })
//   }

//   if (approvalURL) {
//     window.location.href = approvalURL
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img src={img} className="h-full w-full object-cover object-center" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />
//         <div className="flex flex-col gap-4">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent key={item} cartItem={item} />
//               ))
//             : null}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">${totalCartAmount}</span>
//             </div>
//           </div>
//           <div className="mt-4 w-full">
//             {/* <Button
//            onClick={handleInitiatePaypalPayment}
//               className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
//             >
//               {isPaymentStart 
//                 ? "Processing Paypal Payment..."
//                 : "Checkout with Paypal"}
//             </Button> */}
//             <Button
//               onClick={handleInitiatePaypalPayment}
//               className={`w-full text-white py-2 px-4 rounded-md transition ${
//                 isPaymentStart
//                   ? "bg-green-500 hover:bg-green-600"
//                   : "bg-black hover:bg-gray-800"
//               }`}
//             >
//               {isPaymentStart
//                 ? "Processing Paypal Payment..."
//                 : "Checkout with Paypal"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ShoppingCheckout



import Address from "@/components/shopping-view/address"
import img from "../../assets/account.jpg"
import { useState } from "react"
import UserCartItemsContent from "@/components/shopping-view/cart-items-content"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createNewOrder } from "@/store/shop/order-slice"
import { XCircle } from "lucide-react"
import { motion } from "framer-motion"

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart)
  const { user } = useSelector((state) => state.auth)
  const { approvalURL } = useSelector((state) => state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymemntStart] = useState(false)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0
      function handleInitiatePaypalPayment() {
        if (cartItems.length === 0) {
          toast({
            title: (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2"
              >
                <XCircle className="text-green-500" size={20} />
                Your cart is empty. Please add items to proceed
              </motion.div>
            ),
            className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
       });
      return
    }
    if (currentSelectedAddress === null) {
      toast({
        title: (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <XCircle className="text-green-500" size={20} />
            Please select one address to proceed.
          </motion.div>
        ),
        className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
   });
      // toast({
      //   title: "Please select one address to proceed.",
      //   className: "bg-red-500 text-white shadow-lg",
      // })

      return
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    }

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "Vaibhav")
      if (data?.payload?.success) {
        setIsPaymemntStart(true)
      } else {
        setIsPaymemntStart(false)
      }
    })
  }
  if (approvalURL) {
    window.location.href = approvalURL
  }

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-52 sm:h-64 w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover" alt="Checkout" />
      </div>

      {/* Checkout Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-4 sm:p-6">
        {/* Address Section */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        {/* Cart & Payment Section */}
        <div className="flex flex-col gap-4">
          <div className="max-h-[50vh] overflow-y-auto space-y-4">
            {cartItems && cartItems.items && cartItems.items.length > 0 ? 
              cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
             : null (
              <p className="text-center text-gray-500">No items in cart.</p>
            )}
          </div>

          {/* Total Amount */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypalPayment}
              className={`w-full text-white py-2 px-4 rounded-md transition ${
                isPaymentStart
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout










































































// import Address from "@/components/shopping-view/address";
// import img from "../../assets/account.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { createNewOrder } from "@/store/shop/order-slice";
// import { useToast } from "@/hooks/use-toast";
// // import { Navigate } from "react-router-dom";

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymemntStart] = useState(false);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   console.log(currentSelectedAddress, "cartItems");

//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   function handleInitiatePaypalPayment() {
//     if (cartItems.length === 0) {
//       toast({
//         title: "Your cart is empty. Please add items to proceed",
//         variant: "destructive",
//       });

//       return;
//     }
//     if (currentSelectedAddress === null) {
//       toast({
//         title: "Please select one address to proceed.",
//         variant: "destructive",
//       });

//       return;
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id,
//       cartItems: cartItems.items.map((singleCartItem) => ({
//         productId: singleCartItem?.productId,
//         title: singleCartItem?.title,
//         image: singleCartItem?.image,
//         price:
//           singleCartItem?.salePrice > 0
//             ? singleCartItem?.salePrice
//             : singleCartItem?.price,
//         quantity: singleCartItem?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paypal",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     };

//     dispatch(createNewOrder(orderData)).then((data) => {
//       console.log(data, "sangam");
//       if (data?.payload?.success) {
//         setIsPaymemntStart(true);
//       } else {
//         setIsPaymemntStart(false);
//       }
//     });
//   }

//   if (approvalURL) {
//     window.location.href = approvalURL;
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img src={img} className="h-full w-full object-cover object-center" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />
//         <div className="flex flex-col gap-4">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent  key={item.id} cartItem={item} />
//               ))
//             : null}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">${totalCartAmount}</span>
//             </div>
//           </div>
//           <div className="mt-4 w-full">
//             <Button onClick={handleInitiatePaypalPayment} className="w-full">
//               {isPaymentStart
//                 ? "Processing Paypal Payment..."
//                 : "Checkout with Paypal"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;
