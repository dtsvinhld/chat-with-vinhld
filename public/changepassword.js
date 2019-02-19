if (typeof(Storage) !== 'undefined') {

  if (localStorage.username == undefined) {
    window.location.replace("/login")
  } else {
    var socket = io(hostname)

    socket.on("did-changepassword", function(data) {
      if (data.status) {
        window.location.replace("/")
      } else {
        alert("Password incorrect")
      }
    })

    $(document).ready(function(){

      $("#txtUsername").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btnLogin").click();
        }
      })

      $("#txtPassword").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btnLogin").click();
        }
      })

      $("#btnSaveChange").click(function(){
        if ($("#txtOldPassword").val() == "") {
          alert("Old Password is empty!")
        } else if ($("#txtNewPassword").val() == "") {
          alert("New Password is empty!")
        } else if ($("#txtConfirmNewPassword").val() == "") {
          alert("Confirm New Password is empty!")
        } else if ($("#txtConfirmNewPassword").val() != $("#txtNewPassword").val()) {
          alert("Confirm password is not correct!")
        } else {
          socket.emit("changepassword",
          {
            username: localStorage.username,
            password: $("#txtOldPassword").val(),
            newpassword: $("#txtNewPassword").val()
          })
        }
      })
    })
  }
} else {
    alert('Your Browser not support Storage')
}
