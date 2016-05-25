var start = document.querySelector('.start');
var stop = document.querySelector ('.clear');
var split = document.querySelector ('.split');
var h1 = document.querySelector ('.hours');
var m1 = document.querySelector ('.minutes');
var s1 = document.querySelector ('.seconds');
var ms1 = document.querySelector ('.ms');
var oList = document.querySelector ('ol');
var hours = 0;
var minutes = 0;
var seconds = 0;
var ms = 0;
var intervalID;
var timerText;


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
    timerText = h1.innerHTML+':'+m1.innerHTML+':'+s1.innerHTML+'.'+ms1.innerHTML;
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
        start.innerHTML = 'Stop';
        intervalID = setInterval (timerRun, 4);
    }
    else {
        start.innerHTML = 'Start';
        clearInterval(intervalID);
        addLi ('Stop: ');
    }
}

function stopper () {
    clearInterval(intervalID);
    while (oList.firstChild) {
        oList.removeChild (oList.firstChild);
    }
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

function addLi (status) {
    listItem = document.createElement ('li');
    oList.appendChild(listItem);
    listItem.innerHTML = status + timerText;
}

function splitter () {
    if (start.classList.contains('btn-info')) {
        addLi ('Split: ');
    }
}

start.addEventListener ('click', starter);
stop.addEventListener ('click', stopper);
split.addEventListener ('click', splitter);