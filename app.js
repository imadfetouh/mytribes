var PORT = process.env.PORT || 3000;
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var User = require('./user.js');
var UserData = require('./userdata.js')
var UserStorage = require('./userstorage.js');

var userStorage = new UserStorage();

app.get("/", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Foodff"]);
});

io.on('connection', function(socket){
    console.log('user connected');
    socket.emit("all users", JSON.stringify(userStorage.getUsers()));

    socket.on('newLocation', function(msg){
        var json = JSON.parse(msg);
        console.log(json)

        var user = userStorage.getUser(json.id);
        if(user != null){
            user.changeLocation(json.lat, json.lon);
        }
        else{
            var newUser = new User(json.id, json.lat, json.lon, new UserData("imad", "Morocco", true));
            userStorage.addUser(newUser);
        }
        console.log("user: " + JSON.stringify(userStorage.getUsers()));
        socket.broadcast.emit('location changed', json);
    });

    socket.on('changeVisibility', function(msg){
        var json = JSON.parse(msg);
        console.log(json);

        var user = userStorage.getUser(json.id);
        user.userdata.visibility = json.visibility;

        socket.broadcast.emit('visibilityChanged', json);
    })
});

http.listen(PORT, function(){
    console.log('listening on port %d', PORT);
});