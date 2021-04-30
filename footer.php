<footer>
   <?php 
      $menu_args = [
         'menu' => 'Footer'
      ];
      wp_nav_menu( $menu_args );
   ?>
   <div class="credits">
      <div>Icons made by <a href="https://www.flaticon.com/authors/ddara" title="dDara">dDara</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
   </div>
</footer>


<!-- NOTE: Always add scripts in the footer because pages load sequentially and we want scripts to load last. -->

<!--Add jQuery js-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<!--Add the bootstrap js-->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

<!--Add the p5 js
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js"></script>-->

<script src="<?php echo( get_theme_root_uri( ) . "/curbside-farms/js/nav.js" ); ?>" type="module"></script>

<?php wp_footer(); // This footer just adds a bunch of scripts as far as I can tell ?>

</body>
</html>