// js/controllers/mainCtrl.js

// Global Controller- contains functions needed for multiple views

var app = angular.module('mainController', []);

app.controller('mainController', function($scope, $http){
	$scope.loaded = false;
	$scope.term = 4530;
	$scope.setList = [];
	$scope.events = [];
	
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

	$scope.addToSetList = function(course){
		var i = arrayContains($scope.setList, course);
		if (i === false){
			$scope.setList.push(course);
			//console.log($scope.setList);
		}
	}

	$scope.removeFromSetList = function(course){
		var i = arrayContains($scope.setList, course);
		if (i !== false){
			$scope.setList.splice(i, 1);
		}
	}

	$scope.remix = function(){
		$scope.events = [];
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
	/*
	$scope.events = [
    { id:1, text:"Task A-12458",
      start_date: new Date(2014, 03, 24, 9, 0),
      end_date: new Date(2014, 03, 24, 16, 0) },
    { id:2, text:"Task A-83473",
      start_date: new Date(2014, 03, 22, 9, 0),
      end_date: new Date(2014, 03, 22, 16, 0) }
  ]; */
  /*
  $scope.test = function(){
  	console.log("test");
  	$scope.events.push({
  		id: 1, 
  		text: "corn",
  		start_date: new Date(2014, 03, 24, 9, 0),
  		end_date: new Date(2014, 03, 24, 16, 0),
		})
  } */

  function parseDays(str){
  	var days = [];
  	var length = str.length;
  	for (var i=0; i<str.length; i+=2){
  		days.push(str.substring(i, i+2));
  	}
  	return days;
  }

  function arrayContains(arr, obj){
  	for (var i=0; i < arr.length; i++){
  		if (arr[i] == obj){
  			return i;
  		}
  	}
  	return false;
  }

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
