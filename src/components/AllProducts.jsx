import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Product from "./Product";
import { getAllProducts, getName } from "../redux/Action";

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
    first: state.first,
    filtered: state.filtered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllProducts, getName }, dispatch);
};

class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }
  componentDidUpdate() {
    this.props.getName(this.props.filtered && this.props?.filtered[0].name);
  }

  render() {
    return (
      <>
        <h1 className='allproducts_name'>
          {this.props.filtered === null ? "ALL" : this.props?.filtered[0].name}
        </h1>

        {this.props.filtered && (
          <div className='allproducts'>
            {this.props.filtered[0].products.map((all) => (
              <Product key={all.id} {...all} />
            ))}
          </div>
        )}
        <div className='allproducts'>
          {this.props.first &&
            this.props.filtered === null &&
            this.props.first[0].products.map((all) => (
              <Product key={all.id} {...all} />
            ))}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
