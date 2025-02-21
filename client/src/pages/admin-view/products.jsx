// /* eslint-disable react/jsx-key */
// import ProductImageUpload from "@/components/admin-view/image-upload"
// import CommonForm from "@/components/common/form"
// import { Button } from "@/components/ui/button"
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet"
// import { addProductFormElements } from "@/config"
// import { useToast } from "@/hooks/use-toast"
// import { Fragment, useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice"
// import AdminProductTile from "@/components/admin-view/product-tile"

// const initialFormData = {
//   image: null,
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
//   averageReview: 0,
// }

// function AdminProducts() {
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
//     useState(false)

//   const [formData, setFormData] = useState(initialFormData)
//   const [imageFile, setImageFile] = useState(null)
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("")
//   const [imageLoadingState, setImageLoadingState] = useState(false)
//   const [currentEditedId, setCurrentEditedId] = useState(null);

//   const { productList } = useSelector((state) => state.adminProducts)
//   const dispatch = useDispatch()
//   const { toast } = useToast()

//   function onSubmit(event) {
//     event.preventDefault();
//     currentEditedId !== null
//     ? dispatch(
//         editProduct({
//           id: currentEditedId,
//           formData,
//         })
//       ).then((data) => {
//         console.log(data, "edit");

//         if (data?.payload?.success) {
//           dispatch(fetchAllProducts());
//           setFormData(initialFormData);
//           setOpenCreateProductsDialog(false);
//           setCurrentEditedId(null);
//         }
//       })
//     :dispatch(
//       addNewProduct({
//         ...formData,
//         image: uploadedImageUrl,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts())
//         setOpenCreateProductsDialog(false)
//         setImageFile(null)
//         setFormData(initialFormData)
//         toast({
//           title: "Product add successfully ✅",
//         })
//       }
//     })
//   }
   
//   function handleDelete(getCurrentProductId) {
//     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts());
//       }
//     });
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .filter((currentKey) => currentKey !== "averageReview")
//       .map((key) => formData[key] !== "")
//       .every((item) => item);
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts())
//   }, [dispatch])

//   console.log(formData, "productList")
//   return (
//     <Fragment>
//       {/* Header Section with "Add New Product" Button */}
//       <div className="mb-5 flex justify-end">
//         <Button
//           onClick={() => setOpenCreateProductsDialog(true)}
//           className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md shadow-md transition duration-200 ease-in-out"
//         >
//           Add New Product
//         </Button>
//       </div>

//       {/* Grid Section for Products */}
//       <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {/* Sheet for Adding New Product */}
//         {productList && productList.length > 0
//           ? productList.map((productItem) => (
//             <AdminProductTile
//             setFormData={setFormData}
//             setOpenCreateProductsDialog={setOpenCreateProductsDialog}
//             setCurrentEditedId={setCurrentEditedId}
//             product={productItem}
//             handleDelete={handleDelete}
//           />
//             ))
//           : null}
//       </div>
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={() => {
//           setOpenCreateProductsDialog(false)
//           setCurrentEditedId(null);
//           setFormData(initialFormData);
//         }}
//       >
//         <SheetContent
//           side="right"
//           className="overflow-auto bg-white shadow-lg rounded-lg p-5 md:w-1/3 lg:w-1/4"
//         >
//           <SheetHeader>
//             <SheetTitle className="text-xl font-semibold text-gray-800">
//             {currentEditedId !== null ? "Edit Product" : "Add New Product"}
//             </SheetTitle>
//             <ProductImageUpload
//               imageFile={imageFile}
//               setImageFile={setImageFile}
//               uploadedImageUrl={uploadedImageUrl}
//               setUploadedImageUrl={setUploadedImageUrl}
//               setImageLoadingState={setImageLoadingState}
//               imageLoadingState={imageLoadingState}
//               isEditMode={currentEditedId !== null}
//             />
//           </SheetHeader>
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addProductFormElements}
//               isBtnDisabled={!isFormValid()}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   )
// }

// export default AdminProducts



/* eslint-disable react/jsx-key */

import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
import { CheckCircle, PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import AdminProductTile from "@/components/admin-view/product-tile";
import { motion } from "framer-motion";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
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
                    <span>Product added successfully</span>
                  </div>
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-1 bg-white"
                  />
                </motion.div>
              ),
              className: "bg-green-500 text-white shadow-lg px-4 py-2 rounded-lg fixed bottom-5 w-[320px]",
              duration: 4000,
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {/* Header Section with "Add New Product" Button */}
      <div className="mb-5 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-black text-white hover:bg-gray-800 px-5 py-2 flex items-center gap-2 rounded-md shadow-md transition duration-200 ease-in-out"
        >
          <PlusCircle size={20} />
          Add New Product
        </motion.button>
      </div>

      {/* Grid Section for Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <motion.div
                key={productItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AdminProductTile
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  product={productItem}
                  handleDelete={handleDelete}
                />
              </motion.div>
            ))
          : null}
      </motion.div>

      {/* Sheet for Adding New Product */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto bg-white shadow-lg rounded-lg p-5 md:w-1/3 lg:w-1/4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold text-gray-800">
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </SheetTitle>
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />
            </SheetHeader>
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                formControls={addProductFormElements}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
