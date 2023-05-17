const express = require("express");
const router = express.Router();
const bondData = require("../bondData");
const validateMovie = require("../helpers/movieValidator");

let movies = bondData;

router.get("/", (req, res) => {
  res.json(movies);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const query = req.query;
  console.log("req.params", req.params);
  console.log("id, query", id, query);

  const movie = movies.find((film) => film.imdbID === id);

  if (!movie) {
    return res
      .status(404)
      .json({ message: "Ingen Bond film med det id:t kunde hittas!" });
  }
  res.json(movie);
});

let nextId = 28457;

router.post("/", (req, res) => {
  const movie = req.body;
  //console.log(req.body);
  const errors = validateMovie(movie);
  if (errors.length !== 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  nextId++;

  const newMovie = {
    ...movie,
    imdbID: "tt" + nextId,
  };
  console.log("newMovie", newMovie);

  // Lägg till den nya filmen
  movies = [...movies, newMovie];
  //console.log(movies);

  // returnera ett json objekt till klienten med den nyligen tillagda filmen
  res.status(201).json(newMovie);
});

router.put("/:id", (req, res) => {
  console.log("req body", req.body);
  const id = req.params.id;
  const movieEdit = req.body;
  console.log("id & character", { id, movieEdit });

  // kolla om id:t finns i vår lista av filmer
  const index = movies.findIndex((movie) => movie.imdbID === id);
  console.log("index", index);

  // om den inte finns, returnera 404
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "Ingen film med det id:t hittades!" });
  }

  // om den finns, uppdatera objektet
  const movieUpdate = { ...movies[index], ...movieEdit };

  const errors = validateMovie(movieUpdate);
  if (errors.length !== 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  console.log("movie", movies[index]);
  console.log("movie updated", movieUpdate);
  movies[index] = movieUpdate;

  // returnera den uppdaterade filmen
  res.json(movieUpdate);

  // PUT requests should return 204 No Content
  //res.status(204).send();
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((movie) => movie.imdbID === id);
  console.log("movie", movie);

  if (!movie) {
    return res
      .status(404)
      .json({ message: "Ingen film med det id:t hittades!" });
  }

  const newBondData = movies.filter((movie) => movie.imdbID !== id);
  console.log("New bondData[0]", newBondData[0]);
  movies = newBondData; // tar bort filmen ur bondData

  res.json({ message: `Filmen ${movie.Title} är borttagen.` });
});

module.exports = router;
