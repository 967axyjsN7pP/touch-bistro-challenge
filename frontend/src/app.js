function Error(props) {
    return <p className="error">{props.message}</p>;
}

function Result(props) {
    return <p className="result">{props.message}</p>;
}

function Status(props) {
    if (props.errorMessage) {
        return <Error message={props.errorMessage} />;
    }
    else if (props.isFetching) {
        return <Result message="Fetching..." />;
    }
    else if (props.medianPrimes.length > 1) {
        return <Result message={`The median primes of ${props.limit} are ${props.medianPrimes.join(' and ')}`} />;
    }
    else if (props.medianPrimes.length === 1) {
        return <Result message={`The median prime of ${props.limit} is ${props.medianPrimes[0]}`} />;
    }

    return null;
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            isFetching: false,
            limit: '',
            medianPrimes: []
        };

        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLimitChange(event) {
        this.setState({ limit: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            errorMessage: '',
            isFetching: true,
            limit: this.state.limit,
            medianPrimes: []
        });

        fetch(`/api?limit=${this.state.limit}`, {
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
                            value={this.state.limit}
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
