<?php
// Файлы phpmailer
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

# проверка, что ошибки нет
if (!error_get_last()) {

    // Переменные, которые отправляет пользователь
    $name = $_POST['name'] ;
    $phone = $_POST['phone'];
    $mail = $_POST['mail'];
    $channel = $_POST['channel'];
    
    
    // Формирование самого письма
    $title = "SPACE | Заявка с сайта";
    $body = "
    <h3>SPACE | Заявка с сайта</h3>
    <table>
            <tr>
                <td style='padding: 5px; border: 1px solid #ccc;'><b>Имя</b></td>
                <td style='padding: 5px; border: 1px solid #ccc;'>$name</td>
            </tr>
            <tr>
                <td style='padding: 5px; border: 1px solid #ccc;'><b>Телефон</b></td>
                <td style='padding: 5px; border: 1px solid #ccc;'>$phone</td>
            </tr>
            <tr>
                <td style='padding: 5px; border: 1px solid #ccc;'><b>Почта</b></td>
                <td style='padding: 5px; border: 1px solid #ccc;'>$mail</td>
            </tr>
            <tr>
                <td style='padding: 5px; border: 1px solid #ccc;'><b>Тип связи</b></td>
                <td style='padding: 5px; border: 1px solid #ccc;'>$channel</td>
            </tr>
        </table>
    ";
    
    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};
    
    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'benefitty.info'; // Логин на почте
    $mail->Password   = 'auosugbqwlwujoor'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('benefitty.info@yandex.ru', 'SPACE'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('fayzullinoff@gmail.com'); 
    
    // Прикрипление файлов к письму
    if (!empty($file['name'][0])) {
        for ($i = 0; $i < count($file['tmp_name']); $i++) {
            if ($file['error'][$i] === 0) 
                $mail->addAttachment($file['tmp_name'][$i], $file['name'][$i]);
        }
    }
    
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    
    
    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }
    
} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Отправка результата
header('Content-Type: application/json');
echo json_encode($data);

?>