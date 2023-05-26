
//알람 
let alramAudio = document.getElementById("alramAudio");
let audioStop = document.getElementById("audioStop");
let btnSetAlram = document.getElementById("btnSetAlram");
let timerID = 0;

function alramPause() {
    alramAudio.pause();
    audioStop.style.display ="none";
    btnSetAlram.style.display="inline-block";
}

function setAlram() {
    clearTimeout(timerID);

    let alramDate = document.getElementById("alramDate");
    let alramTime = document.getElementById("alramTime");

    let dateString = `${alramDate.value}T${alramTime.value}`;
    let setAlramTime = new Date(dateString);
    let nowTime = new Date();
    
    let setTime = setAlramTime - nowTime;

    if(setTime<=0) {
        alert("설정된 날짜 및 시간이 현재 시간 이전으로 되어있습니다.");
        return;
    }


   timerID = setTimeout(function() {
        btnSetAlram.style.display = "none";
        audioStop.style.display = "inline-block";
        alramAudio.play();
    },setTime);

} //setAlram()

//스탑워치
let pStopWatch = document.getElementById("pStopWatch");
let swTimer = null;

swReset();

function showSWTimer(d) {
    let h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();
    let m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();
    let s = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();
    let ms = d.getMilliseconds() / 100;

    return `${h}:${m}:${s}:${ms}`;
}

function swReset () {
    swStop();
    swTimer = new Date("1970-01-01T00:00:00");
    pStopWatch.innerHTML = showSWTimer(swTimer);
    
}

function swStart() {
    clearInterval(timerID); //시작버튼을 여러번 눌렀을 때 병렬처리 방지
    timerID = setInterval(function() {
        swTimer.setTime(swTimer.getTime() + 100);
        pStopWatch.innerHTML = showSWTimer(swTimer);
    },100);
}

function swStop() {
    clearInterval(timerID);
}


//타이머
let tTimer = null;

let tSetHours = document.getElementById("tSetHours");
let tSetMinutes = document.getElementById("tSetMinutes");
let tSetSeconds = document.getElementById("tSetSeconds");
let pTimerWatch = document.getElementById("pTimerWatch");

let btnTimerSet = document.getElementById("btnTimerSet");
let btnTimerReset = document.getElementById("btnTimerReset");
let btnTimerStart = document.getElementById("btnTimerStart");
let btnTimerStop = document.getElementById("btnTimerStop");

timerReset();

function setPTimerWatch(h, m, s) {
    tTimer.setHours(h);
    tTimer.setMinutes(m);
    tTimer.setSeconds(s);
    tTimer.setMilliseconds(0);

    pTimerWatch.innerHTML = showSWTimer(tTimer);
}

function timerReset() {
    clearInterval(timerID);
    tTimer = new Date("1970-01-01");
    //timerStop();
    tSetHours.value = 0;
    tSetMinutes.value = 0;
    tSetSeconds.value = 0;

    setPTimerWatch(0,0,0);
    btnTimerSet.removeAttribute("disabled");
}

function timerSet() {
    if( tSetHours.value == "0" && tSetMinutes.value == "0" 
    &&tSetSeconds.value == "0") {
        alert("시간을 설정하십시오.");
        tSetHours.focus();
        return;
    }
    
    setPTimerWatch(tSetHours.value, tSetMinutes.value,tSetSeconds.value);
    
    btnTimerStart.removeAttribute("disabled");
}

function timerStart() {
    clearInterval(timerID);
    // timerStop();
    timerID = setInterval(function () {
        tTimer.setTime(tTimer.getTime() - 100);

        let timeDiff = tTimer.getTime() + (1000 * 60 * 60 * 9);
        if(timeDiff < 0) {   //0초보다 같거나 미만일 때 0으로 리셋시키고 오디오를 실행시킨다.
            clearInterval(timerID);
            timerReset();
            alramAudio.play();
            return;
        }
        
        pTimerWatch.innerHTML = showSWTimer(tTimer);
    }, 100);

    btnTimerStop.removeAttribute("disabled");
    btnTimerSet.setAttribute("disabled","disabled");
    btnTimerReset.setAttribute("disabled","disabled");
}

function timerStop() {
    clearInterval(timerID);
    alramAudio.pause();

    btnTimerReset.removeAttribute("disabled");
    btnTimerReset.removeAttribute("disabled");
}



//button
function displayItem(index) {
    let menus = document.getElementsByClassName("menu");
    let items = document.getElementsByClassName("item");
    for(let i=0; i<items.length; i++) {
        menus[i].classList.remove("active");
        items[i].style.display = "none";

    }
    menus[index].classList.add("active");
    items[index].style.display = "block";

}