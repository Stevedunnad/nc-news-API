const express = require("express");
const app = express();
const apiRouter = require("./routes/api.router");
const { handlePSQL400s, handleCustomErrors, handle500s } = require('./errors')

app.use(express.json());
app.use("/api", apiRouter);

app.all('*', (req, res, next) => {
  res.status(404)
  .send({msg: 'This path does not exist'})
});

app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handle500s); //catch all errors

module.exports = app;
