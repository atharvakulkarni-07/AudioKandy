console.log("Welcome to AudioKandy")

// getting all the variables 
let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName'); 
let maingif = document.getElementById('maingif');
let songItems = Array.from(document.getElementsByClassName("songItem"));



let songs = [
    {songName: "Vinee Heights", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName: "SubUrban", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName: "On and On", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName: "The Truth", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songName: "Never let you down", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songName: "Path of the traveller", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songName: "Set you free", filepath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songName: "Cradles", filepath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songName: "Feel us", filepath: "songs/9.mp3", coverpath: "covers/9.jpg"},
    {songName: "Heart", filepath: "songs/10.mp3", coverpath: "covers/10.jpg"},
    {songName: "Speed", filepath: "songs/11.mp3", coverpath: "covers/11.jpg"},
    {songName: "Emotions", filepath: "songs/12.mp3", coverpath: "covers/12.jpg"},
    {songName: "Jazzkin", filepath: "songs/13.mp3", coverpath: "covers/13.jpg"}
];

songItems.forEach((element, i)=>{
    // console.log(element, i); for debugging
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})







//handling pause/play buttons
masterPlay.addEventListener('click', ()=>{


    if(audioElement.paused || audioElement.currentTime<=0){
      
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle'); // icon change
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        maingif.style.opacity = 1;
    }
    else{
        audioElement.pause();
     
        masterPlay.classList.remove('fa-pause-circle'); // icon change
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        maingif.style.opacity = 0;
    }
});





// listening to the music
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate'); // debuggin
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress); // debugging
    progressBar.value = progress;

    progressBar.addEventListener('change', ()=>{
        audioElement.currentTime = (progressBar.value * audioElement.duration)/100;
    })

});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        maingif.style.opacity = 1;
    })

})



document.getElementById('next').addEventListener('click', () => {   // next button
    if (songIndex >= 12) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    updateSongInfo(); // Add this line to update the song info
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    maingif.style.opacity = 1;
    updatePlayPauseButtons(); // Add this line to update play/pause buttons
});

document.getElementById('previous').addEventListener('click', () => {   // previous button
    if (songIndex < 0) {
        songIndex = 12;
    } else {
        songIndex -= 1;
    }
    updateSongInfo(); // Add this line to update the song info
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    maingif.style.opacity = 1;
    updatePlayPauseButtons(); // Add this line to update play/pause buttons
});

function updateSongInfo() {
    masterSongName.innerText = songs[songIndex].songName;
}

function updatePlayPauseButtons() {
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
}


document.getElementById('searchBar').addEventListener('input', function() {
    let query = this.value.toLowerCase();
    songItems.forEach((item, i) => {
        let songName = songs[i].songName.toLowerCase();
        if (songName.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});



// Existing JavaScript

let volumeControl = document.getElementById('volumeControl');
let volumePercent = document.getElementById('volumePercent');

// Set the initial volume based on the initial value of the volume control
audioElement.volume = volumeControl.value / 100;
volumePercent.innerText = `${volumeControl.value}%`;

volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
    volumePercent.innerText = `${volumeControl.value}%`;
});



// Update the current time and duration
audioElement.addEventListener('timeupdate', () => {
    // Current time
    let currentTime = Math.floor(audioElement.currentTime);
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime - minutes * 60;
    let formattedCurrentTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('currentTime').textContent = formattedCurrentTime;

    // Duration
    let duration = Math.floor(audioElement.duration);
    minutes = Math.floor(duration / 60);
    seconds = duration - minutes * 60;
    let formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('duration').textContent = formattedDuration;
});

const body = document.querySelector('body');
let isPlaying = false;

// Function to darken the background color
function darkenBackgroundColor() {
    body.style.backgroundColor = '#2c3e50'; // Darkened color
}

// Function to reset the background color to its original value
function resetBackgroundColor() {
    body.style.backgroundColor = 'antiquewhite'; // Original color
}

// Event listeners for when the cursor enters and leaves the body
body.addEventListener('mouseenter', () => {
    if (!isPlaying) {
        darkenBackgroundColor();
    }
});

body.addEventListener('mouseleave', () => {
    if (!isPlaying) {
        resetBackgroundColor();
    }
});

// Event listener to detect when the song starts playing
masterPlay.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        darkenBackgroundColor();
    } else {
        resetBackgroundColor();
    }
});







// JavaScript

// Get references to the Home and About links
const homeLink = document.querySelectorAll('nav ul li')[1];
const aboutLink = document.querySelectorAll('nav ul li')[2];

// Get references to the pop-up containers
const homePopup = document.getElementById('homePopup');
const aboutPopup = document.getElementById('aboutPopup');

// Toggle pop-up visibility when clicking on the Home link
homeLink.addEventListener('click', () => {
    // Toggle the 'show' class on the Home pop-up
    homePopup.classList.toggle('show');
});

// Toggle pop-up visibility when clicking on the About link
aboutLink.addEventListener('click', () => {
    // Toggle the 'show' class on the About pop-up
    aboutPopup.classList.toggle('show');
});







// JavaScript

// Get the home and about buttons
let homeButton = document.getElementById('homeButton');
let aboutButton = document.getElementById('aboutButton');

// Add event listeners to change cursor style
homeButton.addEventListener('mouseover', () => {
    homeButton.style.cursor = 'pointer';
});

aboutButton.addEventListener('mouseover', () => {
    aboutButton.style.cursor = 'pointer';
});

