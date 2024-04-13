import { combineReducers } from "redux";
import LoginReducer from "./AuthReducer";
import ListProductReducer from "./ListProductReducer";
import SingleProductReducer from "./SingleProductReducer";
import ListCategoriesReducer from "./CategoryReducer";
import AddProductEeducer from "./AddProductReducer";
import DeleteProductReducer from "./DeleteProductReducer";
import CategoryMapReducer from "./CategoryMapReducer";

export default combineReducers({
      auth : LoginReducer,
      products : ListProductReducer,
      product: SingleProductReducer,
      categories : ListCategoriesReducer,
      addProduct : AddProductEeducer,
      deleteProduct : DeleteProductReducer,
      categoriesMap : CategoryMapReducer,
      category : SingleProductReducer,
  });