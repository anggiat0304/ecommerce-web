import { FETCH_PRODUCT_FAILED, FETCH_PRODUCT_LIST_FAILED, FETCH_PRODUCT_LIST_REQUEST, FETCH_PRODUCT_LIST_SUCCESS, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "../actions/Types";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  const ListProductReducer = (state = initialState,action) =>{
    switch (action.type) {
        case FETCH_PRODUCT_LIST_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_PRODUCT_LIST_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        case FETCH_PRODUCT_LIST_FAILED:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
  }
  export default ListProductReducer;