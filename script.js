
function register(){
    if(rUser.value=="" || rEmail.value=="" || rPswd.value==""){
        alert("Please Enter the details")
    }
    else{
        const reg={
            username: rUser.value,
            email: rEmail.value,
            password: rPswd.value,
            income: 0,
            expense: 0,
            savings: 0,
            incomeType:[],
            expenseType:[]
        }
        if(reg.username in localStorage || reg.email in localStorage){
            alert('Username or email already exists')
        }
        else{
        localStorage.setItem(reg.username,JSON.stringify(reg));
        alert("Registered Successfully")
        rUser.value=""
        rEmail.value=""
        rPswd.value=""
        window.location='./index.html'
        }
    }
}

function login(){
    if(uname.value=="" || pswd.value==""){
        alert("Please Enter the details")
    }
    else{
        data=JSON.parse(localStorage.getItem(uname.value));
        if(uname.value==data.username && pswd.value==data.password){
            localStorage.setItem("username", uname.value);
            window.location='./home.html';  
        }
        else{
            alert("Invalid username or password")
        }
    }
}

function viewMore(){
    tables.hidden=false;
    viewM.hidden=true;
    viewL.hidden=false;

    }
function viewLess(){
    tables.hidden=true;
    viewL.hidden=true;
    viewM.hidden=false;
    
}
const username = localStorage.getItem("username");

// Display username in profile page
const usernameDisplay = document.getElementById("user");
if (username) {
  usernameDisplay.textContent = `${username}`;
  data=JSON.parse(localStorage.getItem(username))
  savings=document.getElementById('savings');
  tIncome=document.getElementById('tIncome');
  tExpense=document.getElementById('tExpense');
  totInc=Number(data.income);
  totExp=Number(data.expense);
  sav=totInc-totExp;
  savings.innerHTML=`${sav}`
  tIncome.innerHTML=`${data.income}`
  tExpense.innerHTML=`${data.expense}`
 
} 


function addIncome(){
    if(iType.value==""||iAmnt.value==""){
        alert("Enter the details");
    }
    else{
    var userName = document.getElementById('user').innerHTML;
    savings=document.getElementById('savings');
    data=JSON.parse(localStorage.getItem(userName));
    totInc=Number(data.income);
    totInc=iAmnt.value;
    data.income+=Number(totInc)
    sav+=Number(iAmnt.value);
    tIncome.innerHTML=`${data.income}`
    savings.innerHTML=`${sav}`

    var currentDate = new Date();  
    // Get individual components of the date and time
    var date = currentDate.toDateString();
    var time = currentDate.toLocaleTimeString();
    // Combine date and time into a single string
    var dateTime = date + ' ' + time;
    const data1={incometype:iType.value,incomeamount:iAmnt.value,idate:dateTime};
    data.incomeType.push(data1);
    localStorage.setItem(userName,JSON.stringify(data));
    alert("Income added")
    iType.value=""
    iAmnt.value=""
    location.reload();
    }
}
function addExpense(){
    if(eType.value==""||eAmnt.value==""){
        alert("Enter the details");
    }
    else{
    var userName = document.getElementById('user').innerHTML;
    savings=document.getElementById('savings');
    data=JSON.parse(localStorage.getItem(userName));
    totExp=Number(data.expense);
    totExp=eAmnt.value;
    data.expense+=Number(totExp)
    sav-=Number(eAmnt.value);
    tExpense.innerHTML=`${data.expense}`
    savings.innerHTML=`${sav}`
    var ecurrentDate = new Date();  
    // Get individual components of the date and time
    var edate = ecurrentDate.toDateString();
    var etime = ecurrentDate.toLocaleTimeString();
    // Combine date and time into a single string
    var edateTime = edate + ' ' + etime;
    const data1={expensetype:eType.value,expenseamount:eAmnt.value,edate:edateTime};
    data.expenseType.push(data1);
    localStorage.setItem(userName,JSON.stringify(data));
    alert("Expense added")
    eType.value=""
    eAmnt.value=""
    location.reload();
    }
}

function logout(){
    logOut=confirm("Are you sure want to log out");
    if(logOut){
    window.location='./index.html'
    }
}
function cleared(){
   confirmed= confirm("Are you sure want to clear");
   if(confirmed){
    var userid=document.getElementById("user").innerHTML;
    data=JSON.parse(localStorage.getItem(userid));
    data.income=0
    data.expense=0
    data.savings=0
    data.incomeType=[]
    data.expenseType=[]
    localStorage.setItem(userid,JSON.stringify(data));
    location.reload();
   }
}


iDetails=document.getElementById("iDetails");
eDetails=document.getElementById("eDetails")
userid=document.getElementById("user").innerHTML;
data=JSON.parse(localStorage.getItem(userid));
// console.log(data);
    // If there's data and it's an array, loop through the array to display its contents
    if(userid){
 for(i of data.incomeType){
iDetails.innerHTML+=`
<tr>
<td>${i.incometype}</td>
<td>${i.incomeamount}</td>
<td>${i.idate}</td>
</tr>
 `}

 for( j of data.expenseType){
    eDetails.innerHTML+=`
<tr>
<td>${j.expensetype}</td>
<td>${j.expenseamount}</td>
<td>${j.edate}</td>
</tr>
 `
 }
}
