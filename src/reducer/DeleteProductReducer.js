import { DELETE_PRODUCT_FAILED, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS } from "../actions/Types";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  const DeleteProductReducer = (state = initialState,action) =>{
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        case DELETE_PRODUCT_FAILED:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
  }
  export default DeleteProductReducer;