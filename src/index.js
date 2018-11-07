import React, { Component } from "react";
import ReactDom from "react-dom";
import ChatBoard from "./chatboard";

class App extends Component {
    render() {
        return(
            <div>
                <p>Chat Board</p>
                <ChatBoard />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById("index"));