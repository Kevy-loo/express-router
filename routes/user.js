const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

let users = [
	{
		name: "User 1",
		age: 30,
	},
	{
		name: "User 2",
		age: 45,
	},
	{
		name: "User 3",
		age: 27,
	},
	{
		name: "User 4",
		age: 22,
	},
];

router.get("/", async (req, res) => {
	res.json(users);
});

router.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const user = users[id - 1];
	res.json(user);
});

router.post("/", [check("name").not().isEmpty().trim()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() });
	} else {
		const { name, age } = req.body;

		const newUser = {
			name,
			age,
		};

		users.push(newUser);

		res.json(users);
	}
});

router.put("/:id", (req, res) => {
	const id = parseInt(req.params.id);

	const { name, age } = req.body;

	if (name) users[id - 1].name = name;
	if (age) users[id - 1].age = age;

	res.json(users[id - 1]);
});

router.delete("/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	users.splice(id - 1, 1);
	res.send("deleted");
});
module.exports = router;
