//You should create the validator only after the definition of the HTML form
var frmvalidator = new Validator("myform");
frmvalidator.EnableOnPageErrorDisplaySingleBox();
frmvalidator.EnableMsgsTogether();

frmvalidator.addValidation("Name", "req", "Please enter your Name");
frmvalidator.addValidation("Name", "maxlen=20", "Max length for FirstName is 20");
frmvalidator.addValidation("Name", "alpha_s", "Name can contain alphabetic characters only")

frmvalidator.addValidation("Email", "req");

frmvalidator.addValidation("Comments", "req");
