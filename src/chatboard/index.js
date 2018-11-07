import React, { Component } from "react";
import io from "socket.io-client";
import "./style.css";

class Chatboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    };

    componentDidMount() {
        this.socket = io("/");
        this.socket.on("message", message => {
            this.setState({ messages: [message, ...this.state.messages] })
        });
    }

    handleSubmit = (event) => {
        const body = event.target.value;
        if (event.keyCode === 13 && body) {
            const message = {
                body,
                from: 'Me' 
            };
            this.setState({ messages: [message, ...this.state.messages] });
            this.socket.emit("message", body);
            event.target.value = "";
        }
    };
    
    render() {
        const messages = this.state.messages.map((message, index) => {
            return (
            <li key={ index } className="message-area">
                <span className="sender">{ message.from }</span>:  <span className="message">{message.body}</span>
            </li> )
        });
        return (
            <div className="main">
                <input type="text" placeholder="Enter a message.." onKeyUp={ this.handleSubmit } className="input-area" />
                <br />
                { messages }
            </div>
        )
    }
};

export default Chatboard;