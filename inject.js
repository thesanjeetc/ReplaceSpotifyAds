let tunes;
let tune = new Audio();

let waiting = false;

let muteSelector = ".spoticon-volume-16.control-button.volume-bar__icon";
let unmuteSelector = ".spoticon-volume-off-16.control-button.volume-bar__icon";
let playingSelector = ".now-playing";

let url = chrome.runtime.getURL("audio.json");

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    tunes = json["audio"];
  });

window.addEventListener("load", () => {
  const isMute = () => {
    let muteButton = document.querySelector(muteSelector);
    if (muteButton == null) {
      return true;
    }
    return false;
  };

  const isAd = () => {
    let nowPlaying = document.querySelector(playingSelector);
    if (nowPlaying.getAttribute("aria-label").includes("Advertisement")) {
      return true;
    }
    return false;
  };

  const mute = () => {
    if (!isMute()) {
      document.querySelector(muteSelector).click();
    }
  };

  const unmute = () => {
    if (isMute()) {
      document.querySelector(unmuteSelector).click();
    }
  };

  const waitForAd = () => {
    waiting = true;

    if (isAd()) {
      setTimeout(() => waitForAd(), 200);
    } else {
      tune.pause();
      unmute();

      waiting = false;
    }
  };

  const playTune = () => {
    if (tunes.length != 0 && !waiting) {
      src = tunes[Math.floor(Math.random() * tunes.length)];
      tune.src = chrome.runtime.getURL("audio/" + src);

      tune.currentTime = 0;
      tune.play();

      tune.onended = () => {
        playTune();
      };
    }
  };

  setInterval(() => {
    if (!isMute() && !waiting) {
      if (isAd()) {
        mute();
        playTune();
        waitForAd();
      }
    }
  }, 200);
});
