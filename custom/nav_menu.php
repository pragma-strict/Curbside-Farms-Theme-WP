<?php function insert_nav_menu(){ ?>

   <div id="nav-menu-bar" class="fp-section header-footer padding">
      <div class="container">
         <a href="<?php echo home_url(); ?>">
            <h1>CURBSIDE FARMS</h1>
         </a>
         
         <div class="nav-dropdown-container">
            <button class="nav-dropdown-btn">
               <div class="hamburger-icon-layer"></div>
               <div class="hamburger-icon-layer"></div>
               <div class="hamburger-icon-layer"></div>
            </button>
            <div class="nav-dropdown-content" id="nav-dropdown-content-ID">
               <a href="<?php echo home_url() . "/bootstrap-test-page"; ?>">TEST</a>
               <a href="<?php echo home_url() . "/community"; ?>">COMMUNITY</a>
               <a href="<?php echo home_url() . "/my-profile"; ?>">MY PAGE</a>
            </div>
         </div>
      </div>
   </div>

<?php } ?>