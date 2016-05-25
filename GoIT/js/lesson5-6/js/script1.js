var start = document.querySelector('.start');
var stop = document.querySelector ('.clear');
var h1 = document.querySelector ('.hours');
var m1 = document.querySelector ('.minutes');
var s1 = document.querySelector ('.seconds');
var ms1 = document.querySelector ('.ms');
var hours = 0;
var minutes = 0;
var seconds = 0;
var ms = 0;
var intervalID;


function timerRun () {
    ms+=4;
    if (ms === 1000) {
        ms = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    showData ();
}

function showData () {
    h1.innerHTML = '0' + hours;
    if (minutes < 10) {
        m1.innerHTML = '0'+ minutes;
    }
    else {
        m1.innerHTML = minutes;
    }
    if (seconds < 10) {
        s1.innerHTML = '0'+ seconds;
    }
    else {
        s1.innerHTML = seconds;
    }
    ms1.innerHTML = ms;
 }

function starter () {
    start.classList.toggle('btn-info');
    if (start.classList.contains('btn-info')) {
        start.innerHTML = 'Pause';
        intervalID = setInterval (timerRun, 4);
    }
    else {
        start.innerHTML = 'Cont..';
        clearInterval(intervalID);
    }
}

function stopper () {
    clearInterval(intervalID);
    hours = 0;
    minutes = 0;
    seconds = 0;
    ms = 0;
    showData ();
    if (start.classList.contains('btn-info')) {
        start.classList.remove('btn-info');
    }
    start.innerHTML = 'Start';
}

start.addEventListener ('click', starter);
stop.addEventListener ('click', stopper);
