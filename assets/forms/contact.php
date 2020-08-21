<?php
  // The global $_POST variable allows you to access the data sent with the POST method by name
  // To access the data sent with the GET method, you can use $_GET
  $recipient = "nicholaskonzen@gmail.com";
  $subject = "Contact Form Submission";
  $name = htmlspecialchars($_POST['name']);
  $email  = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  $mailBody="Name: $name\nEmail: $email\n\n$message";

  mail($recipient, $subject, $mailBody, "From: $name <$email>");

//   <?php

// if($_POST["submit"]) {
//     $recipient="your@email.address";
//     $subject="Form to email message";
//     $sender=$_POST["sender"];
//     $senderEmail=$_POST["senderEmail"];
//     $message=$_POST["message"];

//     $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

//     mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

//     $thankYou="<p>Thank you! Your message has been sent.</p>";
// }

// ?>



?>