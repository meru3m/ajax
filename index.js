document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submitBtn").addEventListener("click", function () {
    let thedata = {
      firstname: document.getElementById("fname").value,
      middlename: document.getElementById("midName").value,
      lastname: document.getElementById("lname").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }

    if (
      thedata.firstname === "" ||
      thedata.lastname === "" ||
      thedata.username === "" ||
      thedata.password === ""
    ) {
      alert("Error: Please fill out all fields")
      return
    }

    let FDa = new FormData()
    FDa.append("whole", JSON.stringify(thedata))

    let xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          let responseData = JSON.parse(xmlhttp.responseText)
          renderTable(responseData)
        } else {
          alert("Error: Request failed. Please try again.")
        }
      }
    }
    xmlhttp.open("POST", "index.php?PH=" + Date.now(), true)
    xmlhttp.send(FDa)
  })
})

function renderTable(data) {
  let tableContainer = document.getElementById("tableContainer")

  // If there's no existing table, create a new one
  if (!tableContainer.querySelector("table")) {
    tableContainer.innerHTML = '<table class="table"></table>'
  }

  // Get reference to the table
  let table = tableContainer.querySelector("table")

  // If it's the first entry, create the headers row
  if (table.getElementsByTagName("thead").length === 0) {
    let headerRow = table.createTHead().insertRow(0)
    for (let field of [
      "First Name",
      "Middle Name",
      "Last Name",
      "Username",
      "Password",
    ]) {
      let headerCell = headerRow.insertCell()
      headerCell.textContent = field
    }
  }

  // Create a new row for the data
  let newRow = table.insertRow(-1)
  for (let key of [
    "firstname",
    "middlename",
    "lastname",
    "username",
    "password",
  ]) {
    let cell = newRow.insertCell()
    // Obfuscate password field
    let value = key === "password" ? "*".repeat(data[key].length) : data[key]
    cell.textContent = value
  }

  // Clear input fields
  document.getElementById("fname").value = ""
  document.getElementById("midName").value = ""
  document.getElementById("lname").value = ""
  document.getElementById("username").value = ""
  document.getElementById("password").value = ""
}
