const express = require('express');
const visitorsRouter = express.Router();
const fs = require('fs');
const path = require('path');

visitorsRouter.post('/updateCounts', async(request, response) => {
    try{
        const {country, state, city, zip, ip} = request.body;
        const json = fs.readFileSync('count.json', 'utf-8');
        const obj = JSON.parse(json);

        obj.visits = obj.visits+1;
        if(request.query.type === 'new-visitor'){
            obj.visitors = obj.visitors+1;
            console.log(country, state, city, zip, ip);
            const csvData = `${country},${state},${city},${zip},${ip}\n`;
            const csvFilePath = path.join(__dirname, 'visitors.csv');
            fs.appendFileSync(csvFilePath, csvData);
        }

        const newJson = JSON.stringify(obj);
        fs.writeFileSync('count.json', newJson);

        response.status(200).send({'message': 'updated'});
    }catch(error){
        console.log(error);
        response.status(400).send({"error": error});
    }
});

visitorsRouter.get('/getCounts', async(request, response) => {
    try{
        const json = fs.readFileSync('count.json', 'utf-8');
        const obj = JSON.parse(json);

        response.status(200).send({'visits': obj.visits, "visitors": obj.visitors});
    }catch(error){
        response.status(400).send({"error": error});
    }
});

visitorsRouter.get('/downloadCsv', async(request, response) => {
    const csvFilePath = path.join(__dirname, 'visitors.csv');

    fs.access(csvFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send({ error: 'File not found' });
        }

        response.setHeader('Content-Type', 'text/csv');
        response.setHeader('Content-Disposition', 'attachment; filename=visitors.csv');

        const readStream = fs.createReadStream(csvFilePath);
        readStream.pipe(response);
    });
});

module.exports = visitorsRouter;