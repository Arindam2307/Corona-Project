
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD8-AhR2vRzRbMh2bfC0yPioqQIoYHcsBw",
    authDomain: "corona-e6819.firebaseapp.com",
    databaseURL: "https://corona-e6819-default-rtdb.firebaseio.com",
    projectId: "corona-e6819",
    storageBucket: "corona-e6819.appspot.com",
    messagingSenderId: "14576971149",
    appId: "1:14576971149:web:37f12a7fdc00fd23dd61c4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  /*To read or write data in a db you need to create an instance of firebase.database.reference*/



  var UserInputsRef=firebase.database().ref('UserInputs')
  

  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){ //this function is storing the data in variables
    e.preventDefault();

    // var fname=document.getElementById('firstname').value

    var fname =getInputVal('firstname'); //getInputVal()
    var lname =getInputVal('lastname');
    var mobile =getInputVal('mobile');
    var state =getInputVal('state');
    var email =getInputVal('email');
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var symptomsList =getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;

    state=state.toLowerCase();
    readState(state); //this function will have code to fetch data from db

    var emailstatus=validateEmail(); //checks if email is valid, returns a boolean value

    //saveMessages() depending on the email id being valid
    if(emailstatus)
    saveMessages(fname+ " " +lname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

//getting data from each input field in the form
function getInputVal(id){
  return document.getElementById(id).value;
}

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  return values;
}



//checks if email is valid, returns a boolean value
function validateEmail() 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}



//To read data at a path and listen for changes use on()
function readState(state){
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>" + centers.toUpperCase();
})

}



function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
   
  var newuserInputsRef = UserInputsRef.push();  
    newuserInputsRef.set({
      Name:name,
      Mobile:mobile,
      Email:email,
      Profession:profession,
      Dateofbirth:dateofbirth,
      SelectedOption:selectedOption,
      State:state, 
      SymptomsList:symptomsList
  })
    alert("Thank you, find the list of centers nearby!  ");
}



