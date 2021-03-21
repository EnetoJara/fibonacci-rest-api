const express = require('express');

const app = express();
/**
 * @type {Record<string,number>} - stores alrady calculacted values.
 */
let cache = {};

/**
 * Computes the fibonacci value by a given index.
 *
 * @param {number} current - index of the numeric value you want to get the value of.
 * @returns {number} computed value.
 */
const fib = (current) => {
	if(current > 1){
		return fib(current-1) + fib(current-2)
	} else {
		return current;
	}
}

/**
 * Middleware to abort the request by a non numeric parameter.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
function isNan (req, res, next) {
    const {index} = req.params;
    const isNum = Number(index) === Number(index);

    isNum ? next() : res.status(400).send({err: "not a nomber"})
}

/**
 * resolves the endpoint for **route** `/:index`
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response<number>}
 */
 function index (req, res) {
    const {index} = req.params;
    const  cached = cache[index];

    if (cached) {
        return res.status(200).send({value:cached});
    }

    const computed = fib(Number(index))
    cache[index] = computed;
    return res.status(200).send({value:computed});
}

app.get("/:index", [isNan], index);

app.listen(3000,() =>console.log("Listening on port: "+3000))