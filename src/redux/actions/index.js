import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_CART_USER = "GET_CART_USER";
export const GET_PREFERENCE_ID = "GET_PREFERENCE_ID";
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
export function actualizarStockYPrecio(data, id) {
    try {
        console.log(data, id);
        return async () => {
            const update = await axios.put(
                `http://localhost:3001/products/${id}`,
                data
            );
            return update;
        };
    } catch (error) {
        console.log(error);
    }
}
export function agregarInformacionEnvio(data) {
    try {
        return async () => {
            const AddInfo = await axios.put(
                "http://localhost:3001/agregarInformacionEnvio",
                data
            );
            return AddInfo;
        };
    } catch (error) {
        console.log("error en logout", error);
    }
}

export const infoEnvioAlBack = (data) => {
    try {
        return async (dispatch) => {
            const res = await axios.post(
                "http://localhost:3001/crear-preferencia",
                data
            );
            dispatch({
                type: GET_PREFERENCE_ID,
                payload: res.data.preferenceId,
            });
            return res.data;
        };
    } catch (error) {
        console.log(error);
    }
};
