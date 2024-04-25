const errorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        const message = `Invalid JSON in request body: ${err.message}`;
        res.status(400).json({ message });
        console.log(err);
        return;
    }

    const message = err.message;
    console.error(err.stack);
    res.status(400).json({ message });
}

module.exports = {
    errorHandler
};