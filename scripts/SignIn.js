    // Get elements from DOM
    const email = document.getElementById("user-email");
    const password = document.getElementById("user-password")
    const signForm = document.getElementById("form")

    // If cookie aldready exists (if user logged in and cookie didn't expire), it replaces sign in screen with home screen
    if(getCookie('isLoggedIn') === 'true')
    {
        window.location.replace('homeScreen.html');
    }
    
    // Event listener on sign in button
signForm.addEventListener("submit", (event) => {

    // Get value from email and password fields in sign in screen
    const emailValue = email.value;
    const passwordValue = password.value;

    // Variables used to empty email and password fields
    const emptyEmailValue = document.getElementById("user-email");
    const emptyPasswordValue = document.getElementById("user-password");

    const cookieName = 'isLoggedIn';
    

    event.preventDefault()

   // If the user entered email and password in correct form
   // Creates cookie with name 'isLoggedIn'
   // Replaces sign in screen with home screen
    if(validateEmail(emailValue) && validatePassword(passwordValue))
    {
            createCookie(cookieName);
            window.location.replace('homeScreen.html');
       
    }
    // Empty fields if user enters either email or password (or both) which dont match the form
    else{
        emptyEmailValue.value = "";
        emptyPasswordValue.value = "";
        alert("Please try again!")
    }

})


// Function validateEmail is using regular expression. Regular expression starts with '^' character and ends with '$' character. 
// Between those two characters stays the pattern which, in this case email, must follow and match.
// Character class [a-zA-Z0-9._-] is used couple of times in this regular expression. Character class is used for matching any one of the enclosed characters. 
// Range of characters can be specified by using a hypen and both start and end character are included in the range. For instance, [a-z] matches 'a' or 's' or 'z'.
// If we put hypen at the end of the range (as last character), it is treated as literal hypen which is used in the mentioned character class.
// So character classs [a-zA-Z0-9._-] would match any lower case and upper case letter, any number, dot, underscore and hypen (example: 'd', 'P', '5' etc).
// If we want to match words instead of characters, we use '+' after the character class. 
// Since email must contain '@' character, it also had to be put inside regex. 
// '\.' is for matching dot, which separetes the domain name and top-level domain.
// At the end [a-zA-Z]{2,} is used to match the top-level domain which must be at least 2 character long.
// Method test() which is used in the function is a method of RegExp used to match between regex and a specified string.
// Example of email that regex matches: kneves21@fesb.hr
function validateEmail(emailValue){
    const RegexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
     return RegexEmail.test(emailValue);
}


// This function is similar to the function above. It also uses regular expression, but this time for checking password.
// This regex is a bit longer since password needs to contain at least one lower case letter, one upper case letter, one digit, one special character and needs to be longer then 8 characters.
// It uses positive lookahead assertion (?=pattern) which is called that because it looks ahead on what is on right. It checks if given string passes regex used after ?=.
// In this case our password needs to hold already mentioned characters, but '.*' allows our password to contain extra information.
function validatePassword(passwordValue)
{
    const RegexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^/\'+{}:;=-])[A-Za-z\d@.#$!%*?&^/\'+{}:;=-]{8,}$/;
    

    if(RegexPassword.test(passwordValue))
    {
        return RegexPassword.test(passwordValue);
    }

    else {
        return false;
    }
}
// For creating functions createCookie and getCookie I used web page "https://www.w3schools.com/js/js_cookies.asp" for help. :))
// Function createCookie creates cookie with cookieName("isLoggedIn"), value("true"), expire(it expires one day from login time)
function createCookie(cookieName)
{

    const d = new Date();
    d.setTime(d.getTime() + (25*60*60*1000))
    const expire = "expires=" +d.toUTCString();

    document.cookie = cookieName + "=" + 'true' + "; " + expire + "; path=/"; 
}

function getCookie(cookieName){
    // Get "isLoggedIn=" substring from cookie
    let cookiename= cookieName + "=";
    // Get array of substrings from cookie, which are key-value pairs separated with ";"
    let cookieArray= document.cookie.split(';');
    // Loop through the array to find cookie value
    for (let i=0; i<cookieArray.length; i++)
    {
        let arrayEl=cookieArray[i];
        while (arrayEl.charAt(0) == " ") {
            arrayEl = arrayEl.substring(1);
          }
          // If cookie is found, return the value of cookie
          if (arrayEl.indexOf(cookiename) == 0) {
            
            return arrayEl.substring(cookiename.length, arrayEl.length);
          }
     } // If Cookie is not found, return ""
        return "";
}
    