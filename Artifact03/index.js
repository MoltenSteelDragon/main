// var rHeight =5;
// var colorEven = "orange";
// var colorOdd = "black";
// var symbol ="*";

function createRhombus(pHeight, pColorEven, pColorOdd, pSymbol) {

  up(pHeight, pColorEven, pColorOdd, pSymbol);
  down(pHeight, pColorEven, pColorOdd, pSymbol);

}

function up(pHeight, pColorEven, pColorOdd, pSymbol){
  //adjus spacing to make sure the rhombus looks right
  spacing = 2
  if(pSymbol ==="@"){
    spacing = 4
  }
  
  var rLine ="";
  for (i=0;i<pHeight;i++){
    rLine +="<p>";
    for(j=0; j <= spacing*(pHeight-i) ; j++){
      rLine += "&nbsp";
    }
    //creates the left side of the Rhombus
    for(j=0;j<=i;j++){

      //Is the position even or odd so we change the color
      if (j%2)
        //even
        rLine +="<span style='color:" + pColorEven + ";'>" + pSymbol +"</span>";
      else
        //odd
        rLine +="<span style='color:" + pColorOdd + ";'>" + pSymbol +"</span>";

    }
    
    rLine += " ";
    
    //creates the right side of the Rhombus
    for(j=0;j<=i;j++){

      //Is the position even or odd so we change the color
      if (j%2)
        //even
        rLine +="<span style='color:" + pColorEven + ";'>" + pSymbol +"</span>";
      else
        //odd
        rLine +="<span style='color:" + pColorOdd + ";'>" + pSymbol +"</span>";

    }
    rLine +="</p>";
    // console.log(rLine);

  }

  document.getElementById("upRight").innerHTML = rLine;
}

function down(pHeight, pColorEven, pColorOdd, pSymbol){
  //adjus spacing to make sure the rhombus looks right
  spacing = 2
  if(pSymbol ==="@"){
    spacing = 4
  }
  
  var rLine ="";
  for (i=pHeight;i > 0;i--){
    rLine +="<p>";
    for(j=0; j <= spacing*(pHeight-i) + spacing; j++){
      rLine += "&nbsp";
    }
    //creates the left side of the Rhombus
    for(j=0;j<i;j++){

      //Is the position even or odd so we change the color
      if (j%2)
        //even
        rLine +="<span style='color:" + pColorEven + ";'>" + pSymbol +"</span>";
      else
        //odd
        rLine +="<span style='color:" + pColorOdd + ";'>" + pSymbol +"</span>";

    }
    
    rLine += " ";
    
    //creates the right side of the Rhombus
    for(j=0;j<i;j++){

      //Is the position even or odd so we change the color
      if (j%2)
        //even
        rLine +="<span style='color:" + pColorEven + ";'>" + pSymbol +"</span>";
      else
        //odd
        rLine +="<span style='color:" + pColorOdd + ";'>" + pSymbol +"</span>";

    }
    rLine +="</p>";
    // console.log(rLine);

  }

  document.getElementById("downRight").innerHTML = rLine;
}

