
/* 
   This code updates the CSS position and size properties of background images to ensure
   that they always fill the div along its longest axis. This will always result in some
   cropping but the image will always fill the full space available without stretching. 
*/

// Set info about classes to update
const classes = [
   {
      className: "grid-container-centerpiece",
      imageAspectRatio: 1.9   // Width divided by height
   }
];

window.onload = load;
window.onresize = fill_update;

function load(){
   for (let i = 0; i < classes.length; i++){
      let elementsFromClass = document.getElementsByClassName(classes[i]);
      for (let j = 0; j < elementsFromClass.length; j++){
         elements.push(elementsFromClass[j].className);
         console.log("Adding element: " + elementsFromClass[j] + " to the list")
      }
   }
   fill_update()
}

function fill_update(){
   classes.forEach(classData => {
      let elements = document.getElementsByClassName(classData.className);
      for(let i = 0; i < elements.length; i++){
         let computedStyle = window.getComputedStyle(elements[i]);
         let aspectRatio = parseInt(computedStyle.width) / parseInt(computedStyle.height); 
         if(aspectRatio > classData.imageAspectRatio){
            elements[i].style.backgroundSize = "100% auto";
         }
         else{
            elements[i].style.backgroundSize = "auto 100%";
         }
      }
   });
}