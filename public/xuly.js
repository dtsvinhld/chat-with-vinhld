var socket = io("http://localhost:3000")

socket.on("server-gui-ds", function(data){
  $("#ds").html("")
  data.map(function(hv){
    $("#ds").append(`
      <div class="hocvien">
        <div class="hang1">
          id: `+hv.id+` || <span>`+hv.hoten+`</span>
        </div>
        <div class="hang2">
          `+hv.email+` - `+hv.sodt+`
        </div>
      </div>
      `)
  })
})

$(document).ready(function(){
  $("#btnRegister").click(function(){
    socket.emit("hocvien-gui-thongtin",
    {
      id: socket.id,
      hoten: $("#txtHoTen").val(),
      email: $("#txtEmail").val(),
      dienthoai: $("#txtSoDT").val()
    })
  })
})
