const fs = require('fs');

fs.readFile('./db/goods.json', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }

    const goods = JSON.parse(data);
});