var express = require("express")

var app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app)
var io = require("socket.io")(server)
server.listen(3000)

var mang = []
io.on("connection", function(socket){
  console.log(socket.id + " is connected!")

  socket.on("hocvien-gui-thongtin", function(data){

    mang.push(new HocVien(data.id, data.hoten, data.email, data.dienthoai))

    io.sockets.emit("server-gui-ds", mang)

  })

})


app.get("/", function(req, res) {
  res.render("home")
})


function HocVien(id, hoten, email, sodt) {
  this.id = id
  this.hoten = hoten
  this.email = email
  this.sodt = sodt
}
