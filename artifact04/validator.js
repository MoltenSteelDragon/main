/*
    -------------------------------------------------------------------------
    JavaScript Form Validator (gen_validatorv4.js)
    Version 4.0
    Copyright (C) 2003-2011 JavaScript-Coder.com. All rights reserved.
    You can freely use this script in your Web pages.
    You may adapt this script for your own needs, provided these opening credit
    lines are kept intact.
        
    The Form validation script is distributed free from JavaScript-Coder.com
    For updates, please visit:
    http://www.javascript-coder.com/html-form/javascript-form-validation.phtml
​
    Questions & comments please send to form.val (at) javascript-coder.com
    -------------------------------------------------------------------------  
*/
​
function Validator(frmname)
{
    this.validate_on_killfocus = false;
    this.formobj = document.forms[frmname];
    if (!this.formobj)
    {
        alert("Error: couldnot get Form object " + frmname);
        return;
    }
    if (this.formobj.onsubmit)
    {
        this.formobj.old_onsubmit = this.formobj.onsubmit;
        this.formobj.onsubmit = null;
    }
    else
    {
        this.formobj.old_onsubmit = null;
    }
    this.formobj._sfm_form_name = frmname;
​
    this.formobj.onsubmit = form_submit_handler;
    this.addValidation = add_validation;
​
    this.formobj.addnlvalidations = new Array();
    this.addAddnlValidationFunction = add_addnl_vfunction;
    this.formobj.runAddnlValidations = run_addnl_validations;
    this.setAddnlValidationFunction = set_addnl_vfunction;//for backward compatibility
​
​
    this.clearAllValidations = clear_all_validations;
    this.focus_disable_validations = false;
​
    document.error_disp_handler = new sfm_ErrorDisplayHandler();
​
    this.EnableOnPageErrorDisplay = validator_enable_OPED;
    this.EnableOnPageErrorDisplaySingleBox = validator_enable_OPED_SB;
​
    this.show_errors_together = false;
    this.EnableMsgsTogether = sfm_enable_show_msgs_together;
    document.set_focus_onerror = true;
    this.EnableFocusOnError = sfm_validator_enable_focus;
​
    this.formobj.error_display_loc = 'right';
    this.SetMessageDisplayPos = sfm_validator_message_disp_pos;
​
    this.formobj.DisableValidations = sfm_disable_validations;
    this.formobj.validatorobj = this;
}
​
​
function sfm_validator_enable_focus(enable)
{
    document.set_focus_onerror = enable;
}
​
function add_addnl_vfunction()
{
    var proc =
    {
    };
    proc.func = arguments[0];
    proc.arguments = [];
​
    for (var i = 1; i < arguments.length; i++)
    {
        proc.arguments.push(arguments[i]);
    }
    this.formobj.addnlvalidations.push(proc);
}
​
function set_addnl_vfunction(functionname)
{
    if(functionname.constructor == String)
    {
        alert("Pass the function name like this: validator.setAddnlValidationFunction(DoCustomValidation)\n "+
            "rather than passing the function name as string");
        return;
    }
    this.addAddnlValidationFunction(functionname);
}
​
function run_addnl_validations()
{
    var ret = true;
    for (var f = 0; f < this.addnlvalidations.length; f++)
    {
        var proc = this.addnlvalidations[f];
        var args = proc.arguments || [];
        if (!proc.func.apply(null, args))
        {
            ret = false;
        }
    }
    return ret;
}
​
function sfm_set_focus(objInput)
{
    if (document.set_focus_onerror)
    {
        if (!objInput.disabled && objInput.type != 'hidden')
        {
            objInput.focus();
        }
    }
}
​
function sfm_disable_validations()
{
    if (this.old_onsubmit)
    {
        this.onsubmit = this.old_onsubmit;
    }
    else
    {
        this.onsubmit = null;
    }
}
​
function sfm_enable_show_msgs_together()
{
    this.show_errors_together = true;
    this.formobj.show_errors_together = true;
}
​
function sfm_validator_message_disp_pos(pos)
{
    this.formobj.error_display_loc = pos;
}
​
function clear_all_validations()
{
    for (var itr = 0; itr < this.formobj.elements.length; itr++)
    {
        this.formobj.elements[itr].validationset = null;
    }
}
​
function form_submit_handler()
{
    var bRet = true;
    document.error_disp_handler.clear_msgs();
    for (var itr = 0; itr < this.elements.length; itr++)
    {
        if (this.elements[itr].validationset && !this.elements[itr].validationset.validate())
        {
            bRet = false;
        }
        if (!bRet && !this.show_errors_together)
        {
            break;
        }
    }
​
    if (this.show_errors_together || bRet && !this.show_errors_together)
    {
        if (!this.runAddnlValidations())
        {
            bRet = false;
        }
    }
    if (!bRet)
    {
        document.error_disp_handler.FinalShowMsg();
        return false;
    }
    return true;
}
​
function add_validation(itemname, descriptor, errstr)
{
    var condition = null;
    if (arguments.length > 3)
    {
        condition = arguments[3];
    }
    if (!this.formobj)
    {
        alert("Error: The form object is not set properly");
        return;
    } //if
    var itemobj = this.formobj[itemname];
​
    if (itemobj.length && isNaN(itemobj.selectedIndex))
    //for radio button; don't do for 'select' item
    {
        itemobj = itemobj[0];
    }
    if (!itemobj)
    {
        alert("Error: Couldnot get the input object named: " + itemname);
        return;
    }
    if (true == this.validate_on_killfocus)
    {
        itemobj.onblur = handle_item_on_killfocus;
    }
    if (!itemobj.validationset)
    {
        itemobj.validationset = new ValidationSet(itemobj, this.show_errors_together);
    }
    itemobj.validationset.add(descriptor, errstr, condition);
    itemobj.validatorobj = this;
}
​
function handle_item_on_killfocus()
{
    if (this.validatorobj.focus_disable_validations == true)
    {
        /*  
        To avoid repeated looping message boxes
        */
        this.validatorobj.focus_disable_validations = false;
        return false;
    }
​
    if (null != this.validationset)
    {
        document.error_disp_handler.clear_msgs();
        if (false == this.validationset.validate())
        {
            document.error_disp_handler.FinalShowMsg();
            return false;
        }
    }
}
​
function validator_enable_OPED()
{
    document.error_disp_handler.EnableOnPageDisplay(false);
}
​
function validator_enable_OPED_SB()
{
    document.error_disp_handler.EnableOnPageDisplay(true);
}
​
function sfm_ErrorDisplayHandler()
{
    this.msgdisplay = new AlertMsgDisplayer();
    this.EnableOnPageDisplay = edh_EnableOnPageDisplay;
    this.ShowMsg = edh_ShowMsg;
    this.FinalShowMsg = edh_FinalShowMsg;
    this.all_msgs = new Array();
    this.clear_msgs = edh_clear_msgs;
}
​
function edh_clear_msgs()
{
    this.msgdisplay.clearmsg(this.all_msgs);
    this.all_msgs = new Array();
}
​
function edh_FinalShowMsg()
{
    if (this.all_msgs.length == 0)
    {
        return;
    }
    this.msgdisplay.showmsg(this.all_msgs);
}
​
function edh_EnableOnPageDisplay(single_box)
{
    if (true == single_box)
    {
        this.msgdisplay = new SingleBoxErrorDisplay();
    }
    else
    {
        this.msgdisplay = new DivMsgDisplayer();
    }
}
​
function edh_ShowMsg(msg, input_element)
{
    var objmsg = new Array();
    objmsg["input_element"] = input_element;
    objmsg["msg"] = msg;
    this.all_msgs.push(objmsg);
}
​
function AlertMsgDisplayer()
{
    this.showmsg = alert_showmsg;
    this.clearmsg = alert_clearmsg;
}
​
function alert_clearmsg(msgs)
{
​
}
​
function alert_showmsg(msgs)
{
    var whole_msg = "";
    var first_elmnt = null;
    for (var m = 0; m < msgs.length; m++)
    {
        if (null == first_elmnt)
        {
            first_elmnt = msgs[m]["input_element"];
        }
        whole_msg += msgs[m]["msg"] + "\n";
    }
​
    alert(whole_msg);
​
    if (null != first_elmnt)
    {
        sfm_set_focus(first_elmnt);
    }
}
​
function sfm_show_error_msg(msg, input_elmt)
{
    document.error_disp_handler.ShowMsg(msg, input_elmt);
}
​
function SingleBoxErrorDisplay()
{
    this.showmsg = sb_div_showmsg;
    this.clearmsg = sb_div_clearmsg;
}
​
function sb_div_clearmsg(msgs)
{
    var divname = form_error_div_name(msgs);
    sfm_show_div_msg(divname, "");
}
​
function sb_div_showmsg(msgs)
{
    var whole_msg = "<ul>\n";
    for (var m = 0; m < msgs.length; m++)
    {
        whole_msg += "<li>" + msgs[m]["msg"] + "</li>\n";
    }
    whole_msg += "</ul>";
    var divname = form_error_div_name(msgs);
    var anc_name = divname + "_loc";
    whole_msg = "<a name='" + anc_name + "' >" + whole_msg;
​
    sfm_show_div_msg(divname, whole_msg);
​
    window.location.hash = anc_name;
}
​
function form_error_div_name(msgs)
{
    var input_element = null;
​
    for (var m in msgs)
    {
        input_element = msgs[m]["input_element"];
        if (input_element)
        {
            break;
        }
    }
​
    var divname = "";
    if (input_element)
    {
        divname = input_element.form._sfm_form_name + "_errorloc";
    }
​
    return divname;
}
​
function sfm_show_div_msg(divname,msgstring)
{
   if(divname.length<=0) return false;
​
   if(document.layers)
   {
      divlayer = document.layers[divname];
        if(!divlayer){return;}
      divlayer.document.open();
      divlayer.document.write(msgstring);
      divlayer.document.close();
   }
   else
   if(document.all)
   {
      divlayer = document.all[divname];
        if(!divlayer){return;}
      divlayer.innerHTML=msgstring;
   }
   else
   if(document.getElementById)
   {
      divlayer = document.getElementById(divname);
        if(!divlayer){return;}
      divlayer.innerHTML =msgstring;
   }
   divlayer.style.visibility="visible";   
   return false;
}
​
function DivMsgDisplayer()
{
    this.showmsg = div_showmsg;
    this.clearmsg = div_clearmsg;
}
​
function div_clearmsg(msgs)
{
    for (var m in msgs)
    {
        var divname = element_div_name(msgs[m]["input_element"]);
        show_div_msg(divname, "");
    }
}
​
function element_div_name(input_element)
{
    var divname = input_element.form._sfm_form_name + "_" + input_element.name + "_errorloc";
​
    divname = divname.replace(/[\[\]]/gi, "");
​
    return divname;
}
​
function div_showmsg(msgs)
{
    var whole_msg;
    var first_elmnt = null;
    for (var m in msgs)
    {
        if (null == first_elmnt)
        {
            first_elmnt = msgs[m]["input_element"];
        }
        var divname = element_div_name(msgs[m]["input_element"]);
        show_div_msg(divname, msgs[m]["msg"]);
    }
    if (null != first_elmnt)
    {
        sfm_set_focus(first_elmnt);
    }
}
​
function show_div_msg(divname, msgstring)
{
    if (divname.length <= 0) return false;
​
    if (document.layers)
    {
        divlayer = document.layers[divname];
        if (!divlayer)
        {
            return;
        }
        divlayer.document.open();
        divlayer.document.write(msgstring);
        divlayer.document.close();
    }
    else if (document.all)
    {
        divlayer = document.all[divname];
        if (!divlayer)
        {
            return;
        }
        divlayer.innerHTML = msgstring;
    }
    else if (document.getElementById)
    {
        divlayer = document.getElementById(divname);
        if (!divlayer)
        {
            return;
        }
        divlayer.innerHTML = msgstring;
    }
    divlayer.style.visibility = "visible";
}
​
function ValidationDesc(inputitem, desc, error, condition)
{
    this.desc = desc;
    this.error = error;
    this.itemobj = inputitem;
    this.condition = condition;
    this.validate = vdesc_validate;
}
​
function vdesc_validate()
{
    if (this.condition != null)
    {
        if (!eval(this.condition))
        {
            return true;
        }
    }
    if (!validateInput(this.desc, this.itemobj, this.error))
    {
        this.itemobj.validatorobj.focus_disable_validations = true;
        sfm_set_focus(this.itemobj);
        return false;
    }
​
    return true;
}
