// import { Button } from "@/components/ui/button"
// import bannerOne from "../../assets/banner-1.webp"
// import bannerTwo from "../../assets/banner-2.webp"
// import bannerThree from "../../assets/banner-3.webp"
// import {
//   Airplay,
//   BabyIcon,
//   CheckCircle,
//   ChevronLeftIcon,
//   // ChevronRight,
//   ChevronRightIcon,
//   // CloudLightning,
//   Footprints,
//   Gitlab,
//   Heater,
//   Images,
//   Shirt,
//   ShirtIcon,
//   ShoppingBasket,
//   // UmbrellaIcon,
//   WashingMachine,
//   WatchIcon,
//   XCircle,
// } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice"
// import ShoppingProductTile from "@/components/shopping-view/product-tile"
// import { useNavigate } from "react-router-dom"
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
// import ProductDetailsDialog from "@/components/shopping-view/product-details"
// import { getFeatureImages } from "@/store/common-slice"
// import { useToast } from "@/hooks/use-toast"
// import { motion } from "framer-motion"

// const categoriesWithIcon = [
//   { id: "men", label: "Men", icon: ShirtIcon },
//   { id: "women", label: "Women", icon: Gitlab },
//   // { id: "women", label: "Women", icon: CloudLightning },
//   { id: "kids", label: "Kids", icon: BabyIcon },
//   { id: "accessories", label: "Accessories", icon: WatchIcon },
//   { id: "footwear", label: "Footwear", icon: Footprints },
//   // { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
// ]

// const brandsWithIcon = [
//   { id: "nike", label: "Nike", icon: Shirt },
//   { id: "adidas", label: "Adidas", icon: WashingMachine },
//   { id: "puma", label: "Puma", icon: ShoppingBasket },
//   { id: "levi", label: "Levi's", icon: Airplay },
//   { id: "zara", label: "Zara", icon: Images },
//   { id: "h&m", label: "H&M", icon: Heater },
// ]
// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   )
//   const { featureImageList } = useSelector((state) => state.commonFeature)

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

//   const { user } = useSelector((state) => state.auth)
//   const { cartItems } = useSelector((state) => state.shopCart)

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { toast } = useToast()

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters")
//     const currentFilter = {
//       [section]: [getCurrentItem.id],
//     }

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter))
//     navigate(`/shop/listing`)
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId))
//   }

//   function handleAddtoCart(getCurrentProductId, getTotalStock) {
//     let getCartItems = cartItems.items || []

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       )
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity
//         if (getQuantity + 1 > getTotalStock) {
//           toast({
//             title: (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="flex items-center gap-2"
//               >
//                 <XCircle className="text-green-500" size={20} />
//                 `Only ${getQuantity} quantity can be added for this item`,
//               </motion.div>
//             ),
//             className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
//           })
//           // toast({
//           //   title: `Only ${getQuantity} quantity can be added for this item`,
//           //   className: "bg-red-500 text-white shadow-lg",
//           //   variant: "destructive",
//           // });

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
//           title: (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               className="flex items-center gap-2"
//             >
//               <CheckCircle className="text-green-500" size={20} />
//               Product is added to cart!
//             </motion.div>
//           ),
//           className: "bg-white text-black shadow-lg px-4 py-2 rounded-lg",
//         })
//         // toast({
//         //   title: "Product is added to cart ✅",
//         //   className: "bg-white text-black shadow-lg",
//         // });
//       }
//     })
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true)
//   }, [productDetails])

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
//     }, 15000)

//     return () => clearInterval(timer)
//   }, [featureImageList])

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     )
//   }, [dispatch])

//   console.log(productList, "productList")

//   useEffect(() => {
//     dispatch(getFeatureImages())
//   }, [dispatch])

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* <div className="absolute top-1/2 left-12 z-20 -translate-y-1/2 max-w-xl">
//   <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black via-gray-800 to-black text-transparent bg-clip-text">
//     We Picked Every Item With Care, 
//     <span className="text-6xl block mt-2">You Must Try</span>
//     <span className="text-4xl block mt-2">At Least Once.</span>
//   </h1>
//   <p className="text-lg mb-6 text-black">
//     Explore our exclusive collection, crafted with precision and passion to bring you the best.
//   </p>
//   <Button asChild className="text-lg px-8 py-6 bg-black text-white hover:bg-black/90">
//     <Link href="/collection">
//       Go To Collection
//       <ChevronRight className="ml-2 h-5 w-5" />
//     </Link>
//   </Button>
// </div> */}

//       {/* <div className="relative w-full h-[750px] overflow-hidden">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//               <img
//                 src={slide?.image}
//                 key={index}
//                 className={`${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//               />
//             ))
//           : null}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) =>
//                 (prevSlide - 1 + featureImageList.length) %
//                 featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronLeftIcon className="w-4 h-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronRightIcon className="w-4 h-4" />
//         </Button>
//       </div> */}

//       <div className="relative w-full h-[400px] md:h-[750px] overflow-hidden">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//               <img
//                 src={slide?.image}
//                 key={index}
//                 className={`${
//                   index === currentSlide
//                     ? "opacity-100 block"
//                     : "opacity-0 hidden"
//                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//               />
//             ))
//           : null}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) =>
//                 (prevSlide - 1 + featureImageList.length) %
//                 featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-4 sm:left-2 transform -translate-y-1/2 bg-white/80 p-2 sm:p-1"
//         >
//           <ChevronLeftIcon className="w-5 h-5 sm:w-4 sm:h-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 right-4 sm:right-2 transform -translate-y-1/2 bg-white/80 p-2 sm:p-1"
//         >
//           <ChevronRightIcon className="w-5 h-5 sm:w-4 sm:h-4" />
//         </Button>
//       </div>
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Shop by category
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {categoriesWithIcon.map((categoryItem) => (
//               <Card
//                 key={categoryItem}
//                 onClick={() =>
//                   handleNavigateToListingPage(categoryItem, "category")
//                 }
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{categoryItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {brandsWithIcon.map((brandItem) => (
//               <Card
//                 key={brandItem}
//                 onClick={() => handleNavigateToListingPage(brandItem, "brand")}
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{brandItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Feature Products
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <ShoppingProductTile
//                     key={productItem}
//                     handleGetProductDetails={handleGetProductDetails}
//                     product={productItem}
//                     handleAddtoCart={handleAddtoCart}
//                   />
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   )
// }

// export default ShoppingHome


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  Airplay,
  BabyIcon,
  CheckCircle,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  Gitlab,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  WashingMachine,
  WatchIcon,
  XCircle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { getFeatureImages } from "@/store/common-slice"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import ProductDetailsDialog from "@/components/shopping-view/product-details"

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: Gitlab },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
]

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
]

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { productList, productDetails } = useSelector((state) => state.shopProducts)
  const { featureImageList } = useSelector((state) => state.commonFeature)
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters")
    const currentFilter = {
      [section]: [getCurrentItem.id],
    }
    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems.items || []

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductId)
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2"
              >
                <XCircle className="text-green-500" size={20} />
                {`Only ${getQuantity} quantity can be added for this item`}
              </motion.div>
            ),
            className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
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
          title: (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="text-green-500" size={20} />
              Product is added to cart!
            </motion.div>
          ),
          className: "bg-white text-black shadow-lg px-4 py-2 rounded-lg",
        })
      }
    })
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
    }, 15000)
    return () => clearInterval(timer)
  }, [featureImageList])

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    )
    dispatch(getFeatureImages())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="relative w-full h-[400px] md:h-[750px] overflow-hidden"> */}
      <div className="relative w-full min-h-[200px] sm:min-h-[400px] md:h-[750px] overflow-hidden">
        <AnimatePresence>
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((slide, index) => (
                <motion.img
                  key={index}
                  src={slide?.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              ))
            : null}
        </AnimatePresence>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)
          }
          className="absolute top-1/2 left-4 sm:left-2 transform -translate-y-1/2 bg-white/80 p-2 sm:p-1"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-4 sm:h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
          className="absolute top-1/2 right-4 sm:right-2 transform -translate-y-1/2 bg-white/80 p-2 sm:p-1"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-4 sm:h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem, index) => (
              <motion.div
                key={categoryItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem, index) => (
              <motion.div
                key={brandItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{brandItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <motion.div
                    key={productItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </motion.div>
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingHome