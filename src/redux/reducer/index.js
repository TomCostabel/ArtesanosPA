import {
    GET_ALL_PRODUCTS,
    GET_ALL_USERS,
    GET_CART_USER,
    GET_PREFERENCE_ID,
} from "../actions/index.js";

const initialState = {
    productos: [],
    users: [],
    carritoUser: [],
    preferenceId: "",
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                productos: action.payload.sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }

                    return 0;
                }),
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_CART_USER:
            return {
                ...state,
                carritoUser: action.payload,
            };
        case GET_PREFERENCE_ID:
            return {
                ...state,
                preferenceId: action.payload,
            };
        default:
            return state;
    }
};
export default rootReducer;
