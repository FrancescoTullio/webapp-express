const express = require("express");
const filmsRouter = require("./routers/films")
const app = express();
const port = process.env.SERVER_PORT;
app.use(express.static("public"));
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173/"
  }))

app.use("/films", filmsRouter)


app.get("/", (req,res) => {
    return res.json({
        statur: "ok",
        messaggio: "benvenuto utente"
    })
})


app.listen (port, () => {
    console.log("server partito")
})