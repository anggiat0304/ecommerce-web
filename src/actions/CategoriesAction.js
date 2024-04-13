import axios from 'axios';
import { FETCH_CATEGORIES_FAILED, FETCH_CATEGORIES_MAO_FAILED, FETCH_CATEGORIES_MAP_REQUEST, FETCH_CATEGORIES_MAP_SUCCESS, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_FAILED, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS } from './Types';
import { CATEGORIES_LIST, CATEGORIES_MAP_LIST_URL } from './Url';

const fetchCategoriesRequest = () => {
    return {
        type: FETCH_CATEGORIES_REQUEST
    }
}
const fetchCategoriesSuccess = (res) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload: res
    }
}
const fetchCategoriesFailed = (err) => {
    return {
        type: FETCH_CATEGORIES_FAILED,
        payload: err
    }
}

const fetchCategoriesMapRequest = () => {
    return {
        type: FETCH_CATEGORIES_MAP_REQUEST
    }
}
const fetchCategoriesMapSuccess = (res) => {
    return {
        type: FETCH_CATEGORIES_MAP_SUCCESS,
        payload: res
    }
}
const fetchCategoriesMapFailed = (err) => {
    return {
        type: FETCH_CATEGORIES_MAO_FAILED,
        payload: err
    }
}

const fetchCategoryRequest = () => {
    return {
        type: FETCH_CATEGORY_REQUEST
    }
}
const fetchCategorySuccess = (res) => {
    return {
        type: FETCH_CATEGORY_FAILED,
        payload: res
    }
}
const fetchCategoryFailed = (err) => {
    return {
        type: FETCH_CATEGORY_FAILED,
        payload: err
    }
}
export const getCategoriesList=()=>{
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return (dispatch) => {
        dispatch(fetchCategoriesRequest());
        axios.get(CATEGORIES_LIST, {
            headers: {
                'Authorization': authorization,
                'User': userId
            }
        })
            .then(response => {
                dispatch(fetchCategoriesSuccess(response));
            })
            .catch(error => {
                // Handle error jika diperlukan
                dispatch(fetchCategoriesFailed(error))
                alert(error)
            });
    };

}

export const getCategory=(id)=>{
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return (dispatch) => {
        dispatch(fetchCategoryRequest());
        axios.get(`${CATEGORIES_LIST}/${id}`, {
            headers: {
                'Authorization': authorization,
                'User': userId
            }
        })
            .then(response => {
                dispatch(fetchCategorySuccess(response));
            })
            .catch(error => {
                // Handle error jika diperlukan
                dispatch(fetchCategoryFailed(error))
                alert(error)
            });
    };

}

export const getCategoriesMap=()=>{
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return (dispatch) => {
        dispatch(fetchCategoriesMapRequest());
        axios.get(CATEGORIES_MAP_LIST_URL, {
            headers: {
                'Authorization': authorization,
                'User': userId
            }
        })
            .then(response => {
                dispatch(fetchCategoriesMapSuccess(response));
            })
            .catch(error => {
                // Handle error jika diperlukan
                dispatch(fetchCategoriesMapSuccess(error))
                alert(error)
            });
    };

}