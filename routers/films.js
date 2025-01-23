const express = require("express");
const filmController = require("../controller/filmsController");

const router = express.Router();


// index

router.get("/", filmController.index);

router.get("/:id", filmController.show);












// export

module.exports = router;