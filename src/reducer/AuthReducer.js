import { FETCH_LOGIN_FAILED, FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGOUT_FAILED, FETCH_LOGOUT_REQUEST, FETCH_LOGOUT_SUCCESS } from "../actions/Types";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  const LoginReducer = (state = initialState,action)=>{
    switch (action.type){
        case FETCH_LOGIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_LOGIN_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        case FETCH_LOGIN_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case FETCH_LOGOUT_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_LOGOUT_SUCCESS:
            return{
                ...state,
                loading: false,
                data : action.payload
            }
        case FETCH_LOGOUT_FAILED:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
  }

  export default  LoginReducer;