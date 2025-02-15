// import { Card, CardContent, CardFooter } from "../ui/card"
// import { Button } from "../ui/button"
// import { brandOptionsMap, categoryOptionsMap } from "@/config"
// import { Badge } from "../ui/badge"

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
// }) {
//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div onClick={() => handleGetProductDetails(product?._id)}>
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
//               Sale
//             </Badge>
//           ) : null}
//         </div>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-[16px] text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-semibold text-primary">
//                 ${product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>
//       <CardFooter>
//         {product?.totalStock === 0 ? (
//           <Button className="w-full bg-gray-400 text-white opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//             className="w-full bg-black text-white"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }

// export default ShoppingProductTile

"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { brandOptionsMap, categoryOptionsMap } from "@/config"

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate discount percentage
  const discountPercentage =
    product?.salePrice > 0
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0

  return (
    <Card
      className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group cursor-pointer relative"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-0 right-0 bg-green-500 text-white p-1 z-10 rounded-bl-lg">
            <span className="text-sm font-bold">{discountPercentage}% OFF</span>
          </div>
        )}

        <div className="relative overflow-hidden">
          {/* Product Image */}
          <img
            src={product?.image || "/placeholder.svg"}
            alt={product?.title || "Product Image"}
            // className={`w-full h-[320px] object-cover transition-transform duration-300 ease-in-out ${
            className={`w-full h-[300px] object-contain transition-transform duration-300 ease-in-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Stock & Sale Badges */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-red-600 text-white">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:bg-red-600">
              <span className="hidden group-hover:inline">
                🔥 Limited Time Offer! 🔥
              </span>
              <span className="group-hover:hidden">Sale 🎉</span>
            </Badge>
          ) : null}

          {/* Hover Overlay with Product Details */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-white text-center p-4">
              <h2 className="text-2xl font-bold mb-2">{product?.title}</h2>
              <div className="flex justify-center items-center space-x-2">
                <span
                  className={`${
                    product?.salePrice > 0 ? "line-through text-gray-300" : ""
                  } text-sm font-medium`}
                >
                  Rs {product?.price}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-lg font-bold text-green-400">
                    Rs {product?.salePrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Card */}
        <CardContent className="p-4 bg-white">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through text-gray-500" : "text-green-600"
                } text-base font-semibold`}
              >
                Rs {product?.price}
              </span>
              {product?.salePrice > 0 && (
                <span className="text-base font-semibold text-green-600 ml-2">
                  Rs {product?.salePrice}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="text-green-600 font-medium text-sm">
                Save {discountPercentage}%
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* <CardFooter className="bg-gray-100"> */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-gray-400 text-white opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ShoppingProductTile






// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Shield, Star } from 'lucide-react'
// import { brandOptionsMap, categoryOptionsMap } from "@/config"

// // Interactive Star Rating Component
// function StarRatingComponent({ rating = 0, handleRatingChange, interactive = false }) {
//   return (
//     <div className="flex gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Button
//           key={star}
//           className={`p-2 rounded-full transition-colors ${
//             star <= rating
//               ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
//               : "bg-gray-100 hover:bg-gray-200"
//           }`}
//           size="icon"
//           onClick={() => interactive && handleRatingChange?.(star)}
//           disabled={!interactive}
//           aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
//         >
//           <Star
//             className={`w-6 h-6 ${
//               star <= rating ? "fill-yellow-500" : "fill-black"
//             }`}
//           />
//         </Button>
//       ))}
//     </div>
//   )
// }

// // Flipkart-style Rating Display
// function RatingDisplay({ rating = 0, totalRatings = 0, isAssured = true }) {
//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex items-center">
//         <Badge variant="secondary" className="bg-green-600 text-white hover:bg-green-600">
//           <span className="font-medium">{rating.toFixed(1)}</span>
//           <Star className="w-3 h-3 ml-0.5 fill-current" />
//         </Badge>
//       </div>
      
//       <span className="text-sm text-muted-foreground">
//         ({totalRatings.toLocaleString()})
//       </span>

//       {isAssured && (
//         <div className="flex items-center">
//           <Shield className="w-4 h-4 text-blue-500" />
//           <span className="text-sm font-medium text-blue-500">Assured</span>
//         </div>
//       )}
//     </div>
//   )
// }

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
//   handleRatingChange,
//   showInteractiveRating = false
// }) {
//   const [isHovered, setIsHovered] = useState(false)

//   // Calculate discount percentage
//   const discountPercentage =
//     product?.salePrice > 0
//       ? Math.round(((product.price - product.salePrice) / product.price) * 100)
//       : 0

//   return (
//     <Card
//       className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         className="group cursor-pointer relative"
//         onClick={() => handleGetProductDetails(product?._id)}
//       >
//         {/* Discount Badge */}
//         {discountPercentage > 0 && (
//           <div className="absolute top-0 right-0 bg-green-500 text-white p-2 z-10 rounded-bl-lg">
//             <span className="text-sm font-bold">{discountPercentage}% OFF</span>
//           </div>
//         )}

//         <div className="relative overflow-hidden">
//           {/* Product Image */}
//           <img
//             src={product?.image || "/placeholder.svg"}
//             alt={product?.title || "Product Image"}
//             className={`w-full h-[300px] object-cover transition-transform duration-300 ease-in-out ${
//               isHovered ? "scale-110" : "scale-100"
//             }`}
//           />

//           {/* Stock & Sale Badges */}
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-red-600 text-white">
//               {`Only ${product?.totalStock} left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-green-500 text-white transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:bg-red-600">
//               <span className="hidden group-hover:inline">
//                 🔥 Limited Time Offer! 🔥
//               </span>
//               <span className="group-hover:hidden">Sale</span>
//             </Badge>
//           ) : null}

//           {/* Hover Overlay with Product Details */}
//           <div
//             className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
//               isHovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div className="text-white text-center p-4">
//               <h2 className="text-2xl font-bold mb-2">{product?.title}</h2>
//               <div className="flex justify-center items-center space-x-2">
//                 <span
//                   className={`${
//                     product?.salePrice > 0 ? "line-through text-gray-300" : ""
//                   } text-sm font-medium`}
//                 >
//                   Rs {product?.price}
//                 </span>
//                 {product?.salePrice > 0 && (
//                   <span className="text-lg font-bold text-green-400">
//                     Rs {product?.salePrice}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Card */}
//         <CardContent className="p-4 bg-white">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          
//           {/* Rating Display */}
//           <div className="mb-2">
//             {showInteractiveRating ? (
//               <StarRatingComponent 
//                 rating={product?.rating || 0}
//                 handleRatingChange={(rating) => handleRatingChange?.(product?._id, rating)}
//                 interactive={true}
//               />
//             ) : (
//               <RatingDisplay 
//                 rating={product?.rating || 4.1} 
//                 totalRatings={product?.totalRatings || 683784}
//                 isAssured={product?.isAssured !== false}
//               />
//             )}
//           </div>

//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-[16px] text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <div>
//               <span
//                 className={`${
//                   product?.salePrice > 0 ? "line-through text-gray-500" : ""
//                 } text-base font-semibold`}
//               >
//                 Rs {product?.price}
//               </span>
//               {product?.salePrice > 0 && (
//                 <span className="text-base font-semibold text-green-600 ml-2">
//                   Rs {product?.salePrice}
//                 </span>
//               )}
//             </div>
//             {discountPercentage > 0 && (
//               <span className="text-green-600 font-medium text-sm">
//                 Save {discountPercentage}%
//               </span>
//             )}
//           </div>
//         </CardContent>
//       </div>

//       <CardFooter className="bg-gray-100">
//         {product?.totalStock === 0 ? (
//           <Button className="w-full bg-gray-400 text-white opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//             className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }

// export default ShoppingProductTile








































// "use client"

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { motion, AnimatePresence } from "framer-motion";

// function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const images = product?.images?.length ? product.images : ["/placeholder.svg"];

//   useEffect(() => {
//     if (images.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [images.length]);

//   return (
//     <Card
//       className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div onClick={() => handleGetProductDetails(product?._id)}>
//         <div className="relative overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.img
//               key={currentImageIndex}
//               src={product?.image || "/placeholder.svg"}
//               alt={product?.title}
//               className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />
//           </AnimatePresence>
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 text-white">Out Of Stock</Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
//               {`Only ${product?.totalStock} left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-green-500 text-white">Sale</Badge>
//           ) : null}
//         </div>
//         <CardContent className="p-4 bg-white">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
//             <span className="text-[16px] text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
//               Rs {product?.price}
//             </span>
//             {product?.salePrice > 0 && (
//               <span className="text-lg font-semibold text-red-500">Rs {product?.salePrice}</span>
//             )}
//           </div>
//         </CardContent>
//       </div>
//       <CardFooter className="bg-gray-100">
//         {product?.totalStock === 0 ? (
//           <Button className="w-full bg-gray-400 text-white opacity-60 cursor-not-allowed">Out Of Stock</Button>
//         ) : (
//           <Button
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//             className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;
