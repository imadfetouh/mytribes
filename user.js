module.exports = function (id, lat, lon, userdata) {
    this.id = id;
    this.lat = lat;
    this.lon = lon;
    this.userdata = userdata;

    this.changeLocation = function (lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
}