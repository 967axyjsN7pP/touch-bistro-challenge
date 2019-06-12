const express = require('express');
const logic = require('./logic');

const Constants = {
    FIRST_PRIME: logic.FIRST_PRIME
};
const getMedians = logic.getMedians;
const getPrimes = logic.getPrimes;

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/api', (req, res) => {
    const limit = Number(req.query.limit);
    const isLimitValid = !Number.isNaN(limit) && Number.isInteger(limit) && limit > Constants.FIRST_PRIME;

    if (!isLimitValid) {
        return res
            .status(400)
            .json({
                code: 'invalid-limit',
                message: `\`limit\` is required and must be an Integer greater than ${Constants.FIRST_PRIME}.`
            });
    }

    res.status(200).json(getMedians(getPrimes(limit)));
});

app.listen(port, () => {
    console.log(`Touch Bistro Challenge App listening on port ${port}`);
});
