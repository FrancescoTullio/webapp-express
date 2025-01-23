const dbConnection = require("../data/films_db")

const index = (req, res) => {
    const sql = "SELECT * FROM `movies`"

    dbConnection.query(sql, (err, films) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: "ERRORE DEL SERVER"
            })
        }

        return res.status(200).json({
            status: "succes",
            data: films
        })
    })
}



const show = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM `movies` WHERE `id` = ?"

    const sqlReviws =   "SELECT * FROM movies INNER JOIN reviews ON movies.id = reviews.movie_id WHERE movies.id = ?"

    dbConnection.query(sql, [id], (err, arrayFilms) => {

        if(err) {
            return res.status(500).json({
                error: true,
                message: "ERRORE INTERNO DEL SERVER1"
            })
        }

        if (arrayFilms.length === 0) {
            return res.status(404).json({
                error: true,
                message: "FILM NON TROVATO"
            })
        }

        dbConnection.query(sqlReviws, [id], (err, arrayReviws) => {



            if(err) {
                return res.status(500).json({
                    error: true,
                    message: "ERRORE INTERNO DEL SERVER2"
                })
            }

            return res.status(200).json({
                status: "succes",
                data:{
                    ...arrayFilms[0],
                    arrayReviws 
                }
            })
        })

    })


}











module.exports = {
    index,
    show
}