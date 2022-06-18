const initialState = {
  first: null,
  allProducts: null,
  filtered: null,
  details: null,
  currency: null,
  symbol: "$",
  cart: [],
  category: null,
  getName: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_PRODUCTS": {
      return {
        ...state,
        allProducts: action.payload,
        first: action.payload.filter((e) => e.name === "all"),
      };
    }
    case "FILTERED": {
      return {
        ...state,
        filtered:
          state.allProducts &&
          state.allProducts.filter((e) => e.name === action.payload),
      };
    }
    case "PRODUCTS_DETAILS": {
      return {
        ...state,
        details: action.payload,
      };
    }
    case "CURRENCY_DETAILS": {
      return {
        ...state,
        currency: action.payload,
      };
    }
    case "SYMBOL_CHANGE": {
      return {
        ...state,
        symbol: action.payload,
      };
    }
    case "ADD_TO_CART": {
      const data = action.payload;

      const isAvailable = state.cart.findIndex((e) => e.altId === data.altId);
      if (isAvailable === -1) {
        return {
          ...state,
          cart: [...state.cart, data],
        };
      } else {
        state.cart[isAvailable].amount = state.cart[isAvailable].amount + 1;
        return {
          ...state,
          cart: [...state.cart],
        };
      }
    }

    case "INCREMENT": {
      const isAvailable = state.cart.findIndex(
        (e) => e.altId === action.payload
      );
      state.cart[isAvailable].amount = state.cart[isAvailable].amount + 1;
      return {
        ...state,
        cart: [...state.cart],
      };
    }

    case "DECREMENT": {
      const isAvailable = state.cart.findIndex(
        (e) => e.altId === action.payload
      );
      state.cart[isAvailable].amount = state.cart[isAvailable].amount - 1;
      if (state.cart[isAvailable].amount === 0) {
        return {
          ...state,
          cart: state.cart.filter((e) => e.altId !== action.payload),
        };
      }
      return {
        ...state,
        cart: [...state.cart],
      };
    }

    case "ALL_CATEGORY": {
      return {
        ...state,
        category: action.payload,
      };
    }
    case "GET_NAME": {
      return {
        ...state,
        getName: action.payload,
      };
    }
    default:
      return state;
  }
};
