import { GET_ALL_PRODUCTS } from "../actions/index.js";

const initialState = {
    productos: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                productos: action.payload,
            };
        default:
            return state;
    }
};
export default rootReducer;
