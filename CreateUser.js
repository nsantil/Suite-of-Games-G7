function validatePassword(form){
	let password = form.pwd.value;
	let confirmPassword = form.pwd_confirm.value;

	if(password.value == ''){
  	    password.setCustomValidity("Please enter password");
    }else if(confirmPassword.value == ''){
        confirmPassword.setCustomValidity("Please confirm your password");
    }else if(password != confirmPassword){
        alert("Passwords do not match! Please try again.");
        return false;
    }else{
        alert("Password Match!");
	addNewUserToDB();
        return true;
  }
}
//This came from database ^^ - Taitt
const shift = 14;

//This came from develop vv - Taitt 
class User{
	constructor(username, password, confirmPassword, encryptedPassword){
    this.username = username;
    this.confirmPassword = confirmPassword;
    this.password = password;
    this.encryptedPassword = encryptedPassword;
  }
  
  encryptPassword(shiftKey){
  	let encryptedPassword = [];
    let code; 
    
    for(let i = 0; i < this.password.length; i++){
    	code = this.password.charCodeAt(i) + shiftKey;
      while(code > 122){
      	code = (code - 122) + 96;
      }
      encryptedPassword.push(String.fromCharCode(code));
    }
    
    this.encryptedPassword = encryptedPassword.join('');
    
    return this.encryptedPassword;
    
  }

}


//main
var newUser;
var UserInformation = [];

document.getElementById('submitBtn').addEventListener('click', validateUser);


function validateUser(){

	let username = document.getElementById('usr').value;
	let password = document.getElementById('pwd').value;
	let confirmPassword = document.getElementById('pwd_confirm').value;

  if(isStringEmpty(username)){
    displayErrorMessage("Please enter a username.");  
  }else if(username.includes(",", 0)){
  	displayErrorMessage("Username must not include a comma.");
  }else if(isStringEmpty(password)){
    displayErrorMessage("Please enter a password.");          
  }else if(isStringEmpty(confirmPassword)){
    displayErrorMessage("Please enter confirm password.");         
  }else if(doesNotMatch(password, confirmPassword)){
    displayErrorMessage("Password and Confirm Password must match");
  }else{
  	createNewUser(username, password, confirmPassword, " ");
  	newUser.encryptPassword(shift);
    UserInformation.push([newUser]);
    
  } 
}

function isStringEmpty(text){

  if(text == ''){
  	return true;
  }
  
  return false;
}

function doesNotMatch(password, confirmPassword){

	if(password != confirmPassword){
  	return true;
  }
  	return false;          
}

function displayErrorMessage(message){

  document.getElementById('errMsg').innerHTML = " ";
 
  document.getElementById('errMsg').innerHTML = message;
}

function createNewUser(username, password, confirmPassword){

	newUser = new User(username, password, confirmPassword);
}
