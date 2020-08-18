const express = require('express');
const bodyParser = require('body-parser');
const corss = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(corss());

const posts = require('./routes/api/post')

app.use('/api/posts', posts);

// Handel Production
if(process.env.NODE_ENV === 'production'){
    console.log(__dirname , "++++")
    app.use(express.static(__dirname + '/public/'));
    console.log("okay")
    app.get(/.*/ , (req, res)=>{
        res.sendFile(__dirname + '/public/index.html')
    })
}

const port = process.env.PORT || 5555;


app.listen(port, ()=>{
    console.log(`Server started on port:${port}`)
})