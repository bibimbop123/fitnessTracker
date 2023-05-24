const PORT = 3000;
const express = require("express");
const server = express();
const { client } = require("./db/client");

client.connect();

server.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

// Middleware
const morgan = require("morgan");
server.use(morgan("dev"));
server.use(express.json());

server.use((req, res, next) => {
  console.log("<____Body Log START____>");
  // console.log(req.body);
  // console.log("<_____Body Log END_____>");
  next();
});
// Routes handler
server.use("/api", require("./routes"));

// Error Handler
server.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});
