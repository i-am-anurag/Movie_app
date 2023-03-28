const Movie = require('../models/movie');
const ErrorResponse = require('../utils/error');
const ErrorCodes = require('../utils/status-code');

const createMovie = async(data)=>{
    const movieRecord = await Movie.create(data);

    return movieRecord;
}


const userReview = async (reviewData) => {
  const movieRecord = await Movie.findById(reviewData.movieId);
  console.log(movieRecord);
  if(!movieRecord)
        throw ErrorResponse('Movie not found',ErrorCodes.BAD_REQUESET);

  movieRecord.review.push({
    comment: reviewData.comment,
    rating: reviewData.rating,
    respondTime: new Date(),
    userId:reviewData.userId,
  });

  await movieRecord.save();

  return movieRecord;
};

const fetchMovies = async()=>{
    const movieRecord = await Movie.find().populate('MovieCasts');

    return movieRecord;
}

const fetchOwnMovie = async(createdBy)=>{
  const movieRecord = await Movie.find(createdBy).populate('MovieCasts');

  return movieRecord;
}
module.exports = {
    createMovie,
    userReview,
    fetchMovies,
    fetchOwnMovie,
}