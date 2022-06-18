import React, { Component } from "react";
import Attributes from "./Attributes";
import { increment, decrement } from "../redux/Action";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  return {
    symbol: state.symbol,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ increment, decrement }, dispatch);
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }
  render() {
    const {
      id,
      name,
      gallery,
      prices,
      inStock,
      brand,
      attributes,
      altId,
      selected,
    } = this.props;
    const price = prices.filter((e) => e.currency.symbol === this.props.symbol);
    const totalQuanitity = this.props.cart.find((e) => e.altId === altId);

    return (
      <>
        <hr className='cart_hr' />
        <div className='cart'>
          <div>
            <h1 className='cart_brand'>{brand}</h1>
            <h3 className='cart_name'>{name}</h3>

            <p className='cart_price'>
              <span style={{ marginRight: 2 }}>{price[0].currency.symbol}</span>
              {Math.round(price[0].amount).toFixed(2)}
            </p>
            {attributes &&
              attributes.map((e) => (
                <Attributes
                  key={e.id}
                  {...e}
                  cclicked={false}
                  name={name}
                  selected={selected}
                />
              ))}
          </div>
          <div>
            <button
              className='cart_quantity_change '
              onClick={() => this.props.increment(altId)}>
              <span className='cart_span'>+</span>
            </button>
            <p className='cart_total'>{totalQuanitity.amount}</p>
            <button
              className='cart_quantity_change'
              onClick={() => this.props.decrement(altId)}>
              <span className='cart_span'>-</span>
            </button>

            <img
              className='cart_gallery'
              src={gallery[this.state.num]}
              alt={id}
            />
            {gallery.length > 1 && (
              <div className='cart_image'>
                <button
                  className='cart_image_change'
                  onClick={() =>
                    this.state.num !== 0 &&
                    this.setState({
                      num: this.state.num - 1,
                    })
                  }>
                  &lt;
                </button>
                <button
                  className='cart_image_change'
                  onClick={() =>
                    gallery.length - 1 > this.state.num &&
                    this.setState({
                      num: this.state.num + 1,
                    })
                  }>
                  &gt;
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
