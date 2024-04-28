document.addEventListener('DOMContentLoaded', () => {
    
    let data = JSON.parse(localStorage.getItem('results'));
    let slide_track = document.querySelector('.slide-track');
    
    for(let i=0; i<15; i++) {
        console.log(data.user_result.image[i]);
        let new_image = `
        <div class="slide">
            <img src="${data.user_result.image[i]}">
        </div>`

        slide_track.innerHTML += new_image;
    }

});

