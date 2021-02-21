<?php get_header();?>

<!-- Import the survey page js -->
<script src="../wp-content/themes/Curbsite/js/survey-page.js" type="module"></script>

<div id="survey-page">

   <h1>Curbside Farms</h1>

   <form action="/survey-complete" method="post">

      <div id="0" class="survey-tab">
         <h3>Help us build a healthier food system by sharing your opinion!</h3>
         <p>We're working to grow more food in and around the city of Victoria. We believe this is an important step in transitioning to a more sustainable and regenerative food-supply system.</p>
      </div>

      <div id="1" class="survey-tab" style="display: none">
         <h3>If you don't mind, we'd like to know a bit more about your gardening habits.</h3>
      </div>

      <div id="2" class="survey-tab" style="display: none">
         <h3>We'd love to help you grow more, if we can!</h3>
      </div>

      <div id="3" class="survey-tab" style="display: none">
         <h3>Crop Exchange Idea</h3>
         <p>We're building an online app that allows people to trade homegrown produce with other growers who live nearby. We feel that a system like this could offer numerous benefits to the communities involved and that it is an important step in reducing our dependence on our current, unsustainable food-production system.</p>
      </div>

      <div id="4" class="survey-tab" style="display: none">
         <h3>You aren't interested in having a garden right now. That's cool!</h3>
      </div>

      <div id="5" class="survey-tab" style="display: none">
         <h3>How can we help?</h3>
         <p>We would love to help you get started by motivating you to garden or removing accessibility barriers.</p>
      </div>

      <div id="6" class="survey-tab" style="display: none">
         <h3>All done!</h3>
         <input type="submit" value="Finish Survey!">
      </div>

   </form>

   <div style="overflow:auto;">
      <button type="button" id="prevBtn" style="display:none">Previous</button>
      <button type="button" id="nextBtn" style="display:inline-block">Next</button>
      <p id="survey-missing-input-notifier" style="display:none"><span style="background-color: #ffdddd; width: 1rem; height: 1rem; display: inline-block;">*</span> Required questions</p>
   </div>

</div>
