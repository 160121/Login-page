

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
    fetch(
      `https://gorest.co.in/public/v2/users?access-token=8fa9815996dbadfe915a7208179c099026e1d39b8993b6e54177260be167266c?email=${email}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.data && data.data.length > 0) {
          let user = null;
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].email == emailInput.value) {
              user = data.data[i];
              break;
            }
          }
          if (user) {
            const password = passwordInput.value;
            if (password == user.first_name) {
              alert('Login successful🙌🙌');
            } else {
              alert('wrong credentials....🔑🔑');
            }
          } else {
            alert(
              'No user found with this email 🤷‍♀️.please sign up to continue...'
            );
          }
        } else {
          alert('wrong credentials 🤷‍♀️');
        }
      })
      .catch((err) => console.error(err));
  });
    var form = document.getElementById('signupForm');
    let data = {
      email: document.querySelector('#EmailAddress2'),
      password: document.querySelector('#password2')/*,
      confirm_password: document.querySelector('#confirmpassword'),*/
    };
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      fetch(
        'https://gorest.co.in/public/v2/users?access-token=8fa9815996dbadfe915a7208179c099026e1d39b8993b6e54177260be167266c',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    });

}