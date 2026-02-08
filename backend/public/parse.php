<?php

require_once __DIR__ . '/../parser/SavedVariablesParser.php';

header("Content-Type: application/json");

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(["error" => "No file uploaded"]);
    exit;
}

$parser = new SavedVariablesParser();
$result = $parser->parse($_FILES['file']['tmp_name']);

echo json_encode($result);
