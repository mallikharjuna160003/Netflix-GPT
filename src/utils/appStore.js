import { configureStore } from "@reduxjs/toolkit"; 
import userSlice from "./userSlice"; 
const appStore = configureStore( 
  { 
      reducer: { 
        user: userSlice, // use the reducer property of the slice

      }
   
   }

)

export default appStore;