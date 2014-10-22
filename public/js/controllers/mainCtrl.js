// js/controllers/mainCtrl.js

// Global Controller- contains functions needed for multiple views

var app = angular.module('mainController', []);

app.controller('mainController', function($scope){
	
	$scope.events = [
    { id:1, text:"Task A-12458",
      start_date: new Date(2014, 09, 24, 9, 0),
      end_date: new Date(2014, 09, 24, 16, 0) },
    { id:2, text:"Task A-83473",
      start_date: new Date(2014, 09, 22, 9, 0),
      end_date: new Date(2014, 09, 22, 16, 0) }
  ];

  
});
