function checkForm(form){
  var errors=[];
  
  //FIRST NAME
  //check for blank input
  if(form.FirstName.value === "")
    errors.push("First Name is empty")
  
  var re =  /^[A-Za-z]+$/;
  
  //checks for invalid characters
  if(!re.test(form.FirstName.value) && form.FirstName.value !== "" )
     errors.push("First Name contains invalid character");
  
  //checks to see if intput is too long
  if(form.FirstName.value.length > 20)
     errors.push("First Name is too long");
  
  //LAST NAME
  //check for blank input
  if(form.LastName.value === "")
    errors.push("Last Name is empty");
  
  //checks for invalid characters
  if(!re.test(form.LastName.value) && form.LastName.value !== "" )
     errors.push("Last Name contains invalid character");
  
  //checks to see if intput is too long
  if(form.LastName.value.length > 50)
     errors.push("Last Name is too long");
  
  //EMAIL
  //check for blank input
  if(form.EMail.value === "")
    errors.push("EMail is empty")
  
  //PHONE
  //check for blank input
  if(form.Phone.value === "")
    errors.push("Phone is empty")
    
    re = /^[0-9]+$/;
  
  //checks for invalid characters
  if(!re.test(form.Phone.value) && form.Phone.value !== "" )
     errors.push("Phone contains invalid character");
  
  //checks to see if intput is too long
  if(form.Phone.value.length > 15)
     errors.push("Phone is too long");
  
  //USERNAME
  //check for blank input
  if(form.Username.value === "")
    errors.push("Username is empty")
  
  //checks to see if intput is too long
  if(form.Username.value.length >12)
     errors.push("Username is too long");
  
  //PASSWORD
  //check for blank input
  if(form.Password.value === "")
    errors.push("Password is empty")
    
  //checks to see if intput is too long
  if(form.Password.value.length > 7)
     errors.push("Password is too long");
  
  //ADDRESS
  //check for blank input
  if(form.Address.value === "")
    errors.push("Address is empty")
    
  //CITY
  //check for blank input
  if(form.City.value === "")
    errors.push("City is empty")
  
  //ZIP CODE
  //check if in USA and zip code is empty
  if(form.Country.value === "000" && form.ZipCode.value === "")
    errors.push("ZipCode is required for USA")
  
  if(!re.test(form.ZipCode.value) && form.Phone.value !== "" )
    errors.push("ZipCode contains invalid character");
  
  
  
  
  
  
  
  
  
  
  
  
  
  if(errors.length !== 0){
    var msg = "ERRORS:\n\n"
    for (var i = 0; i < errors.length; i++)
      msg += errors[i] + "\n";
    alert(msg);
    return false;
}
  return true;
}
