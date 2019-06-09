const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    const limit = Number(req.query.limit)
    // TODO: Validate `limit`. (bounds?)
    if (Number.isNaN(limit) || !Number.isInteger(limit)) {
        return res.status(400).send('Bad Request');
    }

    // TODO: Compute actual result from limit query.
    const result = {
        limit,
        medianPrimes: [3, 5]
    };

    res.status(200).json(result);
});

app.listen(port, () => {
    console.log(`Touch Bistro Challenge App listening on port ${port}`);
});
