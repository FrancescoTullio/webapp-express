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



// const show = (req, res) => {
//     const id = req.params.id;


//     const sql = "SELECT * FROM `movies` WHERE `movies`.`id` = ? "

//     const sqlid = "SELECT *FROM `movies`INNER JOIN ` reviews` ON `movies`.`id` = `reviews`.`movie_id` WHERE `movies`.`id` = ?"

//     dbConnection.query(sql, [id], (err, filmArray) => {
//         if (err) {
//             return res.status(500).json({
//                 error: true,
//                 message: "ERRORE DEL SERVER"
//             })
//         }

//         if (filmArray === 0) {
//             return res.status(404).json({
//                 error: true,
//                 message: "film non trovato"
//             })
//         }

//         dbConnection.query(sqlid, [id], (err, revius) => {
//             if (err) {
//                 return res.status(500).json({
//                     error: true,
//                     message: "ERRORE DEL SERVER"
//                 })
//             }

//             return res.status(200).json({
//                 status: "succes",
//                 data: {
//                     ...filmArray,
//                     revius,
//                 }
//             })

//         })



//     })







}




module.exports = {
    index,
    show
}