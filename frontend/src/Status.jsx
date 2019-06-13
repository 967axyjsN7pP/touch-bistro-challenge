import React from "react";

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

export default Status;
