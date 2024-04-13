import { ADD_PRODUCT_FAILED, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS } from "../actions/Types";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const AddProductEeducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
        return{
            ...state,
            loading:true
        }
    case ADD_PRODUCT_SUCCESS:
        return{
            ...state,
            loading:false,
            data:action.payload
        }
    case ADD_PRODUCT_FAILED:
        return{
            ...state,
            loading:false,
            error: action.payload
        }
    default:
        return state;
}
}
export default AddProductEeducer;