# Fibonacci Rest API

to run the api locally
```shell
$ npm i && node ./index.js
```

The api comes with a simple cache to increase the response time by not recalculate values already calculated.

Also I added a middleware function that evaluates if the given index is a number, if it is not the request is abort and the api will responded with a 400 BAD_REQUEST