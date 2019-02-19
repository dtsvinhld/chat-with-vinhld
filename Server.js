var express = require("express")

var app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app)
var io = require("socket.io")(server)
server.listen(process.env.PORT || 3000)

var users
var messages = []
var fs = require("fs")
fs.readFile('Users', 'utf8', function(err, data) {
  users = JSON.parse(data)
});
fs.readFile('Messages', 'utf8', function(err, data) {
  if (err == null) {
    messages = JSON.parse(data)
  }
});

io.on("connection", function(socket){

  socket.emit("update-messages", messages)

  socket.on("login", function(data) {
    console.log(JSON.stringify(data));
    var login = false
    var userLogin
    users.map(function(user){
      if (user.username == data.username && user.password == data.password) {
        login = true
        userLogin = user
      }
    })
    socket.emit("did-login", {
      status: login,
      user: userLogin
    })
  })

  socket.on("changepassword", function(data) {
    var change = false
    users.forEach(function(item, index, array) {
      if (item.username == data.username) {
        if (item.password == data.password) {
          item.password = data.newpassword
          users[index] = item
          change = true
          fs.writeFile("Users", JSON.stringify(users), function(error) {})
        }
      }
    })
    socket.emit("did-changepassword", {
      status: change
    })
  })

  socket.on("send-message", function(data) {
    messages.push(new Message(data.name, data.content, data.time))
    io.sockets.emit("update-messages", messages)
    fs.writeFile("Messages", JSON.stringify(messages), function(error) {})
  })

})


app.get("/", function(req, res) {
  res.render("home")
})

app.get("/login", function(req, res) {
  res.render("login")
})

app.get("/logout", function(req, res) {
  res.render("logout")
})

app.get("/changepassword", function(req, res) {
  res.render("changepassword")
})

app.get("*", function(req, res) {
  res.render("notfound")
})

function Message(name, content, time) {
  this.name = name
  this.content = content
  this.time = time
}

function User(username, password) {
  this.username = username
  this.password = password
}
