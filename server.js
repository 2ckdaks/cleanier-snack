const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extend : true}));

app.listen(8080, function(){
    console.log('listening on 8080')
});


app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/html/login.html')
})