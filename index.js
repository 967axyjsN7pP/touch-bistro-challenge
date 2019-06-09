const express = require('express');
const app = express();
const port = 8080;

// Note: Assumes an ordered Array.
const getMedians = orderedNums => {
    if (!Array.isArray(orderedNums)) {
        throw new Error('Invalid Argument: `orderedNums must be an Array.');
    }

    const length = orderedNums.length;
    const startIndex = Math.floor((length - 1) / 2);
    const isLengthOdd = length & 1;
    const endIndex = startIndex + (isLengthOdd ? 1 : 2);

    return orderedNums.slice(startIndex, endIndex);
};

// See:
// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
// https://stackoverflow.com/a/15471749
const getPrimes = limit => {
    const FIRST_PRIME = 2;

    if (!Number.isInteger(limit)) { throw new Error('Invalid Argument: `limit` must be an Integer'); }
	if (limit <= FIRST_PRIME) { throw new Error('Invalid Argument: `limit` must be greater than 2.'); }

    const result = new Array(limit).fill(true);
    const squareRootOfLimit = Math.floor(Math.sqrt(limit));

    result[0] = false;
    result[1] = false;

    for (let i = FIRST_PRIME; i <= squareRootOfLimit; i += 1) {
        if (!result[i]) { continue; }
        for (let j = i * i; j < limit; j += i) {
            result[j] = false;
        }
    }

    return result.reduce((acc, el, index) => {
        if (el) {
            acc.push(index)
        }
        return acc;
    }, []);
};

app.get('/', (req, res) => {
    const limit = Number(req.query.limit)
    // TODO: Validate `limit`. (bounds?)
    if (Number.isNaN(limit) || !Number.isInteger(limit)) {
        return res.status(400).send('Bad Request');
    }

    const primes = getPrimes(limit);
    const result = {
        limit,
        medianPrimes: getMedians(primes),
        primes
    };

    res.status(200).json(result);
});

app.listen(port, () => {
    console.log(`Touch Bistro Challenge App listening on port ${port}`);
});
