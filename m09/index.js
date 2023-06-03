  var size = 8;
  var mybutton = document.querySelector("button");
  mybutton.addEventListener("click", function(event) {


    var element = document.getElementsByTagName("div");
    for (index = element.length - 1; index >= 0; index--) {
      element[index].parentNode.removeChild(element[index]);
    }



    // Let us stop the propagation of events

    event.stopPropagation();
  });
  addEventListener("click", function(event) {
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - size/2) + "px";
    dot.style.top = (event.pageY - size/2) + "px";
    document.body.appendChild(dot);
  });
