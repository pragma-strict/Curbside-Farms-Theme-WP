/* This script makes sure that elements with the .footer class will be stuck to the bottom of the page when there isn't enough content to push it to the bottom naturally. */

window.addEventListener("resize", positionFooter);
document.addEventListener('DOMContentLoaded', positionFooter);

function positionFooter(){
   let footer = document.querySelector("footer");
   let footerHeight = window.getComputedStyle(footer).height.slice(0, 2);
   let isFooterAbsolute = window.getComputedStyle(footer).position == "absolute" ? true : false;
   if(footer){
      let body = document.body;
      let html = document.documentElement;
   
      let contentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.offsetHeight );
      if(contentHeight < window.innerHeight && !isFooterAbsolute){
         footer.style.position = "absolute";
         footer.style.bottom = "0";
         footer.style.width = "100%";
      }
      else if(contentHeight > window.innerHeight - footerHeight && isFooterAbsolute){
         footer.style.position = "static";
      }
   }
}