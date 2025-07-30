const lights = Array.prototype.slice.call(document.querySelectorAll('.light-strip'));
const time = document.querySelector('.time');
const best = document.querySelector('.best span');
let bestTime = Number(localStorage.getItem('best')) || Infinity;
best.textContent = formatTime(bestTime);
let started = false;
let lightsOutTime = 0;
let raf;
let timeout;

function start() {
  for (const light of lights) {
    light.classList.remove('on');
    light.classList.remove('go');
  }
  
  time.textContent = '00.000';
  time.style.color = "black"
  document.body.background=""
  time.classList.remove('anim');
  
  lightsOutTime = 0;
  let lightsOn = 0;
  const lightsStart = performance.now();
  
  function frame(now) {
    const toLight = Math.floor((now - lightsStart) / 1000) + 1;
    
    if (toLight > lightsOn) {
      for (const light of lights.slice(0, toLight)) {
        light.classList.add('on');
      }
    }
    
    if (toLight < 5) {
      raf = requestAnimationFrame(frame);
    }
    else {
      const delay = Math.random() * 4000 + 1000;
      timeout = setTimeout(() => {
        for (const light of lights) {
          light.classList.remove('on');
          light.classList.add('go');
        }
        lightsOutTime = performance.now();
      }, delay);
    }
  }
  
  raf = requestAnimationFrame(frame);
}

function tap(event) {
  let timeStamp = performance.now();
  
  if (!started && event.target && event.target.closest && event.target.closest('a')) return;
  event.preventDefault();
  
  if (started) {
    end(timeStamp);
    started = false;
  }
  else {
    start();
    started = true;
  }
}

function end(timeStamp) {
  cancelAnimationFrame(raf);
  clearTimeout(timeout);
  
  if (!lightsOutTime) {
    time.textContent = "Too early!";
    time.style.color = "red"
    time.classList.add('anim');
    return;
  }
  else {

    const thisTime = timeStamp - lightsOutTime;
    time.textContent = formatTime(thisTime);
    console.log(thisTime)
    
    console.log(thisTime,bestTime)
    if(thisTime > 10000){
      time.innerHTML = `${formatTime(thisTime)}<br>Too late!`;
      time.style.color = "red"
      time.classList.add('anim');
      return;
    }
    else if (thisTime < bestTime) {
      
      bestTime = thisTime;
      best.textContent = time.textContent;
      time.style.color = "rgb(0,255,0)"
      time.innerHTML = `${formatTime(thisTime)}<br>New record!`;
      localStorage.setItem('best', thisTime);
      document.body.background = "cat.gif"
    }
    
    time.classList.add('anim');
  }
}

function formatTime(time) {
  time = Math.round(time);
  let outputTime = time / 1000;
  if (time < 10000) {
    outputTime = '0' + outputTime;
  }
  while (outputTime.length < 6) {
    outputTime += '0';
  }
  return outputTime;
}

addEventListener('mousedown', event => {
  if (event.button === 0) tap(event);
}, {passive: false});

addEventListener('keydown', event => {
  if (event.key == ' ') tap(event);
}, {passive: false});