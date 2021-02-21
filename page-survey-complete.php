<?php get_header();?>

<h1>Thanks, we appreciate your input! We hope you have a nice rest of your day!</h1>

<?php 
   $data_to_save = "";
   $current_question_key = "";
   $b_new_question = false;
   $b_is_first_question = true;

   // Go through all the entries in $_POST and append them to a string
   for($i = 0; $i < sizeof($_POST); $i++)
   {
      // Start by getting the key and value from $_POST
      $full_key = key($_POST);
      $value = current($_POST);

      // If the value isn't empty
      if($value != ""){
         // Get an identifier based on the first part of the key and check whether we're on a new question or adding more answers from a previous question
         $new_question_key = substr($full_key, 0, 4);
         if($new_question_key == $current_question_key){
            $b_new_question = false;
         }
         else{
            $b_new_question = true;
         }
         $current_question_key = $new_question_key;
   
         // The "value" of each entry in $_POST consists of the question name followed by the answer.
         // We split this string with the delimiter ":" in order to access the q and a separately.
         $split_index = strpos($value, ":", 0);
         $question = substr($value, 0, $split_index);
         $answer = substr($value, $split_index +1);
         if($b_new_question){ // Output the key and question if it's a new question
            if($b_is_first_question == false){
               $data_to_save .= "</ul>";
               $data_to_save .= "<br>";
            }
            $data_to_save .= "<i>Key: $full_key</i><br>";
            $data_to_save .= "<b>$question</b><br>";
            $b_is_first_question = false;
            $data_to_save .= "<ul>";
         }
         $data_to_save .= "<li>$answer</li>";
      }
      next($_POST);
   }

   // Set up some data for our submission post
   $title = "survey submission";
   $categories = []; // set up an array of categories for this post
   $categoryID = get_cat_ID( "survey-submissions" );  // get the category id we want
   if($categoryID == 0){ 
      array_push($categories, 1); // Set to 'uncategorized' if no cat found
   } 
   else{
      array_push($categories, $categoryID);  // otherwise set to the value we found
   }

   $id = wp_insert_post(
      array(
         'post_title'=>$title, 
         'post_content'=>$data_to_save, 
         'post_type'=>'post', 
         'post_category'=>$categories,
         'post_status'=>'private')
      );
   
   echo("Created new post with ID: " . $id);
?>

