<?php
if (function_exists('curl_init')) {
    echo "cURL is available on this server.<br>";
    $ch = curl_init('https://www.google.com');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    if ($result) {
        echo "cURL successfully fetched a page.";
    } else {
        echo "cURL failed to fetch: " . curl_error($ch);
    }
    curl_close($ch);
} else {
    echo "cURL is NOT available on this server.";
}
?>