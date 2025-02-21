// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";

// function UserCartWrapper({ cartItems, setOpenCartSheet }) {
//   const navigate = useNavigate();

//   const totalCartAmount =
//     cartItems?.length > 0
//       ? cartItems.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   return (
//     <SheetContent className="sm:max-w-md w-full bg-white p-4 sm:p-6 dark:bg-white">
//       <SheetHeader>
//         <SheetTitle className="text-lg sm:text-xl">Your Cart</SheetTitle>
//       </SheetHeader>

//       {/* Cart Items Section */}
//       <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
//         {cartItems?.length > 0 ? (
//           cartItems.map((item) => (
//             <UserCartItemsContent key={item.id} cartItem={item} />
//           ))
//         ) : (
//           <p className="text-center text-gray-500">Your cart is empty.</p>
//         )}
//       </div>

//       {/* Total & Checkout Button */}
//       <div className="mt-6 space-y-4">
//         <div className="flex justify-between text-base sm:text-lg font-semibold">
//           <span>Total</span>
//           <span>Rs.{totalCartAmount.toFixed(2)}</span>
//         </div>

//         <Button
//           onClick={() => {
//             navigate("/shop/checkout");
//             setOpenCartSheet(false);
//           }}
//           className="w-full mt-4 bg-black text-white hover:bg-gray-800 py-3 text-sm sm:text-base"
//         >
//           Checkout
//         </Button>
//       </div>
//     </SheetContent>
//   );
// }

// export default UserCartWrapper;


import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import EmptyCartImage from "../../assets/pngwing.png"; // Make sure you have this image in your assets

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems?.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md w-full bg-white p-4 sm:p-6 dark:bg-white">
      <SheetHeader>
        <SheetTitle className="text-lg sm:text-xl">Your Cart</SheetTitle>
      </SheetHeader>

      {/* Cart Items Section */}
      <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
        {cartItems?.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} />
          ))
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={EmptyCartImage}
              alt="Empty Cart"
              className="w-32 h-32 object-contain"
            />
            <p className="text-center text-gray-500 mt-2">Your cart is empty.</p>
          </div>
        )}
      </div>

      {/* Total & Checkout Button */}
      {cartItems?.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-base sm:text-lg font-semibold">
            <span>Total</span>
            <span>Rs.{totalCartAmount.toFixed(2)}</span>
          </div>

          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full mt-4 bg-black text-white hover:bg-gray-800 py-3 text-sm sm:text-base"
          >
            Checkout
          </Button>
        </div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
