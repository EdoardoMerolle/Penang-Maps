const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000; // You can use any available port here

// Enable CORS for all requests
app.use(cors());

const connection = mysql.createConnection({
    host: 'database-1.cz4iw8ki2umc.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Group33!?', // Replace with your actual password
    database: 'Group33', // Your database name
    // Port for the MySQL connection, if it's not the default 3306
});

app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Locations API');
});

app.get('/hotels', (req, res) => {
    connection.query("SELECT * FROM Location WHERE Type = 'Hotel'", (err, results) => {
        if (err) {
            console.error('Error fetching locations from database:', err);
            res.status(500).send('Error fetching locations from database');
            return;
        }
        res.json(results);
    });
});

app.get('/homestays', (req, res) => {
    connection.query("SELECT * FROM Location WHERE Type = 'Homestay'", (err, results) => {
        if (err) {
            console.error('Error fetching locations from database:', err);
            res.status(500).send('Error fetching locations from database');
            return;
        }
        res.json(results);
    });
});

app.get('/latlong', (req, res) => {
    console.log('Received request for /latlong');
    connection.query("SELECT Latitude, Longitude FROM Rainfall", (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        console.log('Sending data:', results);
        res.json(results);
    });
});

app.get('/nearbySearch', async (req, res) => {
    const location = req.query.location;
    const radius = 1000;
    const apiKey = 'AIzaSyCmZt_kS_dPRBJm27M_eNmhct65esRWK-o';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching nearby locations:', error);
        res.status(500).send('Error fetching nearby locations');
    }
});


app.get('/rainfall', (req, res) => {
    // Extract the query parameters
    const {rcpValue, year, month, } = req.query; // rcpValue is something like 'RCP_2.6'

    // Validate the rcpValue to ensure it's allowed
    const validTables = ['RCP_2_6', 'RCP_4_5', 'RCP_6_0', 'RCP_8_5'];
    if (!validTables.includes(rcpValue)) {
        return res.status(400).send('Invalid RCP table selection');
    }

    const query = `SELECT Latitude, Longitude, Rainfall FROM ${rcpValue} WHERE Year = ? AND Month = ?;`;
    connection.query(query, [year, month], (err, results) => {
        if (err) {
            console.error('Error fetching rainfall data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});