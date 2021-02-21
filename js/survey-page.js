/* Note about IDs:
   Each tab has an integer ID. Each question in that tab also has an integer ID.
   Each answer within each question also has an ID. They are concatenated so that each answer has a unique ID. An answer ID looks like this <tabID>_q<questionID>_<answerID>. So like 4_q2_1 is the 
   first answer to the second question on the fourth page. */

/* NOTE: At the end (on form submission) we need to go through and clear all the data from the fields
   on tabs NOT in the history. This is because the user might visit some tab, enter some info, then go back and choose a different route. If we don't clear that data they entered, however, it will be included in the form submission. In fact, I suppose we'll also want some method to remove empty fields from our final data so that there is less clutter.  */

/* TODO: The question text moves down to a new line below the buttons when the width is too small. 
   I want the buttons and the first bit of the question to stay on the same line. After that we've got
   to import all of the questions, make the titles look a little nicer and make sure we're okay with 
   the way the output is being posted. */


   /* ===== ADD ALL THE QUESTIONS HERE ===== */

// Tab 0
addQuestion("0", "1", "radio", 
"Do you currently have a food-producing garden?", 
[
   "Yes", 
   "No, but I'm interested, I just haven't or can't", 
   "No, and I'm not interested in having one"
], false );

addQuestion("0", "2", "radio", 
"What is your age range?", 
[
   "24 or under", 
   "25-34",
   "35-44",
   "45-54",
   "55-64",
   "65+",
   "Prefer not to say"
], false );

/*
addQuestion("0", "3", "radio",
"What is your household situation?",
[
   "Live alone",
   "other",
   "whatever. remove this...?"
], false );
*/

// Tab 1
addQuestion("1", "1", "checkbox",
"What motivates you to grow food?",
[
   "I get to eat fresh produce",
   "I feel more connected to nature",
   "I get more exercise",
   "I get access to more sustainable food",
   "I spend less on groceries",
   "There are social benefits",
   "It's good for the environment"
], true );

addQuestion("1", "2", "radio",
"If you imagine all the food that you grow in a year, roughly how many days could it feed a single person if they were to eat nothing else?",
[
   "<1 day",
   "1-3 days",
   "3-7 days",
   "7-14 days",
   "14-28 days",
   "28+ days"
], false );

addQuestion("1", "3", "radio",
"How much time to you spend tending to your garden per week?",
[
   "1/2 - 1 hours",
   "1 - 3 hours",
   "3 - 5 hours",
   "5 - 8 hours"
], false );

addQuestion("1", "4", "radio",
"Are you interested in increasing the productivity of your garden?",
[
   "Sure!",
   "Maybe",
   "Nope"
], false );


// Tab 2
addQuestion("2", "1", "checkbox",
"What productivity barriers do you face in the garden? (Select all that apply)",
[
   "Not enough space",
   "Poor soil quality",
   "Not enough time for watering",
   "Not enough time for maintenance (pruning, weeding, etc.)",
   "Not enough sunlight",
   "If I grew more I wouldn't be able to eat it all myself"
], true );

addQuestion("2", "2", "checkbox",
"How can we help you increase your yields?",
[
   "Provide more accessible soil/compost",
   "Provide cheaper access to seeds",
   "Provide garden beds"
], true );

// Tab 3
addQuestion("3", "1", "checkbox",
"Does the idea of sharing some of the food from your garden in exchange for food from your neighbors' gardens interest you?",
[
   "Yes, I'd like to be able to share the extra food I grow",
   "Yes, I'd like to have access to a wider variety of fresh food than I can grow by myself",
   "Yes, I'd like to connect with my community in this way",
   "Yes. If it means more people will grow food locally, I'm in!",
   "I'm not sure - I would need more information",
   "No, it doesn't interest me"
], true );

addQuestion("3", "2", "checkbox",
"What are your concerns (if any) about this idea?",
[
   "I wouldn't feel comfortable eating food that strangers have grown",
   "I personally don't grow enough to be worth trading",
   "It sounds like a lot of extra work"
], true );

addQuestion("3", "3", "checkbox",
"Exchanging food with your neighbors means occasionally going out of your way to do a pickup/drop off. How would you feel about making extra trips? (Note: a trip could include a short car ride, a bike ride, or a walk.) Please check all that apply.",
[
   "I don't mind making an extra trip every now and then",
   "I don't mind making an extra trip once a week",
   "I don't mind making extra trips multiple times per week",
   "It depends on how much I get out of it and how far I have to go",
   "I would be willing to make occasional extra trips to deliver my extra food even I don't get anything in return",
   "Making extra trips probably wouldn't be worth it to me"
], true );


// Tab 4
addQuestion("4", "1", "checkbox",
"Is there anything in particular that you don't like about gardening?",
[
   "No, I've just never done it or haven't really thought about it",
   "I have some experience but it just isn't for me",
   "I'm not really the outdoorsy type",
   "It sounds like a lot of work",
   "I don't have the time right now",
   "I'd rather not say"
], true );


// Tab 5
addQuestion("5", "1", "checkbox",
"What challenges do you face in starting your garden?",
[
   "I don't have enough time",
   "I don't have the right supplies",
   "I don't know what to grow",
   "I have no idea how gardening works",
   "I don't have enough space",
   "I just haven't gotten around to it"
], true );


// Tab 6
// done, I guess...


/* T E M P L A T E :
addQuestion("1", "3", "radio",
   "",
   [
      ""
   ], false );
*/



// Add event listeners to the buttons
document.getElementById("nextBtn").addEventListener("click", nextTab);
document.getElementById("prevBtn").addEventListener("click", prevTab);

// Define some variables
let currentTab = 0;
let tabElements = document.getElementsByClassName("survey-tab");
let numberOfTabs = tabElements.length;
let tabHistory = [ 0 ];

// Add event listeners to the survey tab divs to clear the "*required input" notifier
for(let i = 0; i < numberOfTabs; i++){
   tabElements[i].addEventListener("click", clearErrors);
}

// Function to clear the "*required input" notifier ^^^
function clearErrors(){
   let invalidElements = document.getElementsByClassName("invalid");
   for(let i = 0; i < invalidElements.length; i++){
      invalidElements[i].className = "";
   }
   document.getElementById("survey-missing-input-notifier").style.display = "none";
}

// Define where to go from each tab, or, in the case of per-question mappings, from each question
let tabMappings = [ 
   {  questionNumber: 1,   // The number of the question whose answer decides the logic
      mappingsFromAnswers: 
      [
         1,
         5,
         4
      ]},

   {  questionNumber: 4,
      mappingsFromAnswers: 
      [
         2,
         2,
         3
      ]},

   3, // Tab 2 maps to 3
   6, // 3 -> 6
   6, // 4 -> 6
   3  // 5 -> 3
];


// What to do when we press the "next" button
function nextTab()
{   
   // If we're not on the FINAL tab...
   if(currentTab < numberOfTabs -1)
   {
      // Find the tab mapping for our current tab
      // The mapping IS our next tab ID unless the mapping is an object
      let tabMapping = tabMappings[currentTab];

      // If the mapping for this tab is an object then our next tab depends on the input
      if(typeof(tabMapping) == 'object')
      {
         let radioButtonNameAttribute = currentTab + "_q" + tabMapping.questionNumber;
         let selectedRadioButton = findSelectedRadioButton(radioButtonNameAttribute);
         
         // If none of the required buttons were checked do some error stuff
         if(selectedRadioButton === false){
            let invalidElementID = radioButtonNameAttribute + "_div";
            document.getElementById(invalidElementID).className = "invalid";
            document.getElementById("survey-missing-input-notifier").style.display = "block";
            return;
         }
         else{
            var nextTabIndex = tabMapping.mappingsFromAnswers[selectedRadioButton];
         }
      }
      else{
         var nextTabIndex = tabMapping;
      }

      // Update the tab
      tabHistory.push(nextTabIndex);
      updateTab(nextTabIndex);
   }
}

// What to do when we press the "prev" button
function prevTab()
{
   // There should always be one element in the tab history b/c the current tab is stored there
   if(tabHistory.length > 1)
   {
      tabHistory.pop();
      let lastTabVisited = tabHistory[tabHistory.length -1];
      updateTab(lastTabVisited); // Show the new current tab
   }
}

/* Handles all the bits and pieces that have to happen when we change tabs including hiding old
   tab, showing new tab, updating current tab variable, showing/hiding the prev/next buttons, etc. */
function updateTab(newTab)
{
   if(newTab == currentTab){
      return;
   }

   // Show/hide tabs
   tabElements[currentTab].style.display = "none";
   tabElements[newTab].style.display = "block";
   
   // Update current tab var
   currentTab = newTab;

   // Deal with prev/next button visibility
   if(currentTab == 0){
      document.getElementById("prevBtn").style.display = "none";
   }
   else if(currentTab == tabElements.length -1){
      document.getElementById("nextBtn").style.display = "none";
   }
   else{
      document.getElementById("prevBtn").style.display = "inline-block";
      document.getElementById("nextBtn").style.display = "inline-block";
   }
   console.log(tabHistory);
}


// Given the name of a question (the value given to the name attribute on each input field) determine
// which of the buttons is pressed (has the 'checked' attribute == true). Return false if none
// were selected.
function findSelectedRadioButton(questionName)
{
   let buttonElements = document.getElementsByName(questionName);
   for(let i = 0; i < buttonElements.length; i++)
   {
      if(buttonElements[i].checked)
      {
         return i;
      }
   }
   return false;
}


/* Adds the HTML for a question. Just a time saver so we don't have to write all the HTML by hand.
   @param tabDivID - the ID of the tab into which we are adding the question
   @param questionNumber - which question this is within the tab. Used to set answer name & ID
   @param inputType - radio or checkbox, or maybe even text - not sure how that will work
   @param questionTitle - a string title of the question
   @param answerValues - a string array of possible answers if the question is multiple choice 
   @param bAddOtherField - true if we should add an "other" text input field
*/
function addQuestion(tabDivID, questionNumber, inputType, questionTitle, answerValues, bAddOtherField)
{
   // Set up a string to contain all the HTML that will make up this question
   let inputName = tabDivID + "_q" + questionNumber;
   let HTML_questionFull = "<div id=\"" + inputName + "_div\">";  // class=\"survey-question\"
   HTML_questionFull += "<p>" + questionNumber + ". " + questionTitle + "</p>";
   //HTML_questionFull += "<ul>"

   // Add the HTML for each of the input fields (radio buttons or check boxes)
   for(let i = 0; i < answerValues.length; i++)
   {
      // Decide on the input name and ID
      let inputID = inputName + "_" + i;
      let HTML_name = "name=\"" + inputName + "\" ";
      if (inputType == "checkbox"){
         HTML_name = "name=\"" + inputID + "\" ";
      }

      // Append the <input> tag with all the fixings (type, ID, name, value, etc.) Also add <label>
      HTML_questionFull += "<div><label for=\"" + inputID + "\"> ";
      HTML_questionFull += "<input type=\"" + inputType + "\" ";
      HTML_questionFull += "id=\"" + inputID + "\" ";
      HTML_questionFull += HTML_name;
      HTML_questionFull += " oninput=\"this.parentNode.className = ''\""; // To clear "invalid" attribute
      HTML_questionFull += "value=\"" + questionTitle + ": " + answerValues[i] + "\">";
      HTML_questionFull += "<span>" + answerValues[i] + "</span>";
      HTML_questionFull += "</label></div>";
   }

   // Add an "other" field if necessary
   if(bAddOtherField){
      let otherID = inputName + "_other";
      HTML_questionFull += "<div><label for=\"" + otherID + "\">";
      HTML_questionFull += "<span>Other (please specify)</span>";
      HTML_questionFull += "<input type=\"text\" id=\"" + otherID + "\" name=\"" + otherID + "\">"
      HTML_questionFull += "</label></div>";
   }

   // Add final space and divider
   HTML_questionFull += "<hr></div>";

   // Add the question HTML
   let div = document.getElementById(tabDivID);
   div.innerHTML += HTML_questionFull;
}