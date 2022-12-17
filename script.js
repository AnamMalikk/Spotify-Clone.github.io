console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName')
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Baby Girl", filePath: "songs/1.mp3", coverPath: "covers/Baby Girl.jpeg"},
    {songName: "U Smile - Justin Bieber", filePath: "songs/2.mp3", coverPath: "covers/U Smile - Justin Bieber.jpeg"},
    {songName: "Ceilo", filePath: "songs/3.mp3", coverPath: "covers/Ceilo.jpg"},
    {songName: "High Rated - Guru Randhawa", filePath: "songs/4.mp3", coverPath: "covers/High Rated - Guru Randhawa.jpeg"},
    {songName: "Janji - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/Janji - Heroes Tonight.jpg"},
    {songName: "Kale Je Libas Di", filePath: "songs/6.mp3", coverPath: "covers/Kale Je Libas Di.jpeg"},
    {songName: "Kesariya-Brahmastra", filePath: "songs/7.mp3", coverPath: "covers/Kesariya-Brahmastra.jpeg"},
    {songName: "Koka - Pawan dhariwal", filePath: "songs/8.mp3", coverPath: "covers/Koka - Pawan dhariwal.jpeg"},
    {songName: "Shiddat", filePath: "songs/9.mp3", coverPath: "covers/Shiddat.jpeg"},
    {songName: "Tareefan", filePath: "songs/10.mp3", coverPath: "covers/Tareefan.jpeg"}


]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
} )

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
