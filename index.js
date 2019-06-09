const express = require('express');
const app = express();
const port = 8080;

app.get('/', (_req, res) => {
    // TODO: Compute actual result from limit query.
    const result = {
        limit: 10,
        medianPrimes: [3, 5]
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.listen(port, () => {
    console.log(`Touch Bistro Challenge App listening on port ${port}`);
});
