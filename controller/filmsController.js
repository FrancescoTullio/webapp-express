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






const storeReview = (req, res, next) => {
    const movieId = req.params.id;
    const { name, vote, text } = req.body;
    console.log(name, vote, text, bookId);
  
    // Validation
    if (isNaN(vote) || vote < 0 || vote > 5) {
      return res.status(400).json({
        status: "fail",
        message: "Il voto deve essere valore numerico compreso tra 0 e 5",
      });
    }
  
    if(name.length <= 3) {
      return res.status(400).json({
        status: "fail",
        message: "Il nome deve essere più lungo di 3 caratteri",
      });
    } 
  
    if(text && text.length > 0 && text.length < 5) {
      return res.status(400).json({
        status: "fail",
        message: "Il testo deve essere lungo almeno 6 caratteri",
      });
    }
  
    // Prima di fare la query di inserimento, ci assicuriamo che il libro con il dato id esiste
    const moviesSql = `
      SELECT *
      FROM movies
      WHERE id = ?
    `;
  
    dbConnection.query(moviesSql, [movieId], (err, results) => {
      if (err) {
        return next(new Error("Errore interno  del server"));
      }
      if (results.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "film non trovato",
        });
      }
  
      // Se è andato tutto bene e illibro esiste, possiamo aggiungere la recensione
      const sql = `
      INSERT INTO reviews(movie_id, name, vote, text)
      VALUES (?, ?, ?, ?);
    `;
  
      dbConnection.query(sql, [movieId, name, vote, text], (err, results) => {
        if (err) {
          return next(new Error(err.message));
        }
  
        res.status(201).json({
          status: "success",
          message: "Recensione aggiunta",
        });
      });
    });
  };




module.exports = {
    index,
    show,
    storeReview
}