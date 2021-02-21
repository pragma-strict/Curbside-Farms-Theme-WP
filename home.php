<!-- This get header thing just imports the php from the 'header.php' file right here. -->
<?php get_header();?>

<div class="content-block">

<h2>All posts in the Co-op section</h2><hr>

   <!-- Display the posts. This is the basic post loop, v common, v powerful :) -->
      <?php
      
            $args = array(
            'post_type' => 'post',
            //'orderby' => 'date' ,
            //'order' => 'DESC' ,
            //'posts_per_page' => 6,
            //'cat'         => '1',
            //'paged' => get_query_var('paged'),
            //'post_parent' => $parent
            ); 
            $q = new WP_Query($args);
            if ( $q->have_posts() ) : 
                  while ( $q->have_posts() ) : $q->the_post();   ?>
                        <?php 
                              // Get some data about the post to display is c U s T 0 m
                              $cat = "";
                              if( in_category( "Tasks" ) ) { $cat = "Task"; }
                              else if ( in_category( "Decisions" ) ) { $cat = "Decision"; }
                              else if ( in_category( "Produce" ) ) { $cat = "Produce"; }
                        ?>

                        <!-- Main post info -->
                        <h4><a href=<?php echo get_permalink() ?>> <?php the_title(); ?></a> <i>(<?php echo $cat ?>)</i></h4>

                        <!-- Custom functions depending on post type -->
                        <?php if( $cat == "Task" ) : ?>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input type="checkbox" class="form-check-input" name="" id="" value="checkedValue" unchecked>
                                  Task Completed
                                </label>
                              </div>
                              <br><hr>

                        <?php elseif($cat == "Decision") : ?>
                              <form action="" method="post">
                                    <label for="decision-info">What we should do:</label>
                                    <input type="text" id="decision-info" name="post_title"><br>
                                    <input type="submit" value="Submit Decision">
                              </form>
                              <br><hr>

                        <?php elseif($cat == "Produce") : ?>

                        <?php else : echo "unknown category :0" ?>

                        <?php endif; endwhile; ?>
            <?php else : ?>
            <p><?php __('Nothing here! :0'); ?></p>
            <?php endif; ?>
                  

</div>

<?php get_footer();?>