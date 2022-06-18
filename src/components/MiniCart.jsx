import React, { Component } from "react";
import { connect } from "react-redux";
import MiniCartAttribute from "./MiniCartAttribute";
import { increment, decrement } from "../redux/Action";

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

class MiniCart extends Component {
  render() {
    const {
      id,
      name,
      gallery,
      prices,

      brand,
      attributes,
      altId,
      selected,
    } = this.props;
    const price = prices.filter((e) => e.currency.symbol === this.props.symbol);
    const totalQuanitity = this.props.cart.find((e) => e.altId === altId);

    const handleAdd = (e) => {
      e.stopPropagation();
      this.props.increment(altId);
    };

    const handleDelete = (e) => {
      e.stopPropagation();
      this.props.decrement(altId);
    };
    return (
      <>
        <div className='mini_cart'>
          <div>
            <h1 className='mini_name'>
              {brand}
              <br />
              {name}
            </h1>

            <p className='mini_price'>
              <span style={{ marginRight: 2 }}>{price[0].currency.symbol}</span>
              {Math.round(price[0].amount).toFixed(2)}
            </p>
            {attributes &&
              attributes.map((e) => (
                <MiniCartAttribute
                  key={e.id}
                  {...e}
                  name={name}
                  selected={selected}
                />
              ))}
          </div>
          <div className='mini_sidebar'>
            <button className='mini_plus' onClick={(e) => handleAdd(e)}>
              +
            </button>
            <p className='mini_total'>{totalQuanitity.amount}</p>
            <img className='mini_img' src={gallery[0]} alt={id} />
            <button className='mini_minus' onClick={(e) => handleDelete(e)}>
              -
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
