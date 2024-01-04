function validateData(req, res, next) {
    //console.log(req.body);
    const {username, title, content} = req.body;

    if (!username || !title||!content) {
        return res.status(400).json({error: "Missing required field"})
    }

    next();
}

module.exports = validateData;