import {
  AllProducts,
  productDetails,
  currencyInfo,
  category,
} from "./Allqueries";

//get category

export const getCategory = () => {
  return async (dispatch, getState) => {
    try {
      const categories = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: category,
        }),
      });
      const allcategories = await categories.json();
      dispatch(allCategory(allcategories.data.categories));
    } catch (error) {
      console.log(error);
    }
  };
};

const allCategory = (data) => {
  return {
    type: "ALL_CATEGORY",
    payload: data,
  };
};

//------------------------------------------------------------------

//get all products

export const getAllProducts = () => {
  return async (dispatch, getState) => {
    try {
      const allproduct = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: AllProducts,
        }),
      });
      const allproductJson = await allproduct.json();
      dispatch(allProducts(allproductJson.data.categories));
    } catch (error) {
      console.log(error);
    }
  };
};

export const allProducts = (data) => {
  return {
    type: "ALL_PRODUCTS",
    payload: data,
  };
};

//-------------------------------------------------------------------------

//filter products
export const filterProducts = (data) => {
  return {
    type: "FILTERED",
    payload: data,
  };
};

//--------------------------------------------------------------

//getProductDetails
export const getDetails = (detail) => {
  return async (dispatch, getState) => {
    try {
      const details = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: productDetails,
          variables: { id: detail },
        }),
      });
      const detaislJson = await details.json();

      dispatch(allDetails(detaislJson.data.product));
    } catch (error) {
      console.log(error);
    }
  };
};

export const allDetails = (data) => {
  return {
    type: "PRODUCTS_DETAILS",
    payload: data,
  };
};
//---------------------------------------------------------------------------------------

//getcurrency details

export const getCurrency = () => {
  return async (dispatch, getState) => {
    try {
      const currency = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: currencyInfo,
        }),
      });
      const currencyJson = await currency.json();
      dispatch(currencyState(currencyJson.data.currencies));
    } catch (error) {
      console.log(error);
    }
  };
};

export const currencyState = (data) => {
  return {
    type: "CURRENCY_DETAILS",
    payload: data,
  };
};

//-----------------------------------------------------------------------------

//symbol

export const symbolChange = (data) => {
  return {
    type: "SYMBOL_CHANGE",
    payload: data,
  };
};

//---------------------------------------------------------------------

//Add to cart

export const addToCart = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};

export const addToCartWithAtrributes = (data) => {
  return {
    type: "CART_WITH_ATTRIBUTES",
    payload: data,
  };
};

//-------------------------------------------------------------------------

//selecting attribute
export const att = (data) => {
  return {
    type: "ATTRIBUTE",
    payload: data,
  };
};

//-----------------------------------------------------------------------------
//save category name
export const getName = (data) => {
  return {
    type: "GET_NAME",
    payload: data,
  };
};
//--------------------------------------------------------------

//increment decrement

export const increment = (data) => {
  return {
    type: "INCREMENT",
    payload: data,
  };
};

export const decrement = (data) => {
  return {
    type: "DECREMENT",
    payload: data,
  };
};

//-------------------------------------------
