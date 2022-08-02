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


/* *************************************************************
SLIDESHOW CLASS:
This class is used to create A background with changing images.
* **************************************************************/


class Slideshow {
    constructor(imgA, imgB, imgsArr, className) {

        // Meant to hold the two main background image elements 
        this.imgA = imgA; 
        this.imgB = imgB;

        // For looping through the background imgs (imgA/imgB) if needed. 
        this.imgElementArr = [this.imgA, this.imgB]



        this.className = className

        this.imgsArr = imgsArr
        
        // if (!Array.isArray(imgsArr)) {
        //     this.imgsArr = Array.from(imgsArr)
        // }
        // else {
        //     this.imsArr = imgsArr
        // }

        this.swapIndex = 0;
        this.slideCount = 0;

        this.slideInterval;

        this.slideShowActive = false;
    }

    reset() {
        // resets the important variables

        // reset the images

        this.imgElementArr.forEach(imgEl => {
            imgEl.setAttribute('src', '')
            if (imgEl.classList.contains('visible')){
                imgEl.classList.remove('visible')
            }
        })

        // reset the count and index
        this.swapIndex = 0
        this.slideCount = 0

        // Reset the status of the slideshow
        // this.slideShowActive = false
        
        // Reset the slide time interval
        if (this.slideShowActive) {
            this.toggleSlideShow()
        }
        else { //If slideShowActive is already inactive (false)
            clearInterval(this.slideInterval)
        }

        console.log('RESET')

    }

    // This function is only called at the start of the
    // slideshow (Or the first time you press the button) 
    initImages() {
    // Set the initial image addresses on the 1st/2nd loops.


        this.imgA.setAttribute('src', this.imgsArr[0])
        this.imgB.setAttribute('src', this.imgsArr[1])

    
        this.imgA.classList.toggle(this.className)
    }

    // This function will swap the visiblity of the two images. 
    swapImg(className) {
        this.imgElementArr.forEach(img => {
            img.classList.toggle(className);
        });
    }
  

    changeSrc() {

        this.imgElementArr.forEach(img => {
          if (!img.classList.contains(this.className)) {
            img.setAttribute('src', this.imgsArr[this.swapIndex]);
          }
        })
      }

    // This function calls on the other functions to change 
    // the background image and cycle through the slideshow. 
    changeBg() {


        // The first time we start the slide show, initialize it
        if (this.slideCount === 0) {
            this.initImages()
            this.slideCount++;
        }
        else if (this.slideCount < 2) {
            this.swapImg(this.className)
            this.slideCount++;
        }
        else { // Start changing the image addresses here. 
    
            // If the swap index is greater than the # of indexes
            // for the array, change it back to 0. 
            if (this.swapIndex >= this.imgsArr.length) {
                console.log('limit reached -> back to 0')
                this.swapIndex = 0;
            }
        
            this.changeSrc()
        
            this.swapImg(this.className)
        }
    
        this.swapIndex++;
    }

    toggleSlideShow() {

        if (!this.slideShowActive) {
      
          this.slideShowActive = true;
      
          this.slideInterval = setInterval(() => {
            this.changeBg()
          }, 5000)
        }
      
        else { // If the slideshow is active, clear the interval. 
      
          this.slideShowActive = false;
      
          clearInterval(this.slideInterval)
      
        }
    }

    testClass() {
        console.log('Class initialized.')
    }

}

/*******************************************
 * MAIN SCRIPT
 *******************************************/


// Modal Buttons
let doneBtn = document.getElementById('done-btn');
let cancelBtn = document.getElementById('cancel-btn');
let galleryBtn = document.getElementById('gallery-btn');

let modalOverlay = document.getElementsByClassName('modal-overlay')[0];
let editIcon = document.getElementById('edit-icon-container');

// A collection of the modal images
let modalImages = document.querySelectorAll('.modal-image');
let modalImagesSrc = [...modalImages].map(img => img.getAttribute('src'))

const bgImages = document.querySelectorAll('.background-image');

// main background image 
const mainBGImage = document.querySelector('.main-image')

// Slideshow class instantiation
const bgSlideshow = new Slideshow(bgImages[0], bgImages[1], modalImagesSrc, 'visible')

bgSlideshow.testClass()

// BUTTON EVENT LISTENERS
editIcon.addEventListener('click', function () {
    modalOverlay.style.display = 'block';
});

cancelBtn.addEventListener('click', function () {
    modalOverlay.style.display = 'none';
})

doneBtn.addEventListener('click', function changeBg() {

    for (let i = 0; i < modalImages.length; i++) {
        if (modalImages[i].classList.contains('selected-image')) {
            changeBG(modalImages[i].getAttribute('src'));
        }
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
            if (modalImages[i].classList.contains('selected-image')) {
                modalImages[i].classList.remove('selected-image');
            }
        }
        image.classList.toggle('selected-image');
    })
})


// This function will be applied to the done button.
// It's mainly for selecting a background img, NOT the slideshow
function changeBG(image) {

    // Disable gallery mode if turned on. 
    if (bgSlideshow.slideShowActive) {
        // Reset the Slideshow class.
        bgSlideshow.reset()

        document.getElementById('gallery-mode').innerText = ''
    } 

    // Set the BG to the image selected by the user
    mainBGImage.setAttribute('src', image)

    // Make the bgimage visible, make/keep the other invisible
    if (!mainBGImage.classList.contains('visible')) {
        mainBGImage.classList.add('visible')
    }

}

function toggleGalleryMode() {

    if (mainBGImage.classList.contains('visible')) {
        mainBGImage.classList.remove('visible')
    }

    // Create a condition for whether gallery mode is off/on
    if (!bgSlideshow.slideShowActive) { // if slideShowActive is inactive (false)
        bgSlideshow.toggleSlideShow();

        document.getElementById('gallery-mode').innerText = ': ON';
    }
    else { //if slideShowActive is true
        bgSlideshow.reset();

        document.getElementById('gallery-mode').innerText = '';
    }

    modalOverlay.style.display = 'none';

    console.log(bgSlideshow.slideShowActive)

}


/******************************
 * MODAL NAVIGATION MENU
 ******************************/