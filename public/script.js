const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m", "k"];

const BLACK_KEYS = ["s", "d", "g", "h", "j"];

const recordButton = document.querySelector(".record-button")
const playButton = document.querySelector(".play-button")
const saveButton = document.querySelector(".save-button")

const songLink = document.querySelector(".song-link")

const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
// yettinchi  funcsiya
const keyMap=[...keys].reduce((map ,key)=>{
  map[key.dataset.note]=key
return map
},{})


let recodingStartTime
let songNotes= currentSong && currentSong.notes

//console.log(currentSong);

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

// record  funcsiya uchun
if(recordButton){
recordButton.addEventListener("click", recToggle)
}
// save  funcciyasini yzish uchun
if(saveButton){
  saveButton.addEventListener("click", saveSong)
}
// play funcciyasini yzish uchun

playButton.addEventListener("click", playSong)


document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

// birinchi funcsiya
function recToggle() {
  recordButton.classList.toggle("active")

  if (isRecoding()) {
    startRecording()
  } else {
    stopRecording()
  }
}
// ikinchi funksiya
function isRecoding() {
  return recordButton != null && recordButton.classList.contains("active")

}
// uchunchyain funcsi
function startRecording() {
  recodingStartTime = Date.now()
  songNotes = []
  
  playButton.classList.remove("show")
  saveButton.classList.remove("show")

}
// to'rtinchi funcsiya 
function stopRecording() {
  playSong()
  playButton.classList.add("show")
  saveButton.classList.add("show")

}
// beshinchi funcsiya


function playSong() {

  if (songNotes.length === 0) return
  songNotes.forEach(note => {
    setTimeout(() => {

      playNote(keyMap[note.key])
    }, note.startTime)
  })

}


function playNote(key) {
  // is recording funcsiyasini playnot funcsiyasiga qoshiladi
  if (isRecoding()) recordNote(key.dataset.note)
  const playAudio = document.getElementById(key.dataset.note);
  playAudio.currentTime = 0;
  playAudio.play();
  key.classList.add("active");
  playAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}
//oltinchi funsiya
function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recodingStartTime
  })
}
function saveSong() {
  axios.post('/songs', { songNotes: songNotes }).then(res => {
songLink.classList.add("show")
songLink.href=`/songs/${res.data._id}`
    //console.log(res.data)
  })
  
}