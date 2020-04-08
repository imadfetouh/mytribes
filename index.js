var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var users = [];

io.on('connection', function(socket){
    console.log('user connected');
    socket.emit("all users", JSON.stringify(users));

    socket.on('newLocation', function(msg){
        var json = JSON.parse(msg);
        console.log(json)

        var user = users.find(o => o.id === json.id);
        if(user != null){
            user.lat = json.lat;
            user.lon = json.lon;
        }
        else{
            var newUser = { id: json.id, lat: json.lat, lon: json.lon, userData: { nationality: "Morocco" } }
            users.push(newUser)
        }
        socket.broadcast.emit('location changed', json);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});