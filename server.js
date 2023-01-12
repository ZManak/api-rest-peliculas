require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');


const app = express()
const port = 3000
const API_KEY = process.env.API_KEY;
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})

app.get('/api/film/:title?', async (req, res) => {
    try {
        let response = await fetch(`http://www.omdbapi.com/?t=${req.params.title}&apikey=${API_KEY}`); //{}
        let film = await response.json();
        res.status(200).json(film);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
);

app.post('/api/film', async (req, res) => {
    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const newFilm = req.body; // {} nuevo producto a guardar

    /*let response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFilm)
    })
    let answer = await response.json(); // objeto de vuelta de la petición
    console.log("Este es el console.log de lo que devuelve la api", answer);*/

    res.status(201).json({
        msj: `Pelicula ${newFilm.title} guardada en el sistema.`
    });
});