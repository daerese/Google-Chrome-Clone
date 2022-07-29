/*************************************************
 * THINGS TO THINK ABOUT WITH THIS MODAL:
 * - How to open and close the modal.  CHECK
 * - How to organize the bg images, Grid? Flex?
 * - How to set the background image to the item clicked on
 *   by the user. 
 * 
 * 
 * 
 * 
 * 
 */


// Modal Buttons
let doneBtn = document.getElementById('done-btn');
let cancelBtn = document.getElementById('cancel-btn');
let galleryBtn = document.getElementById('gallery-btn');

let modalOverlay = document.getElementsByClassName('modal-overlay')[0];
let editIcon = document.getElementById('edit-icon-container');

let modalImages = document.getElementsByClassName('modal-image');

editIcon.addEventListener('click', function () {
    modalOverlay.style.display = 'block';
});

cancelBtn.addEventListener('click', function () {
    modalOverlay.style.display = 'none';
})

doneBtn.addEventListener('click', function () {
    //console.log(modalImages[0].getAttribute('src'));

    for (let i = 0; i < modalImages.length; i++) {
        if (modalImages[i].classList.contains('selected-image')) changeBG(modalImages[i]);
    }
    modalOverlay.style.display = 'none';
})

//An Html collection is array like, but NOT an array. So use 
//Array.from(HTMLCOllection) to treat it like an array. 
Array.from(modalImages).forEach((image) => {
    image.addEventListener('click', function () {
        /* 
        Loop through the images. 
        If an image has selected-image toggled, de-toggle it. 
        */
        for (let i = 0; i < modalImages.length; i++) {
            if (modalImages[i].classList.contains('selected-image')) modalImages[i].classList.remove('selected-image');
        }
        image.classList.toggle('selected-image');
    })
})

function changeBG(image) {

    // Next Task: Have the images fade into one another:
    // 1. Have the current image fade to an opacity of 0.
    // 2. Then, change the image, make its opacity 1. 

    document.body.style.backgroundImage = "url('" + image.getAttribute('src') + "')";
}

/****************************
 * Background Image Slideshow
 ****************************/
let slideIndex = 0;
let galleryMode = false;
let bgSlideShow;
galleryBtn.addEventListener('click', function () {
    if (galleryMode == false) {
        galleryMode = true;
        document.getElementById("gallery-mode").innerHTML = ":ON";
    }
    else {
        clearInterval(bgSlideShow)
        galleryMode = false;
        document.getElementById("gallery-mode").innerHTML = ":OFF";
        return;
    }
    bgSlideShow = setInterval(function () {
        console.log(modalImages[slideIndex])
        slideIndex++;
        if (slideIndex > modalImages.length -1) slideIndex = 0;

        changeBG(modalImages[slideIndex]);
    }, 5000);
})
