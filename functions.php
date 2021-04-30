<?php



/*
	Register our css
*/
function load_stylesheets()
{
	wp_register_style('bootstrap', "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", '', 1, 'all');
	wp_enqueue_style('bootstrap');
	wp_register_style('s1', get_template_directory_uri() . '/style.css', '', 1, 'all');
	wp_enqueue_style('s1');
	wp_register_style('s2', get_template_directory_uri() . '/css/header-footer.css', '', 1, 'all');
	wp_enqueue_style('s2');
	wp_register_style('s3', get_template_directory_uri() . '/css/front-page-old.css', '', 1, 'all');
	wp_enqueue_style('s3');
	wp_register_style('s4', get_template_directory_uri() . '/css/about.css', '', 1, 'all');
	wp_enqueue_style('s4');
}
add_action('wp_enqueue_scripts', 'load_stylesheets'); // Hook in load_stylesheets()




/*
	Register our js
*/
function load_javascript()
{
	wp_register_script('custom', get_template_directory_uri() . '/js/app.js', '', 1, true);
	wp_enqueue_script('custom');
}
add_action('wp_enqueue_scripts', 'load_javascript'); // Hook in load_javascript()


/*
	This function does all the init for our theme
*/
function theme_setup()
{
	// Add support for menus (add a little menus option under 'appearance')
	add_theme_support('menus');

	// Add theme support for a custom background
	add_theme_support('custom-background');

	// Add theme support for a custom header
	add_theme_support('custom-header');

	// Add theme support for post thumbnails
	add_theme_support('post-thumbnails');

	// Register some menus
	register_nav_menu('main', 'This is the main nav menu');
	register_nav_menu('main_logged_in', 'This is the main nav menu for people who are logged in');
	register_nav_menu('footer', 'This is the footer menu');
}
add_action('init', 'theme_setup');



/*
	Register a new sidebar. Multiple sidebars can be registered from here.
	Widgets can be added to this sidebar from the WP backend.
*/
function register_custom_sidebars() {

	register_sidebar( 
		array(
			'name' => 'Login',
			'id' => 'sidebar-1',
			'class' => 'custom-1',	// WP prepends "sidebar-" to the class name
			'description' => 'This sidebar contains a smart login link',
			// Some html can be inserted here to customize the sidebar
		) 
	);

	
	register_sidebar( 
		array(
			'name' => 'RM_Register',
			'id' => 'sidebar-2',
			'class' => 'custom-2',	// WP prepends "sidebar-" to the class name
			'description' => 'This sidebar contains RMs registration form widget',
		) 
	);
}
add_action( 'widgets_init', 'register_custom_sidebars' );



/*
	Block non-administrators from accessing the WordPress back-end.
	Works by redirecting them to home page. Works good but does not hide admin bar.
*/
// function block_users_backend() {
// 	if ( is_admin() && ! current_user_can( 'administrator' ) && ! wp_doing_ajax() ) {
// 		wp_redirect( home_url() );
// 		exit;
// 	}
// }
// add_action( 'init', 'block_users_backend' );






/*	========================
	CREATING A CUSTOM WIDGET
	======================== */

// Creating the widget 
class wpb_widget extends WP_Widget {
  
	function __construct() {
	parent::__construct(
	  
	// Base ID of your widget
	'wpb_widget', 
	  
	// Widget name will appear in UI
	__('WPBeginner Widget', 'wpb_widget_domain'), 
	  
	// Widget description
	array( 'description' => __( 'Sample widget based on WPBeginner Tutorial', 'wpb_widget_domain' ), ) 
	);
	}
	  
	// Creating widget front-end
	  
	public function widget( $args, $instance ) {
	$title = apply_filters( 'widget_title', $instance['title'] );
	  
	// before and after widget arguments are defined by themes
	echo $args['before_widget'];
	if ( ! empty( $title ) )
	echo $args['before_title'] . $title . $args['after_title'];
	  
	// This is where you run the code and display the output
	echo __( 'Hello, World!', 'wpb_widget_domain' );
	echo $args['after_widget'];
	}
				 
	// Widget Backend 
	public function form( $instance ) {
	if ( isset( $instance[ 'title' ] ) ) {
	$title = $instance[ 'title' ];
	}
	else {
	$title = __( 'New title', 'wpb_widget_domain' );
	}
	// Widget admin form
	?>
	<p>
	<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
	<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
	</p>
	<?php 
	}
			
	// Updating widget replacing old instances with new
	public function update( $new_instance, $old_instance ) {
	$instance = array();
	$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
	return $instance;
	}
	 
	// Class wpb_widget ends here
	} 
	 
	 
	// Register and load the widget
	function wpb_load_widget() {
		 register_widget( 'wpb_widget' );
	}
	add_action( 'widgets_init', 'wpb_load_widget' );