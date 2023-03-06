const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(`${process.env.ID}`);

// - App config
const app = express();

// - Middlewaress

app.use(cors());
app.use(express.json());

// Listen command

app.get("/", (Request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
	const total = request.query.total;

	console.log("payments Request Recieved for this amount>>>", total);
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total, //subunits of the currency
			currency: "usd",
			payment_method_types: ["card"],
		});
		//Ok _Created
		response.status(201).json({
			clientSecreat: paymentIntent.client_secret,
		});
	} catch (error) {
		console.log(error.message);
	}
});
app.listen(10000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("listning 10000");
	}
});
