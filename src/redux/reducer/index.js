import {
    GET_ALL_PRODUCTS,
    GET_ALL_USERS,
    GET_EMAIL_AFTERLOGIN,
} from "../actions/index.js";

const initialState = {
    productos: [],
    users: [],
    emailAfterLogin: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                productos: action.payload,
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_EMAIL_AFTERLOGIN:
            return {
                ...state,
                emailAfterLogin: action.payload,
            };
        default:
            return state;
    }
};
export default rootReducer;
