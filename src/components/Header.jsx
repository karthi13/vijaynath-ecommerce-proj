import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Logo from "./icons/Logo";
import Arrow from "./icons/Arrow";
import Cart from "./icons/Cart";
import {
  filterProducts,
  getCurrency,
  symbolChange,
  getCategory,
} from "../redux/Action";
import { Link } from "react-router-dom";
import AllMiniCart from "./AllMiniCart";

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    symbol: state.symbol,
    category: state.category,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { filterProducts, getCurrency, symbolChange, getCategory },
    dispatch
  );
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
      cartClicked: true,
      categoryName: "tech",
    };
  }

  componentDidMount() {
    this.props.getCurrency();
    this.props.getCategory();
  }

  category() {
    return (
      <nav className="header_category ">
        {this.props.category &&
          this.props.category.map((e) => (
            <Link to="/" key={e.name} onClick={() => this.props.filterProducts(e.name)}>
              {e.name}
            </Link>
          ))}
      </nav>
    );
  }

  logo() {
    return (
      <Link to="/" className="header_logo">
        <Logo className="logo"/>
      </Link>
    );
  }

  currencyDialog() {
    return ( 
      <div className="header_dialog">
        {
          this.props.currency?.map((e) => (
            <div
              className="header_currency"
              key={e.label}
              onClick={() => this.props.symbolChange(e.symbol)}
            >
              <span>{e.symbol}</span>
              <span>{e.label}</span>
            </div>
          ))}
      </div>
    );
  }

  currencyGroup() {
    return (
      <div className="currency_group">
        <span className="currency_symbol">{this.props.symbol}</span>
        <span 
          className="arrow"
          onClick={() => this.setState({ clicked: this.state.clicked ? false : true })}
        >
          <Arrow />
          { !this.state.clicked && this.currencyDialog() }
        </span>
      </div>
    );
  }

  cart() {
    return (
      <div
        className="cart_container"
        onClick={() => this.setState({ cartClicked: !this.state.cartClicked })}
      >
        <Cart color="black" />
        { 
          this.props.cart.length !== 0 && 
          <div className="header_badge">
            {this.props.cart.reduce((e, a) => e + a.amount, 0)}
          </div>
        }

        { 
          !this.state.cartClicked && 
          <div>
            <AllMiniCart />
          </div>
        }
      </div>
    );
  }

  actions() {
    return (
      <div className="header_actions">
        { this.currencyGroup() }
        { this.cart() }
    </div>
    );
  }

  blur() {
    return (
        <div
          onClick={() => this.setState({ cartClicked: !this.state.cartClicked })}
          className="header_blur"
        />
    );
  }

  render() {
    return (
      <>
        <header className="header">
          {this.category()}
          {this.logo()}
          {this.actions()}
        </header>
        { !this.state.cartClicked &&  this.blur() }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
