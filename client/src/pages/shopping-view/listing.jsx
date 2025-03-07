import ProductFilter from "@/components/shopping-view/filter"
import ProductDetailsDialog from "@/components/shopping-view/product-details"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { toast } from "@/hooks/use-toast"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu"
import { ArrowUpDownIcon, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

function createSearchParamsHelper(filterParams) {
  const queryParams = []

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",")

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  console.log(queryParams, "queryParams")

  return queryParams.join("&")
}

function ShoppingListing() {
  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  )

  const { user } = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { cartItems } = useSelector((state) => state.shopCart);

  const categorySearchParam = searchParams.get("category")

  function handleSort(value) {
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters }
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      }
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption)

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption)
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
    }
    setFilters(cpyFilters)
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters))
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId)
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  // function handleAddtoCart(getCurrentProductId, getTotalStock) {
  //   console.log(cartItems);
  //   let getCartItems = cartItems.items || [];

  //   if (getCartItems.length) {
  //     const indexOfCurrentItem = getCartItems.findIndex(
  //       (item) => item.productId === getCurrentProductId
  //     );
  //     if (indexOfCurrentItem > -1) {
  //       const getQuantity = getCartItems[indexOfCurrentItem].quantity;
  //       if (getQuantity + 1 > getTotalStock) {
  //         toast({
  //           title: `Only ${getQuantity} quantity can be added for this item`,
  //           className: "bg-red-500 text-white", // Manually apply styling
            
  //         });

  //         return;
  //       }
  //     }
  //   }

  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       quantity: 1,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user?.id));
  //       toast({
  //         title: "Product is added to cart",
  //         description: "You can check it in your cart.",
  //         className: "bg-white text-black shadow-lg",
  //         icon: <CheckCircle className="text-green-500" />, // Add an icon
  //       });
  //     }
  //   });
  // }
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
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
                className="flex flex-col gap-2 text-lg"
              >
                <div className="flex flex-row items-center gap-2">
                  <XCircle className="text-white" size={24} />
                  <span>Only {getQuantity} quantity can be added for this item</span>
                </div>
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="h-1 bg-white"
                />
              </motion.div>
            ),
            className:
              "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-3 right-5 sm:right-14 w-[90%] sm:w-[450px] max-w-[450px]",
            duration: 2000,
          });
  
          return;
        }
      }
    }
  
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
  
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
                <span>Product is added to cart</span>
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-1 bg-white"
              />
            </motion.div>
          ),
          className: "bg-green-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-5 right-5 sm:right-14 w-[90%] sm:w-[350px] max-w-[350px]",
          duration: 4000,
        });
      }
    });
  }
  

  

  useEffect(() => {
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, [categorySearchParam])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      )
  }, [dispatch, sort, filters])

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  // console.log(productDetails,"productDetails");
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-[1000]"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                      className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem, index) => (
              <ShoppingProductTile
                key={productItem.id || index}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No products available.
            </p>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}

export default ShoppingListing

// import ProductFilter from "@/components/shopping-view/filter";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Button } from "@/components/ui/button";
// import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
// } from "@radix-ui/react-dropdown-menu";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function ShoppingListing() {
//   const dispatch = useDispatch();
//   const { productList, isLoading, error } = useSelector(
//     (state) => state.shopProducts
//   );

//   useEffect(() => {
//     dispatch(fetchAllFilteredProducts());
//   }, [dispatch]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
//       <ProductFilter />
//       <div className="bg-background w-full rounded-lg shadow-sm">
//         <div className="p-4 border-b flex items-center justify-between">
//           <h2 className="text-lg font-extrabold">All Products</h2>
//           <div className="flex items-center gap-3">
//             <span className="text-muted-foreground">
//               {productList.length} Products
//             </span>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-1"
//                 >
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   <span>Sort by</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 align="end"
//                 className="w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-2"
//               >
//                 <DropdownMenuRadioGroup>
//                   {["Price Low-High", "Price High-Low"].map((sortItem, idx) => (
//                     <DropdownMenuRadioItem key={idx}>
//                       {sortItem}
//                     </DropdownMenuRadioItem>
//                   ))}
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {isLoading ? (
//             <p className="col-span-full text-center text-muted-foreground">
//               Loading products...
//             </p>
//           ) : error ? (
//             <p className="col-span-full text-center text-red-500">
//               {error}
//             </p>
//           ) : productList.length > 0 ? (
//             productList.map((productItem) => (
//               <ShoppingProductTile
//                 key={productItem.id}
//                 product={productItem}
//               />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-muted-foreground">
//               No products available.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingListing;
