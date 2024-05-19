<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language');
    $mail->isHTML(true);

    $mail->setFrom('no-reply@openanalytics.com.ua','Data analyst');
    $mail->addAddress('kozlovvladyslavanalytics@gmail.com');
    $mail->Subject = 'Data analyst!';

    $body = '<h1>Повідомлення з сайту!</h1>';

    if(trim(!empty($_POST['name']))) {
        $body.='<p>Name: '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))) {
        $body.= '<p>E-mail: '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['text']))) {
        $body.= '<p>Message: '.$_POST['text'].'</p>';
    }
    if(trim(!empty($_FILES['file']['tmp_name']))) {
        $filePath = __DIR__ .'/files/'. $_FILES['file']['name'];
        if(copy($_FILES['file']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p>Додано вкладення!</p>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Error sending email on the server!';
    }
    else {
        $message = 'Letter sent successfully! Thank you!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>