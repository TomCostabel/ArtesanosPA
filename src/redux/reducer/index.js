import { GET_ALL_PRODUCTS, GET_ALL_USERS } from "../actions/index.js";

const initialState = {
    productos: [],
    users: [],
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
        default:
            return state;
    }
};
export default rootReducer;
