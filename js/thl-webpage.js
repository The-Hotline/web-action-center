// JavaScript file
// TheHotline.us The Hotline Chat - Google One Box. The National Domestic Violence Hotline chat widget for the Google One Box deployment. TheHotline.org.
// project lead: Marty Hand | National Domestic Violence Hotline | TheHotline.org
// author: Chad Cleveland | National Domestic Violence Hotline | TheHotline.org 
// copyright: © Copyright 2024 National Domestic Violence Hotline 


// Created: 09/13/2022
const appName = 'The Hotline Chat - Google One Box';
const g1bLastModified = '2025-02-03 17:29';

var lang = 'en';

var securityAlerted = 0;
const securityAlertEn = 'Internet usage can be monitored and is impossible to erase completely. If you’re concerned your internet usage might be monitored, call us at 800.799.SAFE (7233). <a href="https://www.thehotline.org/plan-for-safety/internet-safety/" target="internet_safety">Learn more about digital security</a> and remember to clear your browser history after visiting this website.<br /><br /><strong>Click the red “X” in the upper-right corner or “Escape” button on your keyboard twice at any time to leave TheHotline.org immediately.</strong><br /><br /><strong class="color-purple-lt">Please contact 911 if you feel like you are in immediate danger or a life-threatening situation.</strong>';
const securityAlertEs = 'El uso de Internet puede ser monitoreado y es imposible de eliminar por completo. Si le preocupa que su uso de Internet pueda ser monitoreado, llámenos al 800.799.SAFE (7233). <a href="https://espanol.thehotline.org/plan-de-seguridad/internet/" target="internet_safety">Obtenga más información sobre la seguridad digital</a> y recuerde borrar el historial de su navegador después de visitar este sitio web.<br /><br /><strong>Haga clic en el botón «X» o «Escape» en cualquier momento para salir de TheHotline.org inmediatamente.</strong><br /><br /><strong class="color-purple-lt">Haga clic en el botón «X» o «Escape» en cualquier momento para salir de TheHotline.org inmediatamente.</strong>';
var securityAlert = securityAlertEn;

const securityTitleEn = 'Security Alert';
const securityTitleEs = '¡Alerta de seguridad!';
var securityTitle = securityTitleEn;

const securityButtonEn = 'OK';
const securityButtonEs = 'ESTÁ BIEN';
var securityButton = securityButtonEn;


var dTimer = 0;

console.log('\n' + appName + '\n\n  Last updated: ' + g1bLastModified + '\n\n');




async function initApp() {
  console.log(dTimer, 'init app');
  initDebugTimer();
  initEscaptExit();
  getLang();
  setLang();
  createSecurityAlert();
  displayApp();
}

function getLang() {
  const pHref = window.location.href;
  if(pHref.indexOf('index-es') > -1) {
    lang = 'es';
  }
}
 
function setLang() {
  if(lang == 'es') {
    securityAlert = securityAlertEs;
    securityTitle = securityTitleEs;
    securityButton = securityButtonEs;
  }
}

function initDebugTimer() {
  var tmr = setInterval(() => {
    dTimer = dTimer + 1;
  }, 10);
}

function displayApp() {

  const appEle = document.querySelector('#thl-webpage .thl-webpage-container');
  window.addEventListener('load', function () {
    appEle.setAttribute('thl-status', 'active');
    hideLoading();
  })
}

function hideLoading() {
  const lEles = document.querySelectorAll('.loading');
  for(let i = 0; i < lEles.length; i++) {
    lEles[i].style.display = 'none';
  }
}
function showLoading() {
  const lEles = document.querySelectorAll('.loading');
  for(let i = 0; i < lEles.length; i++) {
    lEles[i].style.display = 'block';
  }
}

function createSecurityAlert() {
  console.log('security alert');
  if(securityAlerted == 0) {
    const pEle = document.querySelector('#thl-webpage');
    const saContainer = document.createElement('div');
    saContainer.setAttribute('class', 'thl-webpage-security-alert-container');

    const saContent = document.createElement('div');
    saContent.setAttribute('class', 'thl-webpage-security-alert-content');
    
    const saText = document.createElement('p');
    saText.innerHTML = securityAlert;

    const saHdr = document.createElement('h1');
    saHdr.innerHTML = securityTitle;

    const saBtn = document.createElement('button');
    saBtn.innerHTML = securityButton;
    saBtn.setAttribute('class', 'site-btn-alert');
    saBtn.onclick = function() {
      securityAlerted = 1;
      removeSecurityAlert();
     }

     saContent.appendChild(saHdr);
     saContent.appendChild(saText);
     saContent.appendChild(saBtn);
     saContainer.appendChild(saContent);
     pEle.appendChild(saContainer);

  }
}

function removeSecurityAlert() {
  const saContainer = document.querySelector('.thl-webpage-security-alert-container');
  saContainer.setAttribute('thl-status', 'inactive');
  setTimeout(() => {
    saContainer.remove();
  }, 300);

}

async function exitApp() {
  console.log(dTimer, 'exitApp');
  window.location.replace('https://www.google.com');
  // setTimeout(function() {
  //   window.location.href = 'https://www.google.com';
  // }, 300);
  
}


function initEscaptExit() {
  console.log(dTimer, 'init escape x2 exit');
  var escapePresses = 0;
  window.addEventListener('keydown', function(event) {
    if(event.key == 'Escape') {
      escapePresses = escapePresses + 1;
      setTimeout(() => {
        escapePresses = 0;
      }, 1000);
    }
    // console.log('key press', event.key, escapePresses);
    if(escapePresses > 1) {
      exitApp();
    }
  })
}
