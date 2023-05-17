const validateMovie = (movie) => {
  if (!movie) {
    return ["No movie object"];
  }

  const errors = [];
  console.log(movie);

  if (!movie.Title || movie.Title.trim().length === 0) {
    errors.push("Movie Title is required");
  }
  if (!movie.Year || movie.Year.trim().length !== 4) {
    errors.push("Movie Year must be a four digit number");
  } else {
    const intYear = parseInt(movie.Year);
    if (intYear === NaN) errors.push("Year must be a number");
    if (new String(intYear).length !== 4)
      errors.push("Year must be a four digit number");
  }
  if (!movie.Released || movie.Released.trim().length === 0) {
    errors.push("Movie Released is required");
  }
  if (!movie.Genre || movie.Genre.trim().length === 0) {
    errors.push("Movie Genre is required");
  }

  return errors;
};

module.exports = validateMovie;
