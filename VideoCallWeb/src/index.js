const express = require ('express');
const app = express();

app.set('port',3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});