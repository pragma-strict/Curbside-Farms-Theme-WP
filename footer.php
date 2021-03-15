<footer>
   <div class="nav-primary footer">
      <div class="container">
         <?php 
            if(is_user_logged_in( ))
            {
               wp_nav_menu(
                  array(
                     'menu' => 'Footer Logged In',
                     'menu_class' => 'nav__links__footer',
                     'container_class' => 'navbar'
                     )
                  );
            }
            else
            {
               wp_nav_menu(
                  array(
                     'menu' => 'Footer',
                     'menu_class' => 'nav__links__footer',
                     'container_class' => 'navbar'
                     )
                  );
            }
         ?>
      </div>
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

<?php wp_footer(); // This footer just adds a bunch of scripts as far as I can tell ?>

</body>
</html>