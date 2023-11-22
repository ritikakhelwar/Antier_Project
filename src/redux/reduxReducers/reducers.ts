import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'myReducer',
  initialState: {
    allData: [],
    allCategories: [],
  },
  reducers: {
    setAllData: (state, action) => {
      console.log('setting all Data action =>', action?.payload);
      state.allData = action.payload;
    },
    setAllCategories: (state, action) => {
      console.log('setting all allCategories action =>', action?.payload);
      state.allCategories = action.payload;
    },
  },
});
export const {setAllData, setAllCategories} = authSlice.actions;
export default authSlice.reducer;
