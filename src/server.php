<?php
$_POST = json_decode(file_get_contents("php://input"), true);// php нативно не умеет работать с форматом данных JSON, поэтому нужно прописать такую функцию
echo var_dump($_POST);
