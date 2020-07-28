// When an ad is detected, this script mutes the Spotify music player and plays custom audio files instead

// Paste in console of web app / PWA

// Add your own audio file URLs below to replace the ads
// Or empty to play nothing

// Extension reload required on change

let tunes;

let tune = new Audio();
let muted = false;

let muteSelector = ".spoticon-volume-16.control-button.volume-bar__icon";
let disabledSkipSelector = ".spoticon-skip-forward-16.control-button--disabled";

let url = chrome.runtime.getURL("audio.json");

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    tunes = json["audio"];
  });

const waitForAd = () => {
  let skipButton = document.querySelector(disabledSkipSelector);

  if (skipButton != null) {
    setTimeout(() => waitForAd(), 200);
  } else {
    tune.pause();

    muted = false;
    muteButton.click();
  }
};

const playTune = () => {
  if (tunes.length != 0) {
    src = tunes[Math.floor(Math.random() * tunes.length)];
    tune.src = chrome.runtime.getURL("audio/" + src);

    tune.currentTime = 0;
    tune.play();

    tune.onended = () => {
      playTune();
    };
  }
};

window.addEventListener("load", (e) => {
  let muteButton = document.querySelector(muteSelector);

  setInterval(() => {
    if (!muted) {
      let skipButton = document.querySelector(disabledSkipSelector);

      if (skipButton != null) {
        muteButton.click();
        muted = true;

        playTune();

        waitForAd();
      }
    }
  }, 200);

  playTune();
});
