//application initiazation
let appLanguage = document.getElementById("app-language").checked == true ? "eng" : "swe";
let development_testing = true
let currentdate = new Date();
console.log("Welcome to Flossa V2")
console.log("Time and Date: " + currentdate)
console.log("development_testing: " + development_testing)
console.log("appLanguage: " + appLanguage)


/* Idea would be to write better language module so we can change language on the go */