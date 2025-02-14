import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 shadow-md hover:shadow-xl ${
        selectedId?._id === addressInfo?._id
          ? "border-red-700 bg-red-50"
          : "border-gray-300 bg-white"
      }`}
      // className={`cursor-pointer border-red-700 ${
      //   selectedId?._id === addressInfo?._id
      //     ? "border-red-900 border-[4px]"
      //     : "border-black"
      // }`}
    >
      <CardContent className="grid p-4 gap-3">
        <Label className="text-gray-700 font-medium">🏠 Address: {addressInfo?.address}</Label>
        <Label className="text-gray-700 font-medium">🌆 City: {addressInfo?.city}</Label>
        <Label className="text-gray-700 font-medium">📍 Pincode: {addressInfo?.pincode}</Label>
        <Label className="text-gray-700 font-medium">📞 Phone: {addressInfo?.phone}</Label>
        {addressInfo?.notes && (
          <Label className="text-gray-500 italic">📝 Notes: {addressInfo?.notes}</Label>
        )}
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-black text-white hover:bg-gray-900 px-5 py-2 rounded-lg transition-all duration-300"
        >
          ✏️ Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-red-600 text-white hover:bg-red-700 px-5 py-2 rounded-lg transition-all duration-300"
        >
          🗑️ Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
