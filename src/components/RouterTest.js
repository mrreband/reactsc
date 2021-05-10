import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

class RouterTest extends React.Component {
  render() {
    return (
        <BrowserRouter>
            <Link to="/waves">Waves</Link>
        </BrowserRouter>
    );
  }
}

export default RouterTest;
