import React, { Component } from "react";
import Cart from "./Cart";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    symbol: state.symbol,
  };
};

class AllCart extends Component {
  render() {
    const totalPrice = this.props.cart?.map(
      (e) =>
        e.prices.find((e) => e.currency.symbol === this.props.symbol).amount *
        e.amount
    );
    return (
      <>
        <h1 className='all_cart'>CART</h1>
        {this.props.cart.map((e) => (
          <Cart key={e.altId} {...e} />
        ))}
        <hr className='cart_hr' />
        <p className='all_cart_tax' style={{ marginTop: 20 }}>
          Tax 21%:{" "}
          <span style={{ fontWeight: 700, marginLeft: 10 }}>
            {this.props.symbol}250.00
          </span>
        </p>
        <p className='all_cart_tax'>
          Quantity:{" "}
          <span style={{ fontWeight: 700 }}>
            {" "}
            {this.props.cart.reduce((e, a) => e + a.amount, 0)}
          </span>
        </p>
        <p className='all_cart_tax'>
          Total:
          <span style={{ fontWeight: 700, marginLeft: 40 }}>
            {this.props.symbol}{" "}
            {Math.round(totalPrice.reduce((e, a) => e + a, 0)).toFixed(2)}
          </span>
        </p>
        <button className='all_cart_order'>order</button>
      </>
    );
  }
}

export default connect(mapStateToProps, null)(AllCart);
