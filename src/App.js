import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
 
export default class App extends React.Component {
  render() {
    return(
        <div>
            <Header />
            <h1>Hello World!</h1>
            <Footer name="Footer" />
        </div>
    )
  }
}
