// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/Heroine.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Song details
let songs = [
    {songName: "Heroine", filePath: "song/Heroine.mp3", coverPath: "cover/Heroine.png"},
    {songName: "Maroon Colour Sariya", filePath: "song/Maroon Colour Sariya.mp3", coverPath: "cover/Maroon Color Sariya.png"},
    {songName: "Saj ke Sawar ke", filePath: "song/Saj ke Sawar ke.mp3", coverPath: "cover/Saj ke Sawar ke.png"},
    {songName: "Jai Na Bahariya", filePath: "song/Ye raja tani Jayi na bahariya.mp3", coverPath: "cover/Jai na Bahariya.png"},
    {songName: "Nach Re Patarki", filePath: "song/Nach Re Patarki.mp3", coverPath: "cover/nach re patarki.png"},
    {songName: "Sorry Sorry", filePath: "song/Sorry Sorry.mp3", coverPath: "cover/sorry sorry.png"}
];

// Set song details dynamically in the UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click for master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update progress bar while the audio plays
audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek functionality for progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
};

// Play specific song when clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id); // Get the song index
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath; // Set the audio source
        masterSongName.innerText = songs[songIndex].songName; // Update the master song name
        audioElement.currentTime = 0; // Reset audio to start
        audioElement.play(); // Play the selected song
        gif.style.opacity = 1; // Show the gif while the song is playing
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});
