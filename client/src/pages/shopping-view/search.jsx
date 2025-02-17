// import ProductDetailsDialog from "@/components/shopping-view/product-details"
// import ShoppingProductTile from "@/components/shopping-view/product-tile"
// import { Input } from "@/components/ui/input"
// import { useToast } from "@/hooks/use-toast"
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
// import { fetchProductDetails } from "@/store/shop/products-slice"
// import { 
//     getSearchResults, 
//     resetSearchResults,
// } from "@/store/shop/search-slice"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useSearchParams } from "react-router-dom"

// function SearchProducts() {
//   const [keyword, setKeyword] = useState("")
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
//   const [searchParams, setSearchParams] = useSearchParams()
//   const dispatch = useDispatch()
//   const { searchResults } = useSelector((state) => state.shopSearch)
//   const { productDetails } = useSelector((state) => state.shopProducts)

//   const { user } = useSelector((state) => state.auth)

//   const { cartItems } = useSelector((state) => state.shopCart)
//   const { toast } = useToast()
//   useEffect(() => {
//     if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
//       setTimeout(() => {
//         setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
//         dispatch(getSearchResults(keyword))
//       }, 1000)
//     } else {
//       setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
//       dispatch(resetSearchResults())
//     }
//   }, [keyword])

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     console.log(cartItems)
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
//             variant: "destructive",
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
//           title: "Product is added to cart!✅",
//           className: "bg-white text-black shadow-lg border border-gray-300",
//         })
//       }
//     })
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     console.log(getCurrentProductId)
//     dispatch(fetchProductDetails(getCurrentProductId))
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true)
//   }, [productDetails])

//   console.log(searchResults, "searchResults")

//   return (
//     <div className="container mx-auto md:px-6 px-4 py-8">
//       <div className="flex justify-center mb-8">
//         <div className="w-full flex items-center">
//           <Input
//             value={keyword}
//             name="keyword"
//             onChange={(event) => setKeyword(event.target.value)}
//             className="py-6"
//             placeholder="Search Products..."
//           />
//         </div>
//       </div>
//       {!searchResults.length ? (
//         <h1 className="text-5xl font-extrabold">No result found!</h1>
//       ) : null}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {searchResults.map((item) => (
//           <ShoppingProductTile
//             key={item}
//             handleAddtoCart={handleAddToCart}
//             product={item}
//             handleGetProductDetails={handleGetProductDetails}
//           />
//         ))}
//       </div>
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   )
// }

// export default SearchProducts


import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { X, Search, XCircle, CheckCircle } from "lucide-react";
import debounce from "lodash.debounce";
import { motion, AnimatePresence } from "framer-motion";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() !== "" && query.length > 3) {
        setLoading(true);
        setSearchParams(new URLSearchParams(`?keyword=${query}`));
        dispatch(getSearchResults(query)).finally(() => setLoading(false));
      } else {
        setSearchParams(new URLSearchParams(`?keyword=${query}`));
        dispatch(resetSearchResults());
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(keyword);
  }, [keyword, debouncedSearch]);

  function handleClearSearch() {
    setKeyword("");
    dispatch(resetSearchResults());
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
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
                `Only ${getQuantity} quantity can be added for this item`,
              </motion.div>
            ),
            className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
          })
          // toast({
          //   title: `Only ${getQuantity} quantity can be added for this item`,
          //   className: "bg-red-500 text-white shadow-lg",
          //   variant: "destructive",
          // });
          return;
        }
      }
    }
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
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
        // toast({
        //   title: "Product added to cart! ✅",
        //   className: "bg-white text-black shadow-lg border border-gray-300",
        // });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div className="flex justify-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="relative w-full max-w-xl">
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="py-6 pl-12 pr-12 text-lg rounded-full shadow-md" placeholder="Search for products..." />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {keyword && (
            <button onClick={handleClearSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <X className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {loading ? (
          <motion.div className="flex justify-center items-center h-64" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-gray-400"></div>
          </motion.div>
        ) : searchResults.length === 0 && keyword.length > 3 ? (
          <motion.h1 className="text-4xl font-extrabold text-center text-gray-600" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            No results found! ❌
          </motion.h1>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {searchResults.map((item) => (
              <motion.div key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ShoppingProductTile handleAddtoCart={handleAddToCart} product={item} handleGetProductDetails={handleGetProductDetails} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  );
}

export default SearchProducts;
