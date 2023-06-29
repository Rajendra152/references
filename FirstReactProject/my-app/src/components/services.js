import React,{Component} from 'react';


/**
 * This section contains the services of the page
 * Declaring the className as Services
 * @Services:these are the services of the page
 */

export default class Services extends Component {
    constructor(props) {
        super(props);
        this.state ={}
    }
    render(){
        return(
        <div class="container text-center">
		   <h1>Unparalleled Service</h1>
		   <p class="lead">Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. Holistically pontificate installed base portals after maintainable products without collateral.</p>
		   <img class="img-responsive img-circle center-block" src="images/service.jpg" alt=""/>
        </div>

        );
    }
}