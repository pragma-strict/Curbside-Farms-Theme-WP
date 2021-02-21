<?php get_header(); ?>

<?php 
   if (!empty($_POST)) {
      //user posted variables
        $name = 'name';
        $email = 'ian@curbsidefarms.ca';
        $message = 'Test Mail';
      
      //php mailer variables
        $to = 'ianrdejong@gmail.com';
        $subject = "Report";
        $headers = 'From: '. $email . "\r\n" .
          'Reply-To: ' . $email . "\r\n";
      
      echo "check";
      
      //Here put your Validation and send mail
      $sent = wp_mail($to, $subject, strip_tags($message), $headers);
            if($sent) {
            echo "sent";
            }//mail sent!
            else  {
            echo "failed";
            }//message wasn't sent
      }

   //if(!empty($_POST)){
   //   $success = wp_mail("ianrdejong@gmail.com", "Test email", "This is my message to you!!!");
   //}
?>

<div class="container">
   <form action="../send-mail" method="POST">
      <label for="text">Input Label</label>
      <input type="hidden" name="text" id="text" value="Email send attempted"></input>
      <br>
      Send a test email:
      <button type="submit">Send</button>
   </form>
   <h4>
      <?php echo implode(" ", $_POST); ?>
      <?php //echo ("Mail returned: " . $success); ?>
   </h4>
</div>

<?php get_footer(); ?>