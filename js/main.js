// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxzZzZ9TknURSQa2CvOGXPKJCN2NJ3tuo",
    authDomain: "shopdatabase-da143.firebaseapp.com",
    databaseURL: "https://shopdatabase-da143.firebaseio.com",
    projectId: "shopdatabase-da143",
    storageBucket: "shopdatabase-da143.appspot.com",
    messagingSenderId: "316630169497"
  };
  firebase.initializeApp(config);


// Reference emailSubscriberList collection

var emailRef = firebase.database().ref("emailSubscriberList");

require ('../sass/style.scss')



document.addEventListener("DOMContentLoaded", function() {

// dropdown menu at products section

      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
          acc[i].onclick = function(){
              /* Toggle between adding and removing the "active" class,
              to highlight the button that controls the panel */
              this.classList.toggle("active");

              /* Toggle between hiding and showing the active panel */
              var panel = this.nextElementSibling;

              if (panel.style.display === "block") {
                  panel.style.display = "none";
              } else {
                  panel.style.display = "block";
              }

              // if (panel.style.maxHeight){
              //   panel.style.maxHeight = null;
              // } else {
              //   panel.style.maxHeight = panel.scrollHeight + "px";
              // }
          }
      }

      $( ".accordion" ).click(function (event) {
        var target = $( event.target );
        if ( target.next().is( ":hidden" ) ) {
          target.next().slideDown( "slow" );
        } else {
          target.next().hide();
        }
      });


// get email from input and transfer it to firebase

      //Listen for form submit
      document.getElementById("getSubscription").addEventListener('submit',submitToSubscribe);

      // Submit form
      function submitToSubscribe(e) {
        e.preventDefault();
        // get value
        var email = document.getElementById('email').value;

        // Save email
        saveEmail(email);

        // show alert that email was saved to subscriber database
        document.querySelector(".alert").style.display="block";

        // Hide alert after 3 seconds
        setTimeout(function(){
          document.querySelector(".alert").style.display="none";
        },3000);

        document.getElementById("getSubscription").reset();
      }

      // Save email to firebase

      function saveEmail(email) {
        var newEmailRef = emailRef.push();
        newEmailRef.set({
          email:email,
        });
      }

// uploading clothes from firebase

      var rootRef = firebase.database().ref().child("clothes").child("women");

      rootRef.on("child_added", snap => {

        var img = snap.child("img").val();
        var price = snap.child("price").val();
        var title = snap.child("title").val();
        var id = snap.child("id").val();

        $("#clearanceOffer").append(`<div class='clearanceOfferSample1' data-id=${id} onclick="location.href='#top'">
          <img src= ${img} alt='clothes picture'>
          <p> ${title} </p>
          <div>
            <p>&#36;</p>
            <span> ${price} </span>
          </div>
          <button class='addToCart'>ADD TO CART +</button>
        </div>`);
      });


//display event target id
      $(".clearanceOffer1" ).on("click",".clearanceOfferSample1" ,function(event) {
        // var idClicked = event.target.dataset.id;
        var idClicked = this.dataset.id;
        // alert(this.dataset.id);

        // display product info after click

              var allProducts = document.getElementsByClassName("clearanceOfferSample1");
              var urlRef2 = firebase.database().ref().child("clothes").child("women");

              urlRef2.once("value", function(snapshot) {
                // console.log(snapshot.val();
                var data = snapshot.val();
                data.forEach(function(child) {
                    if (idClicked == child.id) {
                        var image = child.img;
                        $(".mainPicture1").empty();
                        $(".mainPicture1").append(`<img src=${image} alt="picture of cothes" width = 400>`);
                    };
                })

              });
      });

















});
