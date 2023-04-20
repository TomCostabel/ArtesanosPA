import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export function getProducts() {
    return async function (dispatch) {
        try {
            let res = await axios.get("http://localhost:3001/products");
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function postLogin(data) {
    return async () => {
        const login = await axios.post("http://localhost:3001/login", data);
        return login;
    };
}
