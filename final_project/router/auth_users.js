const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
	//returns boolean
	//write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
	const isAuth = users.filter(
		(user) => user.password === password && user.username === username
	);

	return !!isAuth;
};

regd_users.post("/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.username;
	if (!username || !password)
		return res.status(400).json({ message: "Invalid payload" });

	const isAuth = authenticatedUser(username, password);

	if (isAuth) {
		let accessToken = jwt.sign(
			{
				data: password,
			},
			"access",
			{ expiresIn: 60 * 60 }
		);

		req.session.authorization = {
			accessToken,
			username,
		};
		return res.status(200).send("User successfully logged in");
	} else return res.status(400).json({ message: "Error" });
});

regd_users.put("/auth/review/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const username = req.session.authorization.username;
	const review = req.query.review;
	const bookReviews = books[isbn].review ?? {};

	bookReviews[username] = {
		review,
	};

	return res.status(200).json({ message: "Successfully added" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const username = req.session.authorization.username;
	const bookReviews = books[isbn].review ?? {};

	delete bookReviews[username];

	return res.status(200).json({ message: "Review deleted" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
