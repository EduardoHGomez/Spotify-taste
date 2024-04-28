document.addEventListener('DOMContentLoaded', () => {
    
    let data = JSON.parse(localStorage.getItem('results'));
    let slide_track = document.querySelector('.slide-track');
    
    for(let i=0; i<15; i++) {
        let new_image = `
        <div class="slide">
            <img src="${data.user_result.image[i]}">
        </div>`

        slide_track.innerHTML += new_image;
    }




});

var i = 0;
var txt = 'Resultados de tu análisis musical 🧐';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".header_text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

setTimeout(typeWriter, 50);