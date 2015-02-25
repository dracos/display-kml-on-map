<?

$url = isset($_GET['url']) ? $_GET['url'] : '';
if (preg_match('#kml#', $url)) {
    header('Content-Type: application/vnd.google-earth.kml+xml');
    readfile($url);
}
