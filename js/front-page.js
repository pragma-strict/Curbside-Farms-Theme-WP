
/* NOTES:
I'm in the middle of trying to make the transitions work. My idea is to put each image inside a div that is only responsible for getting repositioned during transitions. That way the 'left' property which is used to adjust the image positions according to their focal points is separate from the 'left' property used for transitions. Not sure what the matter is now. */

// HTML element IDs
const ID_MASTER_CONTAINER = 'fp-master-container';
const ID_IMAGE_WINDOW = 'fp-image-container';
const ID_CONTENT_WINDOW = 'fp-text-container';
const ID_DOCUMENT_HEIGHT = 'fp-document-height';

// HTML element classes
const CLASS_SECTION = 'fp-section';
const CLASS_IMAGE_SINGLE = 'fp-image-single';
const CLASS_IMAGE_TRANSITION_CONTAINER = 'fp-image-transition-wrapper';
const CLASS_CONTENT_SINGLE = 'fp-content-single';
const CLASS_PROGRESS_BAR = 'divider';

// Layout constants
const DOCUMENT_HEIGHT = 5000; //px
const NUMBER_OF_PAGE_SECTIONS = 4;

// Global page state variables
let gl_imageWidth;
let gl_imageHeight;
let gl_currentSection = -1;   // Zero-indexed
let gl_prevSection = -1;   // Zero-indexed
let gl_imageSlideAmount = window.innerWidth * 0.02; //px

// Image sources
let imageSources = new Array();
imageSources[0] = 'wp-content/themes/Curbsite/img/fp-3-1.png';
imageSources[1] = 'wp-content/themes/Curbsite/img/fp-1-1.png';
imageSources[2] = 'wp-content/themes/Curbsite/img/fp-23-f3.png';
imageSources[3] = 'wp-content/themes/Curbsite/img/fp-1-2.png';

// Other image data
let imageFocalPoints = [[0.4, 0.77], [0.65, 0.4], [0.65, 0.4], [0.65, 0.4]];
let imageTransitionBasePosition = [0, 0, 0, 0];

// Load the js only after the page is loaded. Slow? Maybe. Necessary? Ask me later.
window.onload = fp_load;




/* --------------------------------------------
      FUNCTIONS LINKED TO WINDOW EVENTS
-------------------------------------------- */

/* To be called when the page first loads */
function fp_load(){
   window.onscroll = fp_scroll;
   window.onresize = fp_resize;
   document.getElementById(ID_DOCUMENT_HEIGHT).style.height = DOCUMENT_HEIGHT + "px";
   loadImages();
   fp_scroll();
   fp_resize();
   initImageTransitionStates();
}

/* To be called on scroll */
function fp_scroll(){
   updatePageSection();
   updateProgressBar(calculateScrollPercentage());
   showContent(gl_currentSection);
}

/* To be called on window resize*/
function fp_resize(){
   updateImageDimensions();
   updateImagePosition();
   updateImageContainerDimensions();
   updateTextSectionHeight();
   gl_imageSlideAmount = window.innerWidth * 0.02;
}

/* To be called when page transitions to a new section */
function onSectionTransition(){
   transitionImage();
   updateImageContainerDimensions();
   updateTextSectionHeight();
}



/* --------------------------------------------
            PAGE STATE FUNCTIONS
-------------------------------------------- */

/* Returns the current scroll position as a percentage (0-100) 
NOTE: Will return value over 100 if wp admin bar is displayed. This causes minor errors. */
function calculateScrollPercentage(){
   let maxPageYOffset = DOCUMENT_HEIGHT - window.innerHeight;
   return window.pageYOffset / maxPageYOffset * 100;
}

/* Updates page state if page section has changed since last call */
function updatePageSection(){
   let sectionSizePercentage = 100 / NUMBER_OF_PAGE_SECTIONS;
   // Note: the *0.999 below is so we never get a value == NUMBER_OF_PAGE_SECTIONS. Hacky? Sure.
   var newSection = Math.floor(calculateScrollPercentage() / sectionSizePercentage * 0.999);
   
   if(newSection != gl_currentSection){
      gl_prevSection = gl_currentSection;
      gl_currentSection = newSection;
      onSectionTransition();
   }

   return newSection;
}



/* --------------------------------------------
      FUNCTIONS TO UPDATE THE IMAGE
-------------------------------------------- */

/* Insert the image sources into the HTML */
function loadImages(){
   var imageElements = document.getElementsByClassName(CLASS_IMAGE_SINGLE);
   for(var i = 0; i < imageSources.length; i++){
      if(i < imageElements.length){
         imageElements[i].src = imageSources[i];
      }
   }
}

/* Initializes the image positions to enable carousel-style transitions */
function initImageTransitionStates(){
   var imageElements = document.getElementsByClassName(CLASS_IMAGE_TRANSITION_CONTAINER);
   for(var i = 0; i < imageElements.length; i++){
      if(i < gl_currentSection){
         imageElements[i].style.left = (gl_imageSlideAmount * -1) + "px";
      }
      else if(i > gl_currentSection){
         imageElements[i].style.left = (gl_imageSlideAmount) + "px";
      }
      else if(i == gl_currentSection){
         imageElements[i].style.left = "0px";
      }
   }
}

/* Shows the image at a given index and updates image positions for carousel-style transition  */
function transitionImage(){
   var imageElements = document.getElementsByClassName(CLASS_IMAGE_SINGLE);

   // Update opacity to show new image
   for(var i = imageElements.length -1; i > gl_currentSection; i--){
      imageElements[i].style.opacity = "0";
   }
   imageElements[gl_currentSection].style.opacity = "1";

   // Only trigger transition if this isn't the FIRST image
   if(gl_prevSection != -1){
      var imageTransitionElements = document.getElementsByClassName(CLASS_IMAGE_TRANSITION_CONTAINER);
   
      // Moving to the RIGHT
      if(gl_currentSection > gl_prevSection){
         imageTransitionElements[gl_prevSection].style.left = (-1 * gl_imageSlideAmount) + "px";
         imageTransitionElements[gl_currentSection].style.left = "0px";
      }

      // Moving to the LEFT
      else {
         imageTransitionElements[gl_prevSection].style.left = gl_imageSlideAmount + "px";
         imageTransitionElements[gl_currentSection].style.left = "0px";
      }
   }
}


function calculateVisibleImageHeightForSection(sectionIndex){
   let imageElements = document.getElementsByClassName(CLASS_IMAGE_SINGLE);
   let textElements = document.getElementsByClassName(CLASS_CONTENT_SINGLE);
   let sectionElements = document.getElementsByClassName(CLASS_SECTION);
   let targetImageHeight = window.innerHeight; 

   // Possible early return
   if(imageElements.length != textElements.length){
      console.log("updateImageSizes: Failed because number of images and text sections were not equal");
      return -1;
   }
   
   // Subtract height of sections other than the image and text (ie. the navbar)
   for(var i = 0; i < sectionElements.length; i++){
      if(sectionElements[i].id != ID_IMAGE_WINDOW && sectionElements[i].id != ID_CONTENT_WINDOW){
         targetImageHeight -= getComputedStyleProperty(sectionElements[i], "height");
      }
   }

   // Subtract vertical margins of all sections 
   for(var i = 0; i < sectionElements.length; i++){
      targetImageHeight -= getComputedStyleProperty(sectionElements[i], "margin-top");
      targetImageHeight -= getComputedStyleProperty(sectionElements[i], "margin-bottom");
   }
   
   // Subtract the height of the text in this section
   targetImageHeight -= getComputedStyleProperty(textElements[sectionIndex], "height");

   return targetImageHeight;
}


/* Sets the size of each image element to the largest size required by any of them. 
   They'll all be the same size after this.
   Should be called on load and resize. */ 
function updateImageDimensions(){
   let imageElements = document.getElementsByClassName(CLASS_IMAGE_SINGLE);

   // Find the maximum height required by any image according to its corresponding text
   let finalTargetImageHeight = 0;
   for(let sectionIndex = 0; sectionIndex < imageElements.length; sectionIndex++){
      let currentTarget = calculateVisibleImageHeightForSection(sectionIndex);
      if(currentTarget > finalTargetImageHeight){
         finalTargetImageHeight = currentTarget;
      }
   }

   // Log warning if max height not found properly 
   if(finalTargetImageHeight == 0){
      console.log("WARNING: updateImageDimensions: image heights being set to 0");
   }

   // Apply the target height unless width is greater, in which case scale to fill width instead
   for(let sectionIndex = 0; sectionIndex < imageElements.length; sectionIndex++){
      var imageStyle = imageElements[sectionIndex].style;
      if(finalTargetImageHeight >= window.innerWidth){
         imageStyle.height = finalTargetImageHeight + "px";
         imageStyle.width = "auto";
      }
      else{
         imageStyle.width = window.innerWidth + "px";
         imageStyle.height = "auto";
         document.getElementById(ID_IMAGE_WINDOW).style.height = finalTargetImageHeight + "px";
      }
   }
}


/* Sets height of image container based on the height of the current text section. 
   To be called on resize and transition. */
function updateImageContainerDimensions(){
   let containerTargetHeight = calculateVisibleImageHeightForSection(gl_currentSection);
   document.getElementById(ID_IMAGE_WINDOW).style.height = containerTargetHeight + "px";
}


/* Ensures that the focal point of each image is always in view. To be called on resize. */
function updateImagePosition(){
   let containerWidth = window.innerWidth;
   let containerHeight = calculateVisibleImageHeightForSection(gl_currentSection);
   var imageElements = document.getElementsByClassName(CLASS_IMAGE_SINGLE);

   for(var i = 0; i < imageElements.length; i++){
      var imageStyle = imageElements[i].style;
      var imageSize = Math.max(containerWidth, containerHeight);
      if(imageSize > containerWidth){
         var freedomX = imageSize - containerWidth;
         imageStyle.left = "-" + freedomX * imageFocalPoints[i][0] + "px";
         //imageTransitionBasePosition[i] = freedomX * imageFocalPoints[i][0] * -1;
      }
      if(imageSize > containerHeight){
         var freedomY = imageSize - containerHeight;
         imageStyle.top = "-" + freedomY * imageFocalPoints[i][1] + "px";
      }
   }
}





/* --------------------------------------------
      FUNCTIONS TO UPDATE THE TEXT CONTENT
-------------------------------------------- */

/* Changes the visible content section if needed */
function showContent(contentClassIndex){
   var contentElements = document.getElementsByClassName(CLASS_CONTENT_SINGLE);
   var numberOfContentElements = contentElements.length;

   if(contentClassIndex < numberOfContentElements){
      for(var i = 0; i < numberOfContentElements; i++){
         if(i == contentClassIndex){
            contentElements[i].style.opacity = "1";   
         }
         else{
            contentElements[i].style.opacity = "0";
         }
      }
   }
}


/* Update the height of the entire text section based on the height of the current text container */
/* Should only be called on transition because it will trigger CSS animation */
function updateTextSectionHeight(){
   console.log("updating text container height")
   var contentElements = document.getElementsByClassName(CLASS_CONTENT_SINGLE);
   if(gl_currentSection < contentElements.length){
      var contentElement = contentElements[gl_currentSection];
      var contentStyle = window.getComputedStyle(contentElement);
      var contentHeight = parseInt(contentStyle.getPropertyValue("height").slice(0, -2));
      document.getElementById(ID_CONTENT_WINDOW).style.height = contentHeight + "px";
   }
}


/* Updates the height of the content window element based on the current content section */
/* To be deprecated 
function updateContentWindowDimensions(){
   var contentElements = document.getElementsByClassName(CLASS_CONTENT_SINGLE);
   if(gl_currentSection < contentElements.length){
      var contentElement = contentElements[gl_currentSection];
      var contentStyle = window.getComputedStyle(contentElement);
      var contentHeight = parseInt(contentStyle.getPropertyValue("height").slice(0, -2));
      document.getElementById(ID_CONTENT_WINDOW).style.height = contentHeight + "px";
   }
}*/ 




/* --------------------------------------------
               OTHER FUNCTIONS
-------------------------------------------- */

/* Update the progress bar in the divider class */
function updateProgressBar(pageScrollPercent){
   var contentElements = document.getElementsByClassName(CLASS_CONTENT_SINGLE);
   for(var i = 0; i < contentElements.length; i++){
      var dividerElement = contentElements[i].querySelector("." + CLASS_PROGRESS_BAR);
      var progressBarElement = dividerElement.querySelector("span");
      progressBarElement.style.width = pageScrollPercent + "%";
   }
}

/* Helper function to access computed styles by element ID */
function getComputedStylePropertyByID(elementID, propertyName){
   var element = document.getElementById(elementID);
   var elementStyle = window.getComputedStyle(element, null);
   return parseInt(elementStyle.getPropertyValue(propertyName).slice(0, -2));
}

/* Helper function to access computed style of an element */
function getComputedStyleProperty(element, propertyName){
   var elementStyle = window.getComputedStyle(element, null);
   return parseInt(elementStyle.getPropertyValue(propertyName).slice(0, -2));
}