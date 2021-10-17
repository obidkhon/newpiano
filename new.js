//expressni  yuklab olamiz

const express = require("express")
// expressnii app ga tenglashtiramiz
const app = express()
// monguseeni yuklab olamiz
const mongoose = require("mongoose")
// mongoosga ulanish hosil qlamiz
mongoose.connect("mongodb://localhost/piNotes")
    .then(() => {
        console.log("god connaction");
    })
    .catch((err) => {
        console.log("bad connaction", err);
    })

// mongoose schemani ulaymiiz
const Song = require("./model/song.js")



const port = process.env.PORT || 4000

app.use(express.json())

app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index")
})


app.post('/songs', async (req, res) => {

    const song = new Song({
        notes: req.body.songNotes
    })
    await song.save()
    res.json(song);

});


app.get('/songs/:id',async(req, res) => {

    let song
    try{
    song =  await  Song.findById(req.params.id)

    }catch(e){
song = undefined
    }
    res.render('index',{song :song});
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});