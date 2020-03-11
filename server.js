const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/save-kitchen', async (req, res) => {

    try {
        if (!fs.existsSync('json')){
            fs.mkdirSync('json')
        }
        const kitchenPlanToSave = JSON.stringify(req.body);
        await fs.promises.writeFile(`json/${req.body.planName}.json`, kitchenPlanToSave);
            res.sendStatus(204);
    } catch (error) {
        res.status(500).send(`error when saving to the file due to: ${error}`)
    }
});

app.listen(9001, () => console.log('kitchen planner running successfully on port 9001'));

