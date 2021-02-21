<?php get_header();?>

<!-- This sends some from the form back to the server through an http request and also gets a new page.
The form handler page takes the data and sticks it into an array and gives it to WP to put in its db. Super simple. The next question is to figure out how to do the tasks and stuff. I think I might need to use a table of connections or something to associate task posts with users. Or it's possible that I could stick the IDs of the related users in the post itself somewhere. Another aspect of the tasks is to figure out how to display them. Ok so I need a custom post type for task, I need to figure out how to display all the tasks and only the tasks on a page. Actually, since I need to have a certain page which displays all of the post types I need to be able to filter them. So I need to figure out how to display only certain types of posts. There may be a get_post or something. 

-->



<div class="cs-margin-basic">
   <h2>Make a custom post</h2>
   <hr>
   <div class="cs-form-test">
      <form action="/form-handler-page" method="post" autocomplete="off">
         <label for="post_title">Title:</label>
         <input type="text" id="post_title" name="post_title"><br>
         <label for="post_content">Content:</label>
         <input type="text" id="post_content" name="post_content"><br>
         <label for="post_category">Post Type:</label>
         <select name="post_category" id="post_category">
            <?php 
               $categories = get_categories( ["hide_empty" => false] ); 
               foreach ($categories as $category){
                  echo "<option value='" . $category->term_id . "'>";
                  echo $category->name . "</option>";
               }
            ?>
         </select>
         <br>
         <input type="submit" value="Make Post">
      </form>
   </div>
</div>

<?php 
get_footer();
?>