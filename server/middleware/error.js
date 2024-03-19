import winston from "winston";

export default function (err, req, res, next) {
  winston.error(err.message);
  console.log(err.message);

  res.status(500).send("Something went wrong.");
}
