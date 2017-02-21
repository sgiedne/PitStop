import React from 'react';
import './Header.css'
import header from '../../img/header/header_text.png'
 
export default class Header extends React.Component {
  render() {
    return(
        <div className="header-container">
            <img className="header-image" src={ header } />
        </div>
    )
  }
}
