// js/controllers/mainCtrl.js

// Global Controller- contains functions needed for multiple views

var app = angular.module('mainController', []);

app.controller('mainController', function($scope, $http){
	$scope.loaded = false;
	$scope.term = 4530;
	$scope.setList = [];
	$scope.events = [];
	
	// GET a list of subjects 
	$http.get('http://api.asg.northwestern.edu/subjects/?key=a3iSOsJ77pgC8BnX')
		.success(function(data){
			console.log("GET");
			//console.log(data);
			$scope.subjects = data;
			$scope.loaded = true;
		})
		.error(function(err){
			console.log(err);
			$scope.loaded = true;
		});

	// When a subject is selected, GET all the courses for that given subject
	$scope.$watch('selectedSubject', function(){
		if ($scope.loaded){
			$http.get('http://api.asg.northwestern.edu/courses/?key=a3iSOsJ77pgC8BnX&term=' + $scope.term + '&subject=' + $scope.selectedSubject.symbol)
			.success(function(data){
				console.log("GET");
				//console.log(data);
				$scope.courses = data;
			})
			.error(function(err){
				console.log(err);
			});
		}
	});

	// Add a course to the list of selected courses
	$scope.addToSetList = function(course){
		var i = arrayContains($scope.setList, course);
		if (i === false){
			$scope.setList.push(course);
			//console.log($scope.setList);
		}
	}

	// Remove a course from the list of selected courses
	$scope.removeFromSetList = function(course){
		var i = arrayContains($scope.setList, course);
		if (i !== false){
			$scope.setList.splice(i, 1);
		}
	}

	$scope.remix = function(){
		$scope.events = [];
		$scope.chosenDates = $scope.scramble();
		for (var i=0; i<$scope.setList.length; i++){
			var title = $scope.setList[i].subject + " " + $scope.setList[i].catalog_num
			var days = parseDays($scope.setList[i].meeting_days);
			for (var j=0; j<days.length; j++){				
				$scope.events.push({
					text: title,
					start_date: makeDate(days[j], $scope.setList[i].start_time),
					end_date: makeDate(days[j], $scope.setList[i].end_time),
				}); 
			}
		}
	}

	$scope.scramble = function(){
		
	}

	// take a string "MoWeFr" and returns an array of the dates ["Mo", "We", "Fr"]
  function parseDays(str){
  	var days = [];
  	var length = str.length;
  	for (var i=0; i<str.length; i+=2){
  		days.push(str.substring(i, i+2));
  	}
  	return days;
  }

  // Check if an object is in an array, return index of the object if true
  function arrayContains(arr, obj){
  	for (var i=0; i < arr.length; i++){
  		if (arr[i] == obj){
  			return i;
  		}
  	}
  	return false;
  }

  // Return a date object in the week of 4/20/2014 based on a string input
  function makeDate(dayString, time){
  	var hour = time.substring(0, 2);
  	var min = time.substring(3, 5);
  	switch (dayString){
  		case "Su":
  			return new Date(2014, 03, 20, hour, min);
			case "Mo":
  			return new Date(2014, 03, 21, hour, min);
			case "Tu":
  			return new Date(2014, 03, 22, hour, min);
			case "We":
  			return new Date(2014, 03, 23, hour, min);
			case "Th":
  			return new Date(2014, 03, 24, hour, min);
			case "Fr":
  			return new Date(2014, 03, 25, hour, min);
			case "Sa":
  			return new Date(2014, 03, 26, hour, min);
			default: 
				return new Date(2014, 03, 20, 00, 00);
  	} 
  }

});
