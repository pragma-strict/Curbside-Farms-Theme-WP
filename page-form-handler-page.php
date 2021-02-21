<?php get_header();?>


<div>
   <h1>Welcome to the form handler</h1>
   Title: <?php echo $_POST["post_title"]; ?><br>
   Content: <?php echo $_POST["post_content"]; ?>
</div>

<?php 
$title = $_POST["post_title"];
$content = $_POST["post_content"];
$category = array($_POST["post_category"]);
$id = wp_insert_post(
   array(
      'post_title'=>$title, 
      'post_content'=>$content, 
      'post_type'=>'post', 
      'post_category'=>$category,
      'post_status'=>'publish')
   );

echo("Created new post with ID: " . $id);

get_footer();
?>