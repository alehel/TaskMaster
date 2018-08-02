function loadList() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(this.responseText);
        let htmlList = "";
        if("error" in obj) {
            htmlList = '<div class="sidenav-error">Login to see your task lists.</div>';
        } else {
            for(list in obj) {
                htmlList += '<a href="#">' + obj[list]["listname"] + '</a>';
            }
        }

        document.getElementById("tasklist").innerHTML = htmlList;
      }
    };
    xhttp.open("GET", "API/endpoint/getCollection.php", true);
    console.log("done");
    xhttp.send();
}

loadList();