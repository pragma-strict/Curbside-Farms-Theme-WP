<?php get_header(); // in the HTML body tag now ?>


<!-- This page should be designed with a grid-based thing so our footer can be a bottom row, navbar a top row, etc. That way everything stays responsive and works together nicely. I really gotta get on this flexbox thing - it seems like the future. -->
<div class="grid-container-centerpiece">
      <div style="grid-row:2; grid-column:2" class="grid-item-centerpiece container">
         <h3>We make custom garden beds from repurposed pallets and deliver them to your home.</h3>
         <br>
         <a href="<?php echo ( get_home_url() .  "/order-bed" ); ?>" class="btn btn-primary">Place An Order</a>
         <a href="<?php echo ( get_home_url() .  "/vision" ); ?>" class="btn btn-secondary">Learn More</a>
      </div>
</div>

<script src="<?php echo( get_theme_root_uri( ) . "/curbside-farms/js/image-fill.js" ); ?>" type="module"></script>

<?php get_footer(); ?>