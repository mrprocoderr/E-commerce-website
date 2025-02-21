import { CheckCircle, Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice"
import { useToast } from "../../hooks/use-toast"
import { XCircle } from "lucide-react"
import { motion } from "framer-motion"

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart)
  const { productList } = useSelector((state) => state.shopProducts)
  const dispatch = useDispatch()
  const { toast } = useToast()

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || []

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        )

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        )
        const getTotalStock = productList[getCurrentProductIndex].totalStock

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock")

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col gap-2 text-lg"
                >
                  <div className="flex flex-row items-center gap-2">
                    <XCircle className="text-white" size={24} />
               Only {getQuantity} quantity can be added for this item,
                  </div>
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="h-1 bg-white"
                  />
                </motion.div>
              ),
              className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-3 right-5 sm:right-14 w-[90%] sm:w-[450px] max-w-[450px]",
              duration: 2000,
            });
            return
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {

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
                <span>Cart item is updated successfully</span>
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-1 bg-white"
              />
            </motion.div>
          ),
          className: "bg-green-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-5 right-5 sm:right-14 w-[90%] sm:w-[400px] max-w-[400px]",
          duration: 4000,
        });

      }
    })
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
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
                <span>Cart item is deleted successfully</span>
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-1 bg-white"
              />
            </motion.div>
          ),
          className: "bg-green-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-5 right-5 sm:right-14 w-[90%] sm:w-[400px] max-w-[400px]",
          duration: 4000,
        });
       
      }
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          Rs.
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  )
}

export default UserCartItemsContent
