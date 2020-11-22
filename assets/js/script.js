// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/* Generate password function */
function generatePassword() {

  /* global variables for generatePassword function */
  var pwdLength = "";
  var rndNumber = 0;
  var fullArray = [];
  var pwdString = "";
  var lwrCase = false;
  var uprCase = false;
  var numeric = false;
  var special = false;
  var inputLen;
  
  /* Define the arrays of characters to choose from */
  var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var spcl = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

  /* User needs to choose length of password */
  while (pwdLength < 8 || pwdLength > 128 || isNaN(pwdLength)) {
    inputLen = prompt("Choose length of password of at least 8 characters up to 128 characters.");
    /* Check if input is truly an Integer number */
    pwdLength = filterInt(inputLen);
  }

  /* User needs to select which type of characters are in the password */
  while (!lwrCase && !uprCase && !numeric && !special) {
/*    alert("Password needs to contain at least one of the 4 character types!!");*/
    lwrCase = confirm("Should password contain lowercase characters?");
    uprCase = confirm("Should password contain uppercase characters?");
    numeric = confirm("Should password contain numeric values?");
    special = confirm("Should password contain special characters?");
    if (!lwrCase && !uprCase && !numeric && !special) {
      alert("Password needs to contain at least one of the 4 character types!!");
    }
  }

/* call build array function once for each character type */
  fullArray = buildArray(lwrCase, lower, fullArray);
  fullArray = buildArray(uprCase, upper, fullArray);
  fullArray = buildArray(numeric, num, fullArray);
  fullArray = buildArray(special, spcl, fullArray);

  /* randomly pick character from built array and concatenate to end of password string */
  for (var j = 0; j < pwdLength; j++) {
    rndNumber = Math.floor(Math.random() * fullArray.length);
    pwdString = pwdString + fullArray[rndNumber];
  }
  /* return password string to caller */
  return password = pwdString;
}

/* join arrays together if user picked those type of characters */
function buildArray(userChoice, charArray, fullArray) {

  /* check if user picked character type to include */
  if (userChoice) {
    /* join arrays together */
    fullArray = fullArray.concat(charArray);
  }
  /* return newly built array to caller */
  return fullArray;
}

/* regular expression function that parses string to see if integer */
/* This function was found on developer.mozilla.org */
function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}