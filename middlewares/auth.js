function checkAuth(req, res, next) {
    if(0){
        return res.status(400).json({
            status:'fail',
            message:'Missing price!!!'
        })
    }
    next();
}
module.exports = checkAuth;