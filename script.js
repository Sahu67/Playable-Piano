const pianoKeys = document.querySelectorAll('.piano-keys .key'),
volumeSlider = document.querySelector('.volume-slider input'),
keysCheckbox = document.querySelector('.keys-checkbox input');

let allKeys = [],
audio = new Audio('tunes/a.wav');  // by default, audio src is 'a' tune
audio.volume = 0.5;  // by default, audio volume is '0.5'

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;  // passing audio src based on key pressed
    audio.play();  // playing audio

    const clickedKey = document.querySelector(`[data-key='${key}']`);  // getting clicked key element
    clickedKey.classList.add('active');  // adding active class to the clicked key element
    setTimeout(() => clickedKey.classList.remove('active')  /* removing active class after 150 ms from the clicked key event */ , 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);  // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener('click', () => playTune(key.dataset.key));
});

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle('hide'));
}

const handleVolume = (e) => {
    audio.volume = e.target.value;  // passing the range slider value as an audio volume
}

const pressedKey = (e) => {
    // If the pressed key is in the allKeys array, only then call the playTune function
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener('click', showHideKeys);
volumeSlider.addEventListener('input', handleVolume);
document.addEventListener('keydown', pressedKey);