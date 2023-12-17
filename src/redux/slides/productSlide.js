import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlice.actions

export default productSlice.reducer
