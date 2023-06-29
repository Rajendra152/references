import React, { Component } from "react";

/**
 * This section contains the footer of the page
 * Declaring the className as Footer
 * @Footer:these are the footer of the page
 * Importing react
 */

export default class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <footer>
          <h1 class="text-center">Find Us</h1>
          {/* <!-- Map --> */}
          <div class="footer-map"></div>

          <div class="container">
            <div class="row">
              <div class="col-sm-12 footer-info-item text-center">
                <p class="lead">31 Spooner Street, Quahog, Rhode Island</p>
                <h2>Contact Us</h2>
                <p class="lead">
                  <span class="glyphicon glyphicon-phone-alt"></span> +1(23) 456
                  7890
                  <br />
                  info@example.com
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Footer Links --> */}
          <div class="footer-info">
            <div class="container">
              <div class="row">
                {this.props.footerdata.map((recur) => (
                  <div class="col-sm-4 footer-info-item">
                    <h3>{recur.title}</h3>
                    <ul class="list-unstyled">
                      <li>
                        <a href=".">{recur.line1}</a>
                      </li>
                      <li>
                        <a href=".">{recur.line2}</a>
                      </li>
                      <li>
                        <a href=".">{recur.line3}</a>
                      </li>
                      <li>
                        <a href=".">{recur.line4}</a>
                      </li>
                      <li>
                        <a href=".">{recur.line5}</a>
                      </li>
                    </ul>
                  </div>
                ))}

                <div class="col-sm-4 footer-info-item">
                  <h3>
                    <span class="glyphicon glyphicon-list-alt"></span>{" "}
                    Newsletter
                  </h3>
                  <p>Sign up for exclusive offers.</p>
                  <div class="input-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Enter your email address"
                    />
                    <span class="input-group-btn">
                      <button class="btn btn-primary" type="button">
                        Subscribe!
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- /.row --> */}
            </div>
            {/* <!-- /.container --> */}
          </div>

          {/* <!-- Copyright etc --> */}
          <div class="small-print">
            <div class="container">
              <p>
                <a href=".">Terms &amp; Conditions</a> |{" "}
                <a href=".">Privacy Policy</a> | <a href=".">Contact</a>
              </p>
              <p>Copyright &copy; Example.com 2015 </p>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
