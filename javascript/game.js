//global variable
var character;
var destination;
var firstTrain;
var frequency;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOl3AF4xybAFDHxGbNbRIlBvVWfBVVE5M",
    authDomain: "train-project-2b5c8.firebaseapp.com",
    databaseURL: "https://train-project-2b5c8.firebaseio.com",
    projectId: "train-project-2b5c8",
    storageBucket: "",
    messagingSenderId: "986851011383"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").click(function (e) {
    e.preventDefault();

    character = $("#charName").val().trim();
    destination = $("#addDes").val().trim();
    firstTrain = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    var newTrain = {
        character: character,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };


    database.ref().push(newTrain);

});


database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    //storing everything into a variable
  var character = childSnapshot.val().character;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

    //time calculations
  var timeDif = moment().diff(moment(firstTrain, "hh:mm A"), 'm');
  var timeRemain = timeDif % frequency;
  var minutesAway = frequency - timeRemain;
  var nextTrain = moment().add(minutesAway, "m").format("hh:mm A");

    //train data into table
  $(".table").append("<tr><td>" + character + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway +
    "</td></tr>");
});