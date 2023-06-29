import React,{Component} from 'react';


/**
 * This section contains the heading of the page
 * Declaring the className as Heading
 * @Heading:this is the heading of the page
 */

export default class Heading extends Component {
    constructor(props) {
        super(props);
        this.state ={}
    }
    render(){
        return(
            <>
              {/* <!-- Heading --> */}
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1 class="text-center">Superior Quality</h1>
                <p class="lead text-center">Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. Holistically pontificate installed base portals after maintainable products without collateral.</p>
            </div>
        </div>
    </div>

        </>
        )
    }
}