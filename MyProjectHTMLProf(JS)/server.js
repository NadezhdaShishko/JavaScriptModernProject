const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/goods', (req, res) => {
    fs.readFile('./db/goods.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            res.send('Произошла ошибка');
        }

        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server has been started');
})