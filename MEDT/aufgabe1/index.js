/**
 * @author Matthias Hrbek
 */

import {exoplanetsModel} from "./exoplanetsModel.js";
import express from 'express';
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.get('/exoplanets', (request, response) => {
    response.status(200).json(exoplanetsModel.exoplanets);
    console.log('/exoplanets')
});

app.get('/exoplanets/:id', (request, response) => {
    const id = parseInt(request.params.id); // Convert the id parameter to an integer
    if (!isNaN(id) && id >= 0 && id < exoplanetsModel.exoplanets.length) {
        const firstExoplanet = exoplanetsModel.exoplanets[id - 1];
        response.status(200).json(firstExoplanet);
    } else {
        response.status(404).send('Exoplanet not found'); // Handle invalid or out-of-range id
    }
});

app.post('/exoplanets', (req, res) => {
    res.send('{\n' +
        '            id: 2,\n' +
        '            planet_name: \'Uhhh c\',\n' +
        '            hostname: \'Uhhh-47\',\n' +
        '            planet_letter: \'c\'\n' +
        '        }')
})

// Route for updating an existing exoplanet by ID using PUT
app.put('/exoplanets/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const updatedExoplanet = request.body;

    // Find the exoplanet in the model by ID
    const exoplanetToUpdate = exoplanetsModel.exoplanets.find((exoplanet) => exoplanet.id === id);

    if (!exoplanetToUpdate) {
        response.status(404).send('Exoplanet not found'); // Handle when the exoplanet with the given ID is not found
    } else {
        // Update the exoplanet with the new data (hardcoded changes)
        exoplanetToUpdate.planet_name = 'updatedExoplanet.planet_name';
        exoplanetToUpdate.hostname = 'updatedExoplanet.hostname';
        exoplanetToUpdate.planet_letter = 'updatedExoplanet.planet_letter';

        response.status(200).json(exoplanetToUpdate); // Respond with the updated exoplanet
    }
});


app.delete('/exoplanets/:id', (request, response) => {
    const id = parseInt(request.params.id);

    // Find the index of the exoplanet in the model by ID
    const exoplanetIndexToDelete = exoplanetsModel.exoplanets.findIndex((exoplanet) => exoplanet.id === id);

    if (exoplanetIndexToDelete === -1) {
        response.status(404).send('Exoplanet not found'); // Handle when the exoplanet with the given ID is not found
    } else {
        // Remove the exoplanet from the exoplanetsModel by its index
        exoplanetsModel.exoplanets.splice(exoplanetIndexToDelete, 1);

        response.status(204).send(); // Respond with a 204 (No Content) status to indicate successful deletion
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
