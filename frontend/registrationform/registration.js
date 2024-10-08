const welcMsg = document.getElementById('welcomeMsg');

const userNmaereg = document.getElementById('userName-R');
const email = document.getElementById('email');
const regPass = document.getElementById('password-R');
const submitReg = document.getElementById('sendData');

const toLogin = document.getElementById('tologin');
const msg = document.getElementById('successMsg');
const gotoLoginbtn = document.getElementById('gologinbtn');

submitReg.addEventListener('click',async(event) =>{
    event.preventDefault();
    const name = userNmaereg.value;
    const emailReg = email.value;
    const password = regPass.value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name,email:emailReg,password:password})
    };
    try{
        const response = await fetch('http://localhost:3000/api/user/register',options);
        const data = await response.json();
        console.log(data);
        
        if(data.success){
            toLogin.style.display="flex";
            msg.innerText = data.message;
            gotoLoginbtn.style.display = "block";
            gotoLoginbtn.disabled = false;
            gotoLoginbtn.addEventListener('click',function(e){
                e.preventDefault();
                location.href = "/frontend/loginform/loginform.html"
            })

        }else{
            welcMsg.innerText = data.message;
            userNmaereg.value = '';
            email.value = '';
            regPass.value = '';

        };
    }catch(err){
        console.log("error on frontend"+" "+ err);
        welcMsg.innerText = "something went wrong";
            userNmaereg.value = '';
            email.value = '';
            regPass.value = '';
    }
})