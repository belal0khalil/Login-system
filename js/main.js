var usernameInput = document.querySelector(".userName");
var useremailInput = document.querySelector(".userEmail");
var userpasswordInput = document.querySelector(".password");
var signupbtn = document.querySelector(".sign-up");
var loginbtn = document.querySelector(".login")
 
// log in Varaibles 

 var emailinput = document.querySelector("#emailInput");
 var passwordinput = document.querySelector("#passwordInput")
 /// home varaibles 
 var postcontent = document.querySelector("#postcontent");
 
 /// Registration

 var userlist = JSON.parse(localStorage.getItem("data")) || [] ;
  var updateindex 
function signup() {
    if(usernameInput.value == ""  || useremailInput.value == "" || userpasswordInput.value == "") {
        document.querySelector(".alert").classList.replace("d-none" , "d-block")
    } 
     else {
        document.querySelector(".alert").classList.replace("d-block" , "d-none")
        var user = {
            username : usernameInput.value,
            email : useremailInput.value,
            password : userpasswordInput.value
        }
        userlist.push(user)
        localStorage.setItem("data" , JSON.stringify(userlist))
        clearsignup();  
        location.replace("login.html")
    }
}

function clearsignup() {
    usernameInput.value = "";
    useremailInput.value = "";
    userpasswordInput.value = "";
}

function Login() {
  for(var i = 0 ; i < userlist.length ; i++) {
    if(emailinput.value === userlist[i].email && passwordinput.value === userlist[i].password ) {
        document.querySelector(".loginFail").classList.replace("d-block" , "d-none");
        localStorage.setItem("name" , userlist[i].username);
        location.replace("home.html");
    } else { 
        document.querySelector(".loginFail").classList.replace("d-none" , "d-block")
    }
  }
} 

function welcome() {
    document.querySelector("#hello").innerHTML = `Hello ${localStorage.getItem("name")} `
}
  
// post 

if(localStorage.getItem("posts") == null) {
    postlist = []
} else {
    postlist = JSON.parse(localStorage.getItem("posts"))
    display();
}

function createpost() {
   var post = {
    author: localStorage.getItem("name"),
    content : postcontent.value,
   }
   postlist.push(post);
   console.log(post);
   localStorage.setItem("posts" , JSON.stringify(postlist));
   display();
   clearpostinput()
}
 function display() {
    var cartona = ""
   for(var i =0 ; i<postlist.length ; i++) {
    cartona += `
     <div class="card bg-w w-50 p-3 mb-4 position-relative bg-primary text-white">
            <div class="icons position-absolute end-0 me-3">
                <i class="fa-solid fa-trash text-danger mx-2" onclick ='deletepost(${i})'></i>
                <i class="fa-solid fa-pen text-warning " onclick ='kobry(${i})'></i>
            </div>
            <h4>${postlist[i].author}</h4>
            <p>${postlist[i].content}</p>
        </div>
    `
    document.getElementById("posts").innerHTML = cartona;
   }
 }

 function deletepost(index) {
    postlist.splice(index,1)
    localStorage.setItem("posts" , JSON.stringify(postlist));
    display()
 }
 function kobry(i) {
    postcontent.value = postlist[i].content;
    document.querySelector("#addbutton").classList.replace("d-block" , "d-none");
    document.querySelector("#updatebutton").classList.replace("d-none" , "d-block");
    updateindex = i;
}
function updatepost() {
    postlist[updateindex].content = postcontent.value;
    localStorage.setItem("posts" , JSON.stringify(postlist))
    display();
    document.querySelector("#addbutton").classList.replace("d-none" , "d-block");
    document.querySelector("#updatebutton").classList.replace("d-block" , "d-none");
    postcontent.value = "";
}
function clearpostinput() {
    postcontent.value = "";
}


// signupbtn.addEventListener("click" , signup);
// loginbtn.addEventListener("click" , Login);