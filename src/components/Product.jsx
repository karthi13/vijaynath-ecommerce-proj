import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";
import Cart from "./icons/Cart";
import { addToCart } from "../redux/Action";

const mapStateToProps = (state) => {
  return {
    symbol: state.symbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addToCart }, dispatch);
};
class Product extends Component {
  render() {
    const { id, name, gallery, prices, inStock, addToCart, attributes } =
      this.props;

    const price = prices.filter((e) => e.currency.symbol === this.props.symbol);
    const selectedAttribute = attributes.map((e) => {
      let id = e.id;
      let item = e.items[0];
      return { id, item };
    });
    const newId = selectedAttribute.map((e) => e.item.displayValue);
    const altId = id + newId.join("");

    return (
      <div style={{ opacity: !inStock ? 0.4 : 1 }} className='product'>
        <div className='product_cart'>
          <p
            className='product_icon'
            onClick={() =>
              !inStock
                ? alert("Sorry, This Is Product Is Out Of Stock")
                : addToCart({
                    ...this.props,
                    amount: 1,
                    selectedAttributes: selectedAttribute,
                    altId: altId,
                  })
            }>
            <Cart color='white' />
          </p>
        </div>
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <img src={gallery[0]} alt={id} className='product_img ' />
        </Link>

        <h2 className='product_name'>{name}</h2>
        <p className='product_price'>
          <span style={{ marginRight: 2 }}>{price[0].currency.symbol}</span>
          {Math.round(price[0].amount).toFixed(2)}
        </p>
        {!inStock && <p className='product_stock'>OUT OF STOCK</p>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
