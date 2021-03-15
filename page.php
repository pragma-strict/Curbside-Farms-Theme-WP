<?php get_header();?>

<div class="content">
   <?php 
      if(have_posts()): 
         while(have_posts()): 
            the_post(); ?>
      <p> <?php the_content(); ?> </p>
   <?php endwhile; else: endif; ?>
</div>



<?php get_footer();?>