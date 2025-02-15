// import ProductImageUpload from "@/components/admin-view/image-upload";
// import { Button } from "@/components/ui/button";
// import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function AdminDashboard() {
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const dispatch = useDispatch();
//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   console.log(uploadedImageUrl, "uploadedImageUrl");

//   function handleUploadFeatureImage() {
//     dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(getFeatureImages());
//         setImageFile(null);
//         setUploadedImageUrl("");
//       }
//     });
//   }

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   console.log(featureImageList, "featureImageList");

//   return (
//     <div>
//       <ProductImageUpload
//         imageFile={imageFile}
//         setImageFile={setImageFile}
//         uploadedImageUrl={uploadedImageUrl}
//         setUploadedImageUrl={setUploadedImageUrl}
//         setImageLoadingState={setImageLoadingState}
//         imageLoadingState={imageLoadingState}
//         isCustomStyling={true}
//         // isEditMode={currentEditedId !== null}
//       />
//       <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
//         Upload
//       </Button>
//       <div className="flex flex-col gap-4 mt-5">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((featureImgItem) => (
//               <div key={featureImgItem} className="relative">
//                 <img
//                   src={featureImgItem.image}
//                   className="w-full h-[300px] object-cover rounded-t-lg"
//                 />
//               </div>
//             ))
//           : null}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import ProductImageUpload from "@/components/admin-view/image-upload"
import { Button } from "@/components/ui/button"
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch()
  const { featureImageList } = useSelector((state) => state.commonFeature)

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedImageUrl("")
      }
    })
  }

  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then(() => {
      dispatch(getFeatureImages())
    })
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      {/* Centered and Reduced Width Upload Button */}
      <div className="flex justify-center mt-5">
        <Button
          onClick={handleUploadFeatureImage}
          className="px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-md"
        >
          Upload
        </Button>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList?.length > 0 &&
          featureImageList.map((featureImgItem) => (
            <div key={featureImgItem._id} className="relative">
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              {/* Centered and Reduced Width Delete Button */}
              <div className="flex justify-center mt-2">
                <Button
                  onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                  className="px-6 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AdminDashboard


// import ProductImageUpload from "@/components/admin-view/image-upload";
// import { Button } from "@/components/ui/button";
// import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "framer-motion";

// function AdminDashboard() {
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const dispatch = useDispatch();
//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   function handleUploadFeatureImage() {
//     dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(getFeatureImages());
//         setImageFile(null);
//         setUploadedImageUrl("");
//       }
//     });
//   }

//   function handleDeleteFeatureImage(imageId) {
//     dispatch(deleteFeatureImage(imageId)).then(() => {
//       dispatch(getFeatureImages());
//     });
//   }

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen rounded-lg shadow-md">
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <ProductImageUpload
//           imageFile={imageFile}
//           setImageFile={setImageFile}
//           uploadedImageUrl={uploadedImageUrl}
//           setUploadedImageUrl={setUploadedImageUrl}
//           setImageLoadingState={setImageLoadingState}
//           imageLoadingState={imageLoadingState}
//           isCustomStyling={true}
//         />
//       </motion.div>

//       <motion.div
//         className="flex justify-center mt-4 pb-4"
//         whileHover={{ scale: 1.05 }}
//       >
//         <Button onClick={handleUploadFeatureImage} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all">
//           Upload
//         </Button>
//       </motion.div>

//       <div className="flex flex-col gap-4 mt-5">
//         {featureImageList?.length > 0 &&
//           featureImageList.map((featureImgItem) => (
//             <motion.div
//               key={featureImgItem._id}
//               className="relative bg-white rounded-lg shadow-md overflow-hidden"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <img
//                 src={featureImgItem.image}
//                 className="w-full h-[300px] object-cover rounded-t-lg"
//               />
//               <motion.div className="flex justify-center pb-4" whileHover={{ scale: 1.05 }}>
//                 <Button
//                   onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
//                   className="w-[80px] mt-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all"
//                 >
//                   Delete
//                 </Button>
//               </motion.div>
//             </motion.div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
