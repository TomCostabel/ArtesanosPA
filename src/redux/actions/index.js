import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_CART_USER = "GET_CART_USER";

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
export function getUsers() {
    return async function (dispatch) {
        try {
            let res = await axios.get("http://localhost:3001/getUsers");
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}
export function postLogin(data) {
    try {
        return async () => {
            const login = await axios.post("http://localhost:3001/login", data);
            return login;
        };
    } catch (error) {
        console.log("el error es", error);
    }
}
export function postRegister(data) {
    return async () => {
        const register = await axios.post(
            "http://localhost:3001/register",
            data
        );
        return register;
    };
}
export function getCartUser(email) {
    return async function (dispatch) {
        try {
            let res = await axios.get(`http://localhost:3001/carrito/${email}`);
            dispatch({
                type: GET_CART_USER,
                payload: res.data.items,
            });
        } catch (error) {
            console.log(error);
        }
    };
}
export function deleteProductoCarrito(data) {
    try {
        return async () => {
            const eliminar = await axios.post(
                "http://localhost:3001/deleteProduct",
                data
            );
            return eliminar;
        };
    } catch (error) {
        console.log("el error es", error);
    }
}
export function agregarProductoAlCarrito(data) {
    try {
        return async () => {
            const agregar = await axios.post(
                "http://localhost:3001/carritoAdd",
                data
            );
            return agregar;
        };
    } catch (error) {
        console.log("el error es", error);
    }
}
export function restarUnoCantidad(data) {
    try {
        return async () => {
            const restar = await axios.post(
                "http://localhost:3001/restarUnoCantidad",
                data
            );
            return restar;
        };
    } catch (error) {
        console.log("el error es", error);
    }
}
export function sumarUnoCantidad(data) {
    try {
        return async () => {
            const sumar = await axios.post(
                "http://localhost:3001/sumarUnoCantidad",
                data
            );
            return sumar;
        };
    } catch (error) {
        console.log("el error es", error);
    }
}
