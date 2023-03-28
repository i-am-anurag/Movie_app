const asyncHandler = require('../utils/async-handler');
const {getRequest,postRequest,patchRequest,deleteRequest} = require('../utils/request')

const createMovie = asyncHandler(async(req,res)=>{
    const requestData = {
        ...req.body,
        createdBy: req.user,
      };    
    const response = await postRequest('movie/create',requestData);

    return res.CREATED(response.body);
});

const userReview = asyncHandler(async(req,res)=>{
    const requestData = {
        ...req.body,
        userId: req.user._id,
    };
    const response = await patchRequest('movie/review',requestData)

    return res.OK(response.body);
});

const fetchMovies = asyncHandler(async(req, res) =>{
    // const requestData = {createdBy: req.user._id };
    const response = await getRequest('movie/getAll');

    return res.OK(response.body);
});

const getMyMovie = asyncHandler(async(req, res) =>{
    const userId = req.user._id;
    console.log("Request is comming on API_SERVICE controller");
    console.log("userId in controller is:",userId);
    const response = await getRequest('movie/mymovies',userId);

    return res.OK(response.body);
})
module.exports = {
    createMovie,
    userReview,
    fetchMovies,
    getMyMovie,
}