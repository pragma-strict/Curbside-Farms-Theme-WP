
<?php
   $args = array(
      'numberposts' => 10
    );

   $posts = get_posts($args);
   echo sizeof($posts);
   //for($i = 0; $i < 5; $i++){
   //   echo ($posts[$i]);
   //}
?>