import React, { Component } from "react";

/**
 * This section contains the features of the page
 * Declaring the className as Features
 * @Features:these are the features of the page
 * Importing react
 */

export default class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {/* <!--Features--> */}
        <div class="jumbotron feature">
          <div class="container">
            <h1>
              <span class="glyphicon glyphicon-equalizer"></span> Dramatically
              Engage
            </h1>
            <p>
              Objectively innovate empowered manufactured products whereas
              parallel platforms.
            </p>
            <p>
              <a class="btn btn-primary" href=".">
                Engage Now
              </a>
            </p>
          </div>
        </div>
      </>
    );
  }
}
