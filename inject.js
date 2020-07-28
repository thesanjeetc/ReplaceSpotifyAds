// When an ad is detected, this script mutes the Spotify music player and plays custom audio files instead

// Paste in console of web app / PWA

// Add your own audio file URLs below to replace the ads
// Or empty to play nothing

// Extension reload required on change

//-------------------------------------------------------//

let tunes = [
  "https://cdn2.melodyloops.com/mp3/preview-remembering-burian-1262.ogg",
  "https://cdn2.melodyloops.com/mp3/preview-yoga-and-zen-1308.ogg",
  "https://cdn2.melodyloops.com/mp3/preview-rise-of-a-hero-1138.ogg",
];

//-------------------------------------------------------//

window.addEventListener("load", (e) => {
  let muteSelector = ".spoticon-volume-16.control-button.volume-bar__icon";
  let disabledSkipSelector =
    ".spoticon-skip-forward-16.control-button--disabled";

  let muteButton = document.querySelector(muteSelector);

  let tune = new Audio();
  let muted = false;

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
      tune.src = tunes[Math.floor(Math.random() * tunes.length)];

      tune.currentTime = 0;
      tune.play();

      tune.onended = () => {
        playTune();
      };
    }
  };

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
});
