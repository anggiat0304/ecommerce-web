import { FETCH_CATEGORIES_FAILED, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS } from "../actions/Types";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  const ListCategoriesReducer = (state = initialState,action) =>{
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_CATEGORIES_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        case FETCH_CATEGORIES_FAILED:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
  }
  export default ListCategoriesReducer;