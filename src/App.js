import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import SoundList from "./SoundList";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <SoundList />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
