<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width = device-width, initial-scale = 1, shrink-to-fit=no">


<head>
	<!--Set the title of the page that will appear in the tab-->
	<title>Curbside Farms</title>

	<!--Add Montserrat font -->
	<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>

	<!-- This function inserts a bunch of header stuff such as the css we've registered in functions.php -->
	<?php wp_head();?>
</head>


<!--Begin the body tag and use php to insert a bunch of classes that the body tag will use. -->
<body>

<?php //if(!is_front_page( )): ?>
	<div class="menu-main-container">
		<?php 
			$menu_args = [
				'menu' => 'Main',
				'container_class' => 'container'
			];
			wp_nav_menu( $menu_args );
		?>
	</div>
	<div class="divider-special"></div>
<?php //endif; ?>
	


