import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import CommonForm from "../common/form"
import { useEffect, useState } from "react"
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { addressFormControls } from "@/config"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import AddressCard from "./address-card";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
}

function Address({setCurrentSelectedAddress,selectedId}) {
  const [formData, setFormData] = useState(initialAddressFormData)
 const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { addressList } = useSelector((state) => state.shopAddress)
  const { toast } = useToast()

  function handleManageAddress(event) {
    event.preventDefault()

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData)
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
              <span> You can add a maximum of 3 addresses.</span>
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

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            setCurrentEditedId(null)
            setFormData(initialAddressFormData)
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
                    <span>Address updated successfully</span>
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
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            setFormData(initialAddressFormData)
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
                    <span>Address added successfully</span>
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
        })
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
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
                <span>Address deleted successfully</span>
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

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item)
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      {/* <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
              key={singleAddressItem}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
             selectedId={selectedId}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle> {currentEditedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address

