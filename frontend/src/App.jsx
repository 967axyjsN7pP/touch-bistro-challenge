import React, { Component } from "react";
import ReactDOM from "react-dom";
import Status from './Status.jsx';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            isFetching: false,
            limit: '',
            limitQuery: '',
            medianPrimes: [],
            resultLimit: ''
        };

        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLimitChange(event) {
        this.setState({ limitQuery: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            errorMessage: '',
            isFetching: true,
            limit: '',
            medianPrimes: []
        });

        fetch(`/api?limit=${this.state.limitQuery}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        })
        .then(response => {
            if (!response.ok) {
                return response.json()
                    .then(error => Promise.reject(error));
            }
            return response.json();
        })
        .then(medianPrimes => {
            this.setState({
                isFetching: false,
                limit: this.state.limitQuery,
                medianPrimes
            });
        })
        .catch(error => {
            this.setState({
                isFetching: false,
                errorMessage: error.message
            });
        });
    }
  
    render() {
        return(
            <div>
                <h1>TouchBistro Challenge AppFoo Bar Baz</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="Limit">Enter a limit to get its median prime(s):</label>
                    <div className="input-wrapper">
                        <input
                            id="Limit"
                            onChange={this.handleLimitChange}
                            placeholder="Limit"
                            type="number"
                            value={this.state.limitQuery}
                        />
                        <button type="submit">GET</button>
                    </div>
                    <Status {...this.state} />
                </form>
            </div>
        );
    }
 }

ReactDOM.render(
    <App />,
    document.getElementById('App')
);
