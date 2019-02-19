if (typeof(Storage) !== 'undefined') {

  if (localStorage.username != undefined) {

    var socket = io("https://chat-with-vinhld.herokuapp.com")

    socket.on("update-messages", function(data){
      var content = ""
      data.map(function(message){
        content = `
          <div class="message-content">
            <span class="message-time">` + message.time + `</span>  <span class="message-name">` + message.name + `:</span> ` + message.content + `
          </div>
          ` + content
      })
      $("#list-messages").html(content)
    })

    $(document).ready(function(){

      $("#txtMessage").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btnSend").click();
        }
      })

      $("#btnSend").click(function(){
        if ($("#txtMessage").val() == "") {
          alert("Message is empty!")
        } else {
          var date = new Date()
          var tNow = moment().format('YYYY-MM-DD hh:mm:ss')
          socket.emit("send-message",
          {
            name: localStorage.displayname,
            content: $("#txtMessage").val(),
            time: tNow
          })
          $("#txtMessage").val("")
        }
      })

      $("#btnLogout").click(function() {
        window.location.replace("/logout")
      })

      $("#btnChangePassword").click(function() {
        window.location.replace("/changepassword")
      })

    })
  } else {
    window.location.replace("/login")
  }
} else {
    alert('Your Browser not support Storage')
}
