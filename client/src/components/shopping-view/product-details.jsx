"use client"

import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { setProductDetails } from "@/store/shop/products-slice"
import StarRatingComponent from "../common/star-rating"
import { useEffect, useState } from "react"
import { addReview, getReviews } from "@/store/shop/review-slice"
import { motion, AnimatePresence } from "framer-motion"

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("")
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart)
  const { reviews } = useSelector((state) => state.shopReview)
  const { toast } = useToast()

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating")
    setRating(getRating)
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems.items || []

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductId)
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            className: "bg-red-500 text-white shadow-lg",
          })

          return
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title: "Product is added to cart! ✅",
          className: "bg-white text-black shadow-lg border border-gray-300",
        })
      }
    })
  }

  function handleDialogClose() {
    setOpen(false)
    dispatch(setProductDetails())
    setRating(0)
    setReviewMsg("")
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data.payload.success) {
        setRating(0)
        setReviewMsg("")
        dispatch(getReviews(productDetails?._id))
        toast({
          title: "Review added successfully! ✅",
          className: "bg-white text-black shadow-lg",
        })
      }
    })
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id))
  }, [productDetails, dispatch])

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
      : 0

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="bg-white grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-2 grid grid-cols-2 gap-8"
            >
              <div className="relative overflow-hidden rounded-lg">
                <motion.img
                  src={productDetails?.image}
                  alt={productDetails?.title}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-contain"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div>
                <motion.h1
                  className="text-3xl font-extrabold"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {productDetails?.title}
                </motion.h1>
                <motion.p
                  className="text-muted-foreground text-2xl mb-5 mt-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {productDetails?.description}
                </motion.p>
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <p
                    className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}
                  >
                    ${productDetails?.price}
                  </p>
                  {productDetails?.salePrice > 0 ? (
                    <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p>
                  ) : null}
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 mt-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="flex items-center gap-0.5">
                    <StarRatingComponent rating={averageReview} />
                  </div>
                  <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
                </motion.div>

                <motion.div
                  className="mt-5 mb-5"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {productDetails?.totalStock === 0 ? (
                    <Button className="w-full bg-black text-white opacity-60 cursor-not-allowed">Out of Stock</Button>
                  ) : (
                    <Button
                      className="w-full bg-black text-white hover:bg-gray-800"
                      onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </motion.div>
                <div className="h-px bg-gray-300 w-full my-4" />
                <div className="max-h-[300px] overflow-auto">
                  <h2 className="text-xl font-bold mb-4">Reviews</h2>
                  <motion.div className="grid gap-6">
                    <AnimatePresence>
                      {reviews && reviews.length > 0 ? (
                        reviews.map((reviewItem, index) => (
                          <motion.div
                            key={reviewItem}
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Avatar className="w-10 h-10 border">
                              <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold">{reviewItem?.userName}</h3>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <StarRatingComponent
                                  className="w-3 h-5 text-yellow-500"
                                  rating={reviewItem?.reviewValue}
                                />
                              </div>
                              <p className="text-muted-foreground">{reviewItem.reviewMessage}</p>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          No Reviews
                        </motion.h1>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="mt-10 flex-col flex gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Label>Write a review</Label>
                    <div className="flex gap-1">
                      <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} interactive={true} />
                    </div>
                    <Input
                      name="reviewMsg"
                      value={reviewMsg}
                      onChange={(event) => setReviewMsg(event.target.value)}
                      placeholder="Write a review..."
                    />
                    <Button
                      className="bg-black text-white hover:bg-gray-800"
                      onClick={handleAddReview}
                      disabled={reviewMsg.trim() === ""}
                    >
                      Submit
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog










// import { Avatar, AvatarFallback } from "../ui/avatar"
// import { Button } from "../ui/button"
// import { Dialog, DialogContent } from "../ui/dialog"
// import { Label } from "../ui/label"
// import { Input } from "../ui/input"
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
// import { useDispatch, useSelector } from "react-redux"
// import { useToast } from "@/hooks/use-toast"
// import { setProductDetails } from "@/store/shop/products-slice"
// import StarRatingComponent from "../common/star-rating"
// import { useEffect, useState } from "react"
// import { addReview, getReviews } from "@/store/shop/review-slice"
// import { motion, AnimatePresence } from "framer-motion"
// // import { Separator } from "../ui/separator"

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const [reviewMsg, setReviewMsg] = useState("")
//   const [rating, setRating] = useState(0)
//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.auth)
//   const { cartItems } = useSelector((state) => state.shopCart)
//   const { reviews } = useSelector((state) => state.shopReview)
//   const { toast } = useToast()

//   function handleRatingChange(getRating) {
//     console.log(getRating, "getRating")

//     setRating(getRating)
//   }

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     let getCartItems = cartItems.items || []

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       )
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity
//         if (getQuantity + 1 > getTotalStock) {
//           toast({
//             title: `Only ${getQuantity} quantity can be added for this item`,
//             className: "bg-red-500 text-white shadow-lg",
//           })

//           return
//         }
//       }
//     }
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id))
//         toast({
//           title: "Product is added to cart",
//           className: "bg-white text-black shadow-lg border border-gray-300",
//         })
//       }
//     })
//   }

//   function handleDialogClose() {
//     setOpen(false)
//     dispatch(setProductDetails())
//     setRating(0)
//     setReviewMsg("")
//   }

//   function handleAddReview() {
//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewMessage: reviewMsg,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0)
//         setReviewMsg("")
//         dispatch(getReviews(productDetails?._id))
//         toast({
//           title: "Review added successfully!",
//         })
//       }
//     })
//   }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id))
//   }, [productDetails])

//   console.log(reviews, "reviews")

//   const averageReview =
//     reviews && reviews.length > 0
//       ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//         reviews.length
//       : 0

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="bg-white grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
//         <div className="relative overflow-hidden rounded-lg">
//           <img
//             src={productDetails?.image}
//             alt={productDetails?.title}
//             width={600}
//             height={600}
//             className="aspect-square w-full object-cover"
//           />
//         </div>
//         <div className=" ">
//           <div>
//             <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
//             <p className="text-muted-foreground text-2xl mb-5 mt-4">
//               {productDetails?.description}
//             </p>
//           </div>
//           <div className="flex items-center justify-between">
//             <p
//               className={`text-3xl font-bold text-primary ${
//                 productDetails?.salePrice > 0 ? "line-through" : ""
//               }`}
//             >
//               ${productDetails?.price}
//             </p>
//             {productDetails?.salePrice > 0 ? (
//               <p className="text-2xl font-bold text-muted-foreground">
//                 ${productDetails?.salePrice}
//               </p>
//             ) : null}
//           </div>

//           <div className="flex items-center gap-2 mt-2">
//             <div className="flex items-center gap-0.5">
//               {/* <StarIcon className="w-3 h-5 text-yellow-500" /> */}
//               {/* <StarIcon className="w-3 h-5 text-yellow-500" />
//                     <StarIcon className="w-3 h-5 text-yellow-500" />
//                     <StarIcon className="w-3 h-5 text-yellow-500" />
//                     <StarIcon className="w-3 h-5 text-yellow-500" /> */}
//               <StarRatingComponent rating={averageReview} />
//             </div>
//             <span className="text-muted-foreground">
//               {/* (4.5) */}({averageReview.toFixed(2)})
//             </span>
//           </div>

//           <div className="mt-5 mb-5">
//             {productDetails?.totalStock === 0 ? (
//               <Button className="w-full bg-black text-white opacity-60 cursor-not-allowed">
//                 Out of Stock
//               </Button>
//             ) : (
//               <Button
//                 className="w-full bg-black text-white hover:bg-gray-800"
//                 onClick={() =>
//                   handleAddToCart(
//                     productDetails?._id,
//                     productDetails?.totalStock
//                   )
//                 }
//               >
//                 Add to Cart
//               </Button>
//             )}
//           </div>
//           <div className="h-px bg-gray-300 w-full my-4" />
//           <div className="max-h-[300px] overflow-auto">
//             <h2 className="text-xl font-bold mb-4">Reviews</h2>
//             <div className="grid gap-6">
//               {reviews && reviews.length > 0 ? (
//                 reviews.map((reviewItem) => (
//                   <div key={reviewItem} className="flex gap-4">
//                     <Avatar className="w-10 h-10 border">
//                       <AvatarFallback>
//                         {/* {" "}
//                     VN */}
//                         {reviewItem?.userName[0].toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="grid gap-1">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-bold">{reviewItem?.userName}</h3>
//                         {/* <h3 className="font-bold">Vaibhav </h3> */}
//                       </div>
//                       <div className="flex items-center gap-0.5">
//                         <StarRatingComponent
//                           className="w-3 h-5 text-yellow-500"
//                           rating={reviewItem?.reviewValue}
//                         />
//                       </div>
//                       <p className="text-muted-foreground">
//                         {reviewItem.reviewMessage}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <h1>No Reviews</h1>
//               )}
//             </div>

//             <div className="mt-10 flex-col flex gap-2">
//               <Label>Write a review</Label>
//               <div className="flex gap-1">
//                 <StarRatingComponent
//                   rating={rating}
//                   handleRatingChange={handleRatingChange}
//                 />
//               </div>
//               <Input
//                 name="reviewMsg"
//                 value={reviewMsg}
//                 onChange={(event) => setReviewMsg(event.target.value)}
//                 placeholder="Write a review..."
//               />
//               <Button
//                 className="bg-black text-white hover:bg-gray-800"
//                 onClick={handleAddReview}
//                 disabled={reviewMsg.trim() === ""}
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default ProductDetailsDialog

