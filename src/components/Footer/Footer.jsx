import React from 'react';
import './Footer.css';
import upArrow from '../../img/footer/up-arrow.png'
import downArrow from '../../img/footer/down-arrow.png'
 
export default class Footer extends React.Component {
  render() {
    return(
        <div className="footer-container">
            <div className ="down-arrow-image-section">
                <a id="expandGlobalSearch" href = "#global-search">
                    <img src={ downArrow } 
                        alt="Click to expand" 
                        align="middle" 
                        title ="Click here for Global Search" 
                    />
                </a>
            </div>
            
            <div className="up-arrow-image-section">
                <a id="collapseGlobalSearch" href = "#global-search">
                    <img src={ upArrow } 
                        alt="Click to collapse" 
                        align="middle" 
                        title ="Click here to Collapse" 
                    />
                </a>
            </div>
        </div>
    )
  }
}
