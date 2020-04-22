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