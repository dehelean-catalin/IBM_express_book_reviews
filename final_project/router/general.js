const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	const password = req.body.password;
	const username = req.body.username;

	if (!username || !password)
		return res.status(400).json({ message: "Invalid payload" });

	const usernameExist = users.find((user) => user.username === username);

	if (usernameExist)
		return res.status(400).json({ message: "Username already used" });

	users.push({ password, username });

	return res.status(200).json({ message: "Registerd successfully" });
});

public_users.get("/", function (req, res) {
	let books;
	let myPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Promise resolved");
		}, 100);
	});

	myPromise.then(() => (books = JSON.stringify(books, null, 4)));

	return res.status(200).json(books);
});

public_users.get("/isbn/:isbn", function (req, res) {
	const isbn = req.params.isbn;
	let searchedBook;
	if (!isbn) return res.status(400).json({ message: "Error" });
	let myPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Promise resolved");
		}, 100);
	});

	myPromise.then(() => (searchedBook = books[isbn]));

	return res.status(200).json(searchedBook);
});

public_users.get("/author/:author", function (req, res) {
	const author = req.params.author;
	let searchedBook = [];

	let myPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Promise resolved");
		}, 100);
	});

	myPromise.then(() =>
		Object.keys(books).forEach((key) => {
			if (books[key].author === author) searchedBook.push(books[key]);
		})
	);

	return res.status(200).json(searchedBook);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	const title = req.params.title;
	let searchedBook = [];
	let myPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Promise resolved");
		}, 100);
	});

	myPromise.then(() =>
		Object.keys(books).forEach((key) => {
			if (books[key].title === title) searchedBook.push(books[key]);
		})
	);
	return res.status(200).json(searchedBook);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
	const isbn = req.params.isbn;

	return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
