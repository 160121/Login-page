

function showlogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("forgotpassword").style.display="none";
}

function showSignup() {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("forgotpassword").style.display="none";
}

function forgotPassword(){
    document.getElementById("forgotpassword").style.display="block";
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
}
window.onload = function() {
    const tabs = document.querySelectorAll('.btn');
    const tabsContainer = document.querySelector('.operations');
    const tabcontent=document.querySelectorAll('.tabcontent');
    tabsContainer.addEventListener('click', function (e) {
        const clicked = e.target.closest('.btn');
        if (!clicked) return;
        tabs.forEach(t => t.classList.remove('btn-active'));
        tabcontent.forEach(c=>c.classList.remove('tabcontent-active'));
        clicked.classList.add('btn-active');
        //document.querySelector(`.tabcontent--${clicked.dataset.tab}`).classList.add('tabcontent-active');
    }); 
    const emailInput=document.querySelector("#email");
    const passwordInput=document.querySelector("#password");
    const login=document.querySelector("#loginForm");
    login.addEventListener("submit",function(e){
    e.preventDefault();
    const email=emailInput.value;
    fetch(`https://reqres.in/api/users?email=${email}`).then(response=>response.json()).then(data=>{
        console.log(data);
        if(data&&data.data&&data.data.length>0){
            let user=null;
            for(let i=0;i<data.data.length;i++){
                if(data.data[i].email==emailInput.value){
                    user=data.data[i];
                    break;
                }
            }
            if(user){
                const password=passwordInput.value;
                if(password==user.first_name){
                    alert("Login successful🙌🙌");
                }
                else{
                    alert("wrong credentials....🔑🔑");
                }
            }
            else{
                alert("No user found with this email 🤷‍♀️.please sign up to continue...")
            }
        }
        else{
            alert("wrong credentials 🤷‍♀️");
        }
    }).catch(err=>console.error(err));
});

//signup
const signup = document.querySelector("#signupForm");
const emailInput2 = document.querySelector('#EmailAddress2');
const password2 = document.querySelector('#password2');
const confirmpassword = document.querySelector('#confirmpassword');
signup.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput2.value;
    fetch(`https://reqres.in/api/users?email=${email}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                let userExists = false;
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].email === email) {
                        userExists = true;
                        break;
                    }
                }
                if (!userExists) {
                    const newUser = { email: email, password: password2.value };
                    data.data.push(newUser);
                    console.log(data.data);
                    alert("User added successfully!");
                } else {
                    alert("User already exists in the system.");
                }
            } else {
                alert("err");
            }
        })
        .catch(error => alert("Error checking for user."));
});


}
  


