let db = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.json(db);
    });

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = uuidv4();
        // console.log(newNote.id);

        db.push(newNote)
        res.json(true);

        fs.writeFileSync('./db/db.json',JSON.stringify(db,null), function(err){
            if (err) throw err;
        })
    });

    app.delete('/api/notes/:id', (req,res) => {
        db = db.filter(({id}) => id !== req.params.id) 
        fs.writeFileSync('./db/db.json', JSON.stringify(db,null) , function(err){
            if (err) throw err;
        })
        res.json(db);
    });


}