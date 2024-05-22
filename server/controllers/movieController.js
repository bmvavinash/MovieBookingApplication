const movies = require('../data/movies');
const users = require('../data/users');

const getMovies = (req, res) => {
    res.json({ movies: Object.keys(movies) });
};

const getSeats = (req, res) => {
    const { movie } = req.params;
    const { username } = req.query;
    if (!users[username] || !movies[movie]) {
        console.log("Error in movieController")
        return res.status(404).json({ error: "Not found" });
    }

    const userBookings = users[username].bookings[movie] || [];
    const availableSeats = movies[movie].seats.map((seat, index) => (seat === null || seat === username) ? index : null);

    res.json({ availableSeats, userBookings });
};


module.exports = { getMovies, getSeats };
