const movies = require('../data/movies');
const users = require('../data/users');

const bookSeats = (req, res) => {
    const { username, movie, seats } = req.body;
    if (!users[username] || !movies[movie]) {
        return res.status(404).json({ error: "Not found" });
    }

    const userBookings = users[username].bookings[movie] || [];
    seats.forEach(seat => {
        if (movies[movie].seats[seat] === null || movies[movie].seats[seat] === username) {
            movies[movie].seats[seat] = username;
            if (!userBookings.includes(seat)) {
                userBookings.push(seat);
            }
        }
    });

    users[username].bookings[movie] = userBookings;
    res.json({ success: true });
};


module.exports = { bookSeats };
