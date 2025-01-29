const express = require("express");
const filmController = require("../controller/filmsController");

const router = express.Router();


// index

router.get("/", filmController.index);

router.get("/:id", filmController.show);


// store
router.post("/", bookController.store);











// export

module.exports = router;