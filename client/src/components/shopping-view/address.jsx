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
import { XCircle } from "lucide-react";
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
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <XCircle className="text-green-500" size={20} />
            You can add a maximum of 3 addresses.
          </motion.div>
        ),
        description: "Please remove an existing address to add a new one.",
        className: "bg-red-500 text-white shadow-lg px-4 py-2 rounded-lg",
      });


      // toast({
      //   title: "You can add a maximum of 3 addresses.",
      //   description: "Please remove an existing address to add a new one.",
      //   className: "bg-red-600 text-white shadow-lg",
      //   variant: "destructive",
      // })

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
              title: "Address updated successfully",
              className: "bg-white text-black shadow-lg",
            })
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
              title: "Address added successfully",
              className: "bg-white text-black shadow-lg",
            })
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
          title: "Address deleted successfully",
          className: "bg-white text-black shadow-lg",
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

