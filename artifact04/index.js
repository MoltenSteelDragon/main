//You should create the validator only after the definition of the HTML form
var frmvalidator = new Validator("myform");
frmvalidator.EnableOnPageErrorDisplaySingleBox();
frmvalidator.EnableMsgsTogether();

frmvalidator.addValidation("FirstName", "req", "Please enter your First Name");
frmvalidator.addValidation("FirstName", "maxlen=20", "Max length for FirstName is 20");
frmvalidator.addValidation("FirstName", "alpha_s", "Name can contain alphabetic characters only");

frmvalidator.addValidation("LastName", "req", "Please enter your Last Name");
frmvalidator.addValidation("LastName", "maxlen=50", "For LastName, Max length is 50");
frmvalidator.addValidation("LastName", "alpha_s", "Name can contain alphabetic characters only");

frmvalidator.addValidation("Email", "req");

frmvalidator.addValidation("Phone", "req", "Please enter your Phone number");
frmvalidator.addValidation("Phone", "maxlen=15", "For Phone, Max length is 15");
frmvalidator.addValidation("Phone", "numeric", "Phone can contain numeric characters only");

frmvalidator.addValidation("Username", "req", "Please enter your Username");
frmvalidator.addValidation("Username", "maxlen=7", "password max length is 7 characters");

frmvalidator.addValidation("Address", "req", "Please enter your Address");

frmvalidator.addValidation("City", "req", "Please enter your City");

frmvalidator.addValidation("State", "req", "Please enter your State");

frmvalidator.addValidation("Zipcode", "req", "Please enter a zipcode", "VWZ_IsListItemSelected(document.forms['myform'].elements['Country'],'US')");
