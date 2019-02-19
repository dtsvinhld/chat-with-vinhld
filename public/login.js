if (typeof(Storage) !== 'undefined') {

  if (localStorage.username != undefined) {
    window.location.replace("/")
  } else {
    var socket = io(hostname)

    socket.on("did-login", function(data) {
      alert(JSON.stringify(data))
      if (data.status) {
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('displayname', data.user.displayname)
        window.location.replace("/")
      } else {
        alert("Username or password incorrect")
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

      $("#btnLogin").click(function(){
        if ($("#txtUsername").val() == "") {
          alert("Username is empty!")
        } else if ($("#txtPassword").val() == "") {
          alert("Password is empty!")
        } else {
          socket.emit("login",
          {
            username: $("#txtUsername").val(),
            password: $("#txtPassword").val()
          })
        }
      })
    })
  }
} else {
    alert('Your Browser not support Storage')
}
