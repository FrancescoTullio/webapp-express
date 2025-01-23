const express = require("express");
const filmsRouter = require("./routers/films")
const app = express();
const port =3000



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