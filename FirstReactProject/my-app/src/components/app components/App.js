//Importing local components

import './App.css';                        
import NavbarComponent from "../navbarComponent";                        
import Features from "../features";                  
import Heading from "../heading";                     
import Promos from "../promos";                        
import Products from "../products";                    
import Services from "../services";                    
import FooterComponent from "../footerComponent";                         
import React,{Component} from 'react';                            

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        promo:[{
            img:'item-1',title:'Unleast'
        },{img:' item-2',title:'Synergize'},{img:'item-3',title:'Procrastinate'}],
        featuredproducts:[{
          img:"images/pepper.jpg" ,title:"premium Niche",para:"Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.",
          price:"$10.45",cart:"1"
        },{img:"images/jars.jpg" ,title:"Handy Holistic",para:"Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.",
        price:"$24.99",cart:"1"},{img:"images/pot.jpg" ,title:"Seamless Strategic",para:"Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.",
        price:"$11.50",cart:"1"},{img:"images/teapot.jpg" ,title:"Handy Holistic",para:"Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.",
        price:"$45.50",cart:"1"}],

        footer:[{title:"Information",line1:"About Us",line2:"Customer Service",line3:"Privacy Policy",line4:"Sitemap",line5:"Orders & Returns"},
        {title:"My Account",line1:"Sign In",line2:"View Cart",line3:"My Wishlist",line4:"Track My Order",line5:"Help"}]
    }
  }
  //passing array of components as props
render(){                                          
  return (                                //returning components into app
    <>                                  
    <NavbarComponent />
    <Features />
    <Heading />
    <Promos promosdata = {this.state.promo} />
    <Products productsdata = {this.state.featuredproducts} />
    <Services />
    <FooterComponent footerdata = {this.state.footer} />
    </>
  );
}
}

//exporting the app
export default App;                               