import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time'; //ключ

player.on('timeupdate', throttle(onPlaybackTime, 1000));

//відтоворення часу + локальне сховище
function onPlaybackTime(evt) {
  localStorage.setItem(STORAGE_KEY, evt.seconds);
}

const currentTime = localStorage.getItem(STORAGE_KEY);

//відновлення відтворення зі збереженої позиції
player.setCurrentTime(currentTime || 0);
