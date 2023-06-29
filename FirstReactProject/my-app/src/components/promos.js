import React,{Component} from 'react';


/**
 * This section contains promos of the page
 * Declaring the className as Promos
 * @Promos:this is the promos of the page
 */

export default class Promos extends Component {

    render() {
        return (
            <>
            {/* <!-- Promos --> */}
	<div class="container-fluid">
        <div class="row promo">
         {
          this.props.promosdata.map(recur=>(
            <a href=".">
                <div class={`col-md-4 promo-item ${recur.img}`}>
                  <h3>
                    {recur.title}
                  </h3>
                </div>
            </a>

            ))
         }
        </div>
    </div>

        	</>
        )
    }
}