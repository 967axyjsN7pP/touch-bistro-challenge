function Error(props) {
  return React.createElement("p", {
    className: "error"
  }, props.message);
}

function Result(props) {
  return React.createElement("p", {
    className: "result"
  }, props.message);
}

function Status(props) {
  if (props.errorMessage) {
    return React.createElement(Error, {
      message: props.errorMessage
    });
  } else if (props.isFetching) {
    return React.createElement(Result, {
      message: "Fetching..."
    });
  } else if (props.medianPrimes.length > 1) {
    return React.createElement(Result, {
      message: `The median primes of ${props.limit} are ${props.medianPrimes.join(' and ')}`
    });
  } else if (props.medianPrimes.length === 1) {
    return React.createElement(Result, {
      message: `The median prime of ${props.limit} is ${props.medianPrimes[0]}`
    });
  }

  return null;
}

class App extends React.Component {
  constructor(props) {
    super(props);
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
    this.setState({
      limit: event.target.value
    });
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
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => Promise.reject(error));
      }

      return response.json();
    }).then(medianPrimes => {
      this.setState({
        isFetching: false,
        medianPrimes
      });
    }).catch(error => {
      this.setState({
        isFetching: false,
        errorMessage: error.message
      });
    });
  }

  render() {
    return React.createElement("div", null, React.createElement("h1", null, "TouchBistro Challenge AppFoo Bar Baz"), React.createElement("form", {
      onSubmit: this.handleSubmit
    }, React.createElement("label", {
      htmlFor: "Limit"
    }, "Enter a limit to get its median prime(s):"), React.createElement("div", {
      className: "input-wrapper"
    }, React.createElement("input", {
      id: "Limit",
      onChange: this.handleLimitChange,
      placeholder: "Limit",
      type: "number",
      value: this.state.limit
    }), React.createElement("button", {
      type: "submit"
    }, "GET")), React.createElement(Status, this.state)));
  }

}

ReactDOM.render(React.createElement(App, null), document.getElementById('App'));