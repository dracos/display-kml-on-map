L.OSMTileLayer = L.TileLayer.extend({
    initialize: function(name) {
        var url = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        L.TileLayer.prototype.initialize.call(this, url, {
            "minZoom": 0,
            "maxZoom": 19,
            "attribution": 'Map &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
    }
});

var kml = (function(){
    var map;
    return {
        init: function() {
            map = new L.Map('map');
            map.attributionControl.setPrefix('<a href="https://twitter.com/share" class="twitter-share-button" data-via="dracos" data-count="none" data-dnt="true">Tweet</a> <a href="about/">About</a> &mdash; Made by <a href="http://dracos.co.uk/">Matthew Somerville</a>');
            var layer = new L.OSMTileLayer();
            map.addLayer(layer).setView( new L.LatLng(52.495578, -1.907340), 15 );
        },
        geocode: function(){
            var q = document.getElementById('q').value;
            history.pushState({}, '', '?url=' + encodeURIComponent(q));
            var layer = new L.KML('proxy.php?url=' + encodeURIComponent(q));
            layer.on('loaded', function(e){
                map.fitBounds(e.target.getBounds());
            });
            map.addLayer(layer);
            return false;
        }
    };

})();

domready(function(){
    var $ = function( id ) { return document.getElementById( id ); };
    $('filter').onsubmit = kml.geocode;
    var url = decodeURIComponent((new RegExp('[?|&]url=([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    if (url) {
        $('q').value = url;
        kml.geocode();
    }
});
