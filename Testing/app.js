const input = document.querySelector(".volume");
const playBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".fa-forward");
const previousBtn = document.querySelector(".fa-backward");
let song = document.querySelector("audio");
const slider = document.querySelector(".duration");
const sliderMax = document.querySelector(".duration").max;
const elapsedTime = document.querySelector(".elapsedTime");
const totalTime = document.querySelector(".totalTime");

import { songList } from "./songs.js";

//Set Audio Src for 1st song
song.src = songList[0].url;

//Set Duration text for 1st song
song.onloadedmetadata = () => {
  const string = Math.floor(song.duration % 60).toString();
  if (string.length == 1) {
    totalTime.innerText = `${Math.floor(song.duration / 60)}:0${string}`;
  } else {
    totalTime.innerText = `${Math.floor(song.duration / 60)}:${string}`;
  }
};

//Play and Pause
playBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    setDuration();
  } else {
    song.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
});

//Change volume
input.addEventListener("input", (e) => {
  song.volume = e.target.value * 0.01;
});

//Song Duration

setInterval(() => {
  let songTime = Math.floor(song.currentTime);
  slider.value = songTime;
  slider.max = song.duration;
}, 1000);

//Next Song
let i = 0;
nextBtn.addEventListener("click", () => {
  if (i == songList.length - 1) {
    i = 0;
    song.src = songList[i].url;
    song.play();
  } else {
    i++;
    song.src = songList[i].url;
    song.play();
  }
  song.onloadedmetadata = () => {
    const string = Math.floor(song.duration % 60).toString();
    if (string.length == 1) {
      totalTime.innerText = `${Math.floor(song.duration / 60)}:0${string}`;
    } else {
      totalTime.innerText = `${Math.floor(song.duration / 60)}:${string}`;
    }
  };
});

//Previous Song
previousBtn.addEventListener("click", () => {
  if (i == 0) {
    i = songList.length - 1;
    console.log(i);
    song.src = songList[i].url;
    song.play();
  } else {
    i--;
    console.log(i);
    song.src = songList[i].url;
    song.play();
  }
});
