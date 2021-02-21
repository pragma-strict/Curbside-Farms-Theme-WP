<!-- This get header thing just imports the php from the 'header.php' file right here. -->
<?php get_header();?>

<p>This is the archive page - <?php echo('template file: ' . basename(__FILE__))?></p>

<!-- Display the posts -->
<?php 
      if(have_posts()): 
         while(have_posts()): 
            the_post(); ?>

   <h1><?php the_title(); ?></h1>
   <small>Posted on: <?php the_time(); ?></small>
   <p>The page content: <?php the_content(); ?></p>

   <?php endwhile; else: endif; ?>
   

<?php get_footer();?>
