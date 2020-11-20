  

const fs = require('fs');



module.exports = function(app) {
    
    app.get('/api/notes', function(request, response) {
      fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        dbData = JSON.parse(data);
        response.send(dbData);
      });
    });

    app.post('/api/notes', function(request, response) {
        const userNotes = request.body;
    
        fs.readFile('./db/db.json', (err, data) => {
          if (err) throw err;
          dbData = JSON.parse(data);
          dbData.push(userNotes);
          let number = 1;
          dbData.forEach((note, index) => {
            note.id = number;
            number++;
            return dbData;
          });
          console.log(dbData);
    
          stringData = JSON.stringify(dbData);
    
          fs.writeFile('./db/db.json', stringData, (err, data) => {
            if (err) throw err;
          });
        });
        response.send("New note has been entered.");
      });

      app.delete('/api/notes/:id', function(req, res) {
        const deleteNote = req.params.id;
        console.log(deleteNote);
    
        fs.readFile('./db/db.json', (err, data) => {
          if (err) throw err;
    
          dbData = JSON.parse(data);
          for (let i = 0; i < dbData.length; i++) {
            if (dbData[i].id === Number(deleteNote)) {
              dbData.splice([i], 1);
            }
          }
          console.log(dbData);
          stringData = JSON.stringify(dbData);
    
          fs.writeFile('./db/db.json', stringData, (err, data) => {
            if (err) throw err;
          });
        });
        res.status(204).send();
        console.log("status test:", status)
      });
    };