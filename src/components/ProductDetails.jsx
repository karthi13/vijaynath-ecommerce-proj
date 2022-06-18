import React, { Component } from "react";
import Attributes from "./Attributes";
import { getDetails, addToCart } from "../redux/Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withRouter } from "react-router";

const mapStateToProps = (state) => {
  return {
    details: state.details,
    symbol: state.symbol,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDetails, addToCart }, dispatch);
};

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      selectedAttributes: [],
    };
  }
  componentDidMount() {
    const { productDetails } = this.props.match.params;
    this.props.getDetails(productDetails);
    setTimeout(() => {
      let selectedAttribute = this.props.details.attributes.map((e) => {
        let id = e.id;
        let item = e.items[0];
        return { id, item };
      });
      this.setState({ selectedAttributes: selectedAttribute });
    }, 100);
  }
  render() {
    if (this.props.details === null) return <h1>loading.......</h1>;
    const { id, name, description, gallery, attributes, brand, prices } =
      this.props.details;
    const price = prices.filter((e) => e.currency.symbol === this.props.symbol);

    const handleUpdate = (...data) => {
      const findIndexs = this.state.selectedAttributes.findIndex(
        (e) => e.id === data[0].id
      );

      const newItem = [...this.state.selectedAttributes];
      newItem[findIndexs].item = data[0].item;

      this.setState({ selectedAttributes: newItem });
    };

    return (
      <>
        <div className='details'>
          <div className='details_gallery'>
            {gallery.map((e) => (
              <img
                src={e}
                alt={id}
                className='details_gallery_items'
                onClick={() => this.setState({ image: e })}
                key={e}
              />
            ))}
          </div>
          <div className='details_big_img'>
            <img
              src={this.state.image === null ? gallery[0] : this.state.image}
              alt={id}
            />
          </div>
          <div className='details_content'>
            <h1 className='details_brand'>{brand}</h1>
            <h2 className='details_name'>{name}</h2>
            {attributes &&
              attributes.map((e) => (
                <Attributes
                  key={e.id}
                  {...e}
                  name={name}
                  selectedAttributes={this.state.selectedAttributes}
                  handleUpdate={handleUpdate}
                  pclicked={true}
                />
              ))}
            <p className='details_price'>PRICE:</p>
            <p className='details_price_value'>
              <span style={{ marginRight: 2 }}>{price[0].currency.symbol}</span>
              {Math.round(price[0].amount).toFixed(2)}
            </p>
            <button
              className='details_btn'
              onClick={() =>
                this.props.addToCart({
                  id,
                  name,
                  gallery,
                  attributes,
                  brand,
                  prices,
                  alt: this.state.alt,
                  selectedAttribute: this.state.selectedAttributes,
                  amount: 1,
                  selected: this.state.selectedAttributes.map((e) => e.item),
                  altId:
                    id +
                    this.state.selectedAttributes
                      .map((e) => e.item.displayValue)
                      .join(""),
                })
              }>
              ADD TO CART
            </button>
            <div
              className='details_description'
              dangerouslySetInnerHTML={{
                __html: description,
              }}></div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
