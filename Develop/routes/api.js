  

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

    }