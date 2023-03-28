const asyncHandler = require('../utils/async-handler');
const movieService = require('../services/movie');

const createMovie = asyncHandler(async(req,res)=>{
    const requestData = {...req.body};
    const response = await movieService.createMovie(requestData);

    return res.json(response);
});

const userReview = asyncHandler(async(req,res)=>{
    const requestData = {...req.body};
    console.log("In movie Controller:",requestData);
    const response = await movieService.userReview(requestData);

    return res.json(response.body);
});

const fetchMovies = asyncHandler(async(req, res) =>{
    const movieRecords = await movieService.fetchMovies();

    return res.json(movieRecords);
});

const getMyMovie = asyncHandler(async(req, res) =>{
    const userId = req.headers.userid;
    console.log("userId is: ",userId);
    console.log("In get movies:",requestData);
    const movieRecords = await movieService.fetchOwnMovie(requestData);

    return res.json(movieRecords);
});

module.exports = {
    createMovie,
    userReview,
    fetchMovies,
    getMyMovie,
}