var UserData = require('./userdata.js')
var User = require('./user.js');

var users = [];

var user = new User(1, 20, 21, new UserData("imad", "morocco"));

users.push(user);


//module.exports = users;

module.exports = function () {
    this.users = [];

    this.getUsers = function () {
        return this.users;
    }

    this.addUser = function (user) {
        this.users.push(user);
    }

    this.getUser = function (id) {
        return this.users.find(o => o.id === id);
    }
}