import React, { Component } from "react";

/**
 * This section contains the products of the page
 * Declaring the className as Products
 * @Products:these are the products of the page
 */

export default class Products extends Component {
  render() {
    return (
      <>
        <div class="container">
          <h1 class="text-center">World Class Products</h1>
          <div class="row">
            {this.props.productsdata.map((recur) => (
              <div className="col-sm-6 col-md-3">
                <div className="thumbnail featured-product">
                  <a href=".">
                    <img src={recur.img} alt="" />
                  </a>
                  <div class="caption">
                    <h3>{recur.title}</h3>
                    <p>{recur.para}</p>
                    <p class="price">{recur.price}</p>

                    {/* <!-- Input Group --> */}
                    <div class="input-group">
                      <input type="number" class="form-control" value="1" />
                      <span class="input-group-btn">
                        <button class="btn btn-primary" type="button">
                          <span
                            class="glyphicon glyphicon-shopping-cart"
                            aria-hidden="true"
                          ></span>
                          Add to Cart
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
