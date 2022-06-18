import React, { Component } from "react";
import Header from "./components/Header";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import AllCart from "./components/AllCart";
import { Route, Switch } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path='/'>
            <AllProducts />
          </Route>
          <Route exact path='/product/:productDetails'>
            <ProductDetails />
          </Route>
          <Route exact path='/cart'>
            <AllCart />
          </Route>
        </Switch>
      </>
    );
  }
}
