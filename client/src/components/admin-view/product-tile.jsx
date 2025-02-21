
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"

function AdminProductTile({ product, setFormData, setOpenCreateProductsDialog, setCurrentEditedId, handleDelete }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={product?.image || "/placeholder.svg"}
            alt={product?.title}
            className={`w-full h-[300px] object-contain transition-transform duration-300 ease-in-out ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        </div>

        {/* Hover Overlay with Product Details */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-white text-center p-4">
            <h2 className="text-2xl font-bold mb-2">{product?.title}</h2>
            <div className="flex justify-center items-center space-x-2">
              <span className={`${product?.salePrice > 0 ? "line-through text-gray-300" : "text-green-500"} text-lg font-medium`}>
                Rs {product?.price}
              </span>
              {product?.salePrice > 0 && <span className="text-lg font-bold text-green-400">Rs {product?.salePrice}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <CardContent className="bg-white p-4">
        <h2 className="text-xl font-semibold mb-1">{product?.title}</h2>
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
                <span className="text-lg font-semibold text-green-600 ml-2">
                  Rs {product?.salePrice}
                </span>
              )}
            </div>
            </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="flex justify-between items-center gap-4 bg-gray-100 p-4 rounded-b-lg">
        <Button
          className="flex-1 px-6 py-2 bg-black text-white font-medium rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300 flex items-center justify-center"
          onClick={() => {
            setOpenCreateProductsDialog(true)
            setCurrentEditedId(product?._id)
            setFormData(product)
          }}
        >
          <Pencil className="w-5 h-5 mr-2" />
          Edit
        </Button>
        <Button
          className="flex-1 px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 flex items-center justify-center"
          onClick={() => handleDelete(product?._id)}
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AdminProductTile
