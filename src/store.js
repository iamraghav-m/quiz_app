import { applyMiddleware } from 'redux';
import rootReducer from './reducers'
import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";

// componentWillMount
const middleware = [thunk];
const store = configureStore(
    {reducer: rootReducer},
    applyMiddleware(...middleware),
  );

export default store;
