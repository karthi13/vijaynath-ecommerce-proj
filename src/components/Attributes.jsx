import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { att } from "../redux/Action";

const mapStateToProps = (state) => {
  return {
    value: state.attr,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ att: att }, dispatch);
};

class Attributes extends Component {
  state = {
    selected: null,
    cart: [],
    clicked: this.props.pclicked ? true : false,
    selectedAttributes: this.props.selectedAttributes,
    select: this.props.selected?.map((e) => e.displayValue),
  };

  componentDidMount() {
    if (this.state.select !== undefined) {
      return this.setState({ selected: null, cart: [] });
    }
    if (this.state.cart.length === 0) {
      return this.setState({
        selected: this.props.items[0].displayValue,
      });
    } else if (this.state.cart.length !== 0) {
      this.setState({ selected: this.state.cart });
    }
  }
  render() {
    const attributes = this.props;

    const handleClick = (item) => {
      this.setState({
        selected: item.displayValue,
        cart: item.displayValue,
      });
      this.props.handleUpdate({ id: attributes.id, item });
    };

    return (
      <>
        <h4 className='attributes_name'>{attributes && attributes.id + ":"}</h4>

        {attributes.items.map((item) => (
          <div
            key={item.value}
            onClick={() => this.state.clicked && handleClick(item)}
            className={`${
              attributes.id === "Color"
                ? "attributes_color"
                : "attributes_value"
            }   ${
              item.displayValue === this.state.selected &&
              attributes.id !== "Color"
                ? "click"
                : ""
            }
              ${
                attributes.id !== "Color" &&
                this.state.select?.includes(item.displayValue)
                  ? "click"
                  : ""
              }


            ${
              attributes.id === "Color" &&
              item.displayValue === this.state.selected
                ? "color"
                : ""
            }
            ${
              attributes.id === "Color" &&
              this.state.select?.includes(item.displayValue)
                ? "color"
                : ""
            }

          
                `}
            style={{
              backgroundColor: item.value,
            }}>
            {attributes.id === "Color" ? "" : item.value}
          </div>
        ))}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
