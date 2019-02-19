if (typeof(Storage) !== 'undefined') {
  localStorage.clear()
  window.location.replace("/login")
} else {
  alert('Your Browser not support Storage')
}
