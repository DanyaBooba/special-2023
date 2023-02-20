<?php
$data = [
    "name" => $_POST['namepost'],
    "content" => $_POST['contentpost'],
    "username" => $_POST['username'],
    "email" => $_POST['useremail'],
    "check" => $_POST['check']
];

if (strlen($data['name']) > 3 && strlen($data['name']) > 3 && strlen($data['name']) > 3 && strlen($data['name']) > 3 && strlen($data['check']) == 1) {
    $message = time() . " " . $data['username'] . " " . $data['email'] . "\n" . $data['name'] . "\n" . $data['content'];
    mail('danil.dybko@gmail.com', 'Special: ' . $data['email'], $message);
}

header("Location: /");
