import axios from "axios"
import { ADD_PRODUCT_FAILED, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILED, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILED, FETCH_PRODUCT_LIST_FAILED, FETCH_PRODUCT_LIST_REQUEST, FETCH_PRODUCT_LIST_SUCCESS, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "./Types"
import { PRODUCT, PRODUCT_LIST } from "./Url"

const fetchProductListRequest = () => {
    return {
        type: FETCH_PRODUCT_LIST_REQUEST
    }
}
const fetchProductListSuccess = (res) => {
    return {
        type: FETCH_PRODUCT_LIST_SUCCESS,
        payload: res
    }
}
const fetchProductListFailed = (err) => {
    return {
        type: FETCH_PRODUCT_LIST_FAILED,
        payload: err
    }
}

const fetchProductRequest = () => {
    return {
        type: FETCH_PRODUCT_REQUEST,
    }
}
const fetchProductSuccess = (res) => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: res
    }
}
const fetchProductFailed = (err) => {
    return {
        type: FETCH_PRODUCT_FAILED,
        payload: err
    }
}

const addProductRequest = () => {
    return {
        type: ADD_PRODUCT_REQUEST,
    }
}
const addProductSuccess = (res) => {
    return {
        type: ADD_PRODUCT_SUCCESS,
        payload: res
    }
}
const addProductFailed = (err) => {
    return {
        type: ADD_PRODUCT_FAILED,
        payload: err
    }
}

const deleteProductRequest = () => {
    return {
        type: DELETE_PRODUCT_REQUEST,
    }
}
const deleteProductSuccess = (res) => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        payload: res
    }
}
const deleteProductFailed = (err) => {
    return {
        type: DELETE_PRODUCT_FAILED,
        payload: err
    }
}
export const getProductList = () => {
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return (dispatch) => {
        dispatch(fetchProductListRequest());
        axios.get(PRODUCT_LIST, {
            headers: {
                'Authorization': authorization,
                'User': userId
            }
        })
            .then(response => {
                dispatch(fetchProductListSuccess(response));
            })
            .catch(error => {
                // Handle error jika diperlukan
                dispatch(fetchProductListFailed(error))
                alert(error)
            });
    };
};

export const getProduct = (code) => {
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return (dispatch) => {
        dispatch(fetchProductRequest());
        axios.get(`${PRODUCT}/${code}`, {
            headers: {
                'Authorization': authorization,
                'User': userId
            }
        })
            .then(response => {
                dispatch(fetchProductSuccess(response));
            })
            .catch(error => {
                // Handle error jika diperlukan
                dispatch(fetchProductFailed(error))
                alert(error)
            });
    };
};

export const saveProduct = (productData) => {
    console.log(productData);
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");
    
    return (dispatch) => {
        dispatch(addProductRequest());
        
        axios.post(
            `${PRODUCT}`,
            productData,
            {
                headers: {
                    'Authorization': authorization,
                    'User': userId
                }
            }
        )
        .then(response => {
            dispatch(addProductSuccess(response));
            if(response.data.success){
                window.location.reload()
            }else{
                alert(response.data.message)
            }
        })
        .catch(error => {
            // Handle error jika diperlukan
            dispatch(addProductFailed(error))
            alert(error)
        });
    };
}

export const deleteProduct = (code) => {
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return (dispatch) => {
        dispatch(addProductRequest());

        axios.delete(
            `${PRODUCT}/${code}`,
            {
                headers: {
                    'Authorization': authorization,
                    'User': userId
                }
            }
        )
        .then(response => {
            console.log('Product deletion successful:', response);
            dispatch(deleteProductSuccess(response));
            console.log(response.data.success)
            if(response.data.success){
                window.location.href="/products"
            }
        })
        .catch(error => {
            console.error('Product deletion failed:', error);
            dispatch(deleteProductFailed(error));
            alert(error); // Perhatikan bahwa menggunakan alert bisa menjadi metode yang kurang ideal untuk menangani kesalahan
        });
    };
}

export const updateProduct = (producDetail) => {
    const authorization = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return (dispatch) => {

        axios.put(
            `${PRODUCT}/${producDetail.code}`,
            producDetail,
            {
                headers: {
                    'Authorization': authorization,
                    'User': userId
                }
            }
        )
        .then(response => {
            console.log('Product deletion successful:', response);
           
            console.log(response.data.success)
            if(response.data.success){
                window.location.href="/products"
            }else{
                alert(response.data.message);
            }
        })
        .catch(error => {
            console.error('Product deletion failed:', error);
            alert(error); // Perhatikan bahwa menggunakan alert bisa menjadi metode yang kurang ideal untuk menangani kesalahan
        });
    };
}
