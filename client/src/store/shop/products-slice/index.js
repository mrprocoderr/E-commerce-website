import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
}

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllProducts", // Action type
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      // Create a query string using URLSearchParams
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      }).toString()

      // Send the API request with the query parameters
      const response = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      )

      console.log("API Response:", response.data) // Log the response data
      return response.data // Return the data portion of the response
    } catch (error) {
      console.error("Error fetching products:", error.message) // Log the error message
      // Return a rejected value with error details
      return rejectWithValue(error.response?.data || "Something went wrong")
    }
  }
)

// export const fetchProductDetails = createAsyncThunk(
//   "products/fetchProductDetails", // Action type
//   async (id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/shop/products/get?${id}`
//       );

//       console.log("API Response:", response.data); // Log the response data
//       return response.data; // Return the data portion of the response
//     } catch (error) {
//       console.error("Error fetching products:", error.message); // Log the error message
//     }
//   }
// );

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    )

    return result?.data
  }
)

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        console.log(action.payload, "action.payload")
        state.isLoading = false
        state.productList = action.payload.data
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false
        state.productList = []
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.productDetails = action.payload.data
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false
        state.productDetails = null
      })
  },
})

export const { setProductDetails } = shoppingProductSlice.actions
export default shoppingProductSlice.reducer
