var firebaseRef = firebase.database().ref();
var submitBtn = document.getElementById("submitBtn");

var myAddress = document.getElementById("myAddress");

var firebaseAddressRef = firebase.database().ref().child("Address");

firebaseAddressRef.on('value', function(data){
	myAddress.innerText = data.val();
});

function submitClick(){
	var fullname = document.getElementById("full-name").value;
	var email = document.getElementById("email").value;
	var website = document.getElementById("website").value;
	var company = document.getElementById("company").value;
	var country = document.getElementById("country").value;
	var phone = document.getElementById("phone").value;
	var message = document.getElementById("message").value;

	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); 
	var yyyy = today.getFullYear();
	// var today = mm+'/'+dd+'/'+yyyy; 

	var firebaseRef = firebase.database().ref();

	// window.alert(fullname);
	var inquiryRef = firebaseRef.child("Contact inquiry - "+today);
	inquiryRef.set({
		date_of_inquiry: today,
		fullname: fullname,
		email: email,
		website: website,
		company: company,
		country: country,
		phone: phone,
		message: message
	});

	swal({
		title: "Success!",
		text: 'Your contact inquiry successfully was sent!<br/><span style="color:#F8BB86">Thank you for your inquiry :)</span>',
		type: "success",
		html: true,
		showLoaderOnConfirm: false,
		confirmButtonText: "Close"
	});
	document.getElementById("full-name").value = "";
	document.getElementById("email").value = "";
	document.getElementById("website").value = "";
	document.getElementById("company").value = "";
	document.getElementById("country").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("message").value = "";

}