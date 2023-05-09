# Adding Redux to a React App

## Step 1 - Starting the React App
1. Run `npm install` to get all dependencies installed
2. Run `npm start` to start the server (frontend only)
3. Open localhost:8080 to view application

At this point, the React app should work - selecting a colored circle will change the "Currently selected" field in the header.

## Step 2 - Adding in Redux
1. Run `npm install react-redux` to add it as a dependency
2. Install the toolkit as well: `npm i @reduxjs/toolkit`
3. Create `store.js` file in the app folder
    - The 'app' folder is where we're keeping frontend code, like React files, so Redux can be here as well
    - In the file, we need to import configureStore
    - Store needs to be exported with a reducer
That code will look like this:
```
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {}
})
```
4. In the app folder, in index.js, import the store you're exporting in store.js, as well as Provider from react-redux
```
import { store } from "./store";
import { Provider } from "react-redux";
```
5. Wrap <Provider> around the app itself
```
root.render(
  <Provider store={store}>
    <Picker />
  </Provider>
);
```  
Remember that 'createRoot' generates a new root container for rendering components, while ReactDOM.render renders components to a specified DOM element.

## Step 3 - Creating a Slice
1. In the app folder, create a new folder to hold your Redux files
    - Inside the new folder, which I'll call redux, create a JS file to hold code logic
    - I'll call this file colorSlice.js
2. This file needs to import createSlice and export the newly created slice
    - We need to create reducers as well, which are a collection of functions for reading/modifying stateful values in the slice
    - There are two types of reducers, one which does the same action to the state passed in, and one which does a specified, passed in action to the state (all take in state, some take in action as well). 
        - If action is used, it will have a payload with the parameter passed in

The code so far:
```
import { createSlice } from '@reduxjs/toolkit';
  
export const colorSlice = createSlice({
    name: 'color',
    initialState: {
        chosenColor: 'red',
    },
    reducers: {
        setColor: (state, action) => {
             state.chosenColor = action.payload
        },
    },
})
export const { setColor } = colorSlice.actions
export default colorSlice.reducer
```
  
3. Add the slice reducer(s) to the store
    - Store should look like this:
```
import { configureStore } from "@reduxjs/toolkit"
import colorReducer from "./redux/colorSlice";

export const store = configureStore({
    reducer: {
        color: colorReducer
    }
})
```
- The slice gives us a reducer (in addition to other things). The reducer needs to be plugged into a store.

## Step 4 - 
The index.js contains the color component, which is where we are adding React Redux hooks for our component to interact with the store.
1. Inside the const Color, we need to use the Redux hook useDispatch: 
`const dispatch = useDispatch();`
2. In the return, we need to change the onClick to use Redux instead of the Picker component's useState:
 `onClick={() => dispatch(setColor(props.color))}`
3. In the Picker, we need to get the current color using Redux's state rather than props:
`let selectedColor = useSelector((state) => state.color.chosenColor)`
4. We can also remove the props from the <Color> components inside the Picker
