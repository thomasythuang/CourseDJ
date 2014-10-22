// js/controllers/mainCtrl.js

// Global Controller- contains functions needed for multiple views

var app = angular.module('mainController', []);

app.controller('mainController', function($scope, $http){
	$scope.loaded = false;
	$scope.term = 4530;

	var params = {
		key: 'a3iSOsJ77pgC8BnX'
	};
	
	$http.get('http://api.asg.northwestern.edu/subjects/?key=a3iSOsJ77pgC8BnX')
		.success(function(data){
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
			$http.get('http://api.asg.northwestern.edu/courses/?key=a3iSOsJ77pgC8BnX&term=' + $scope.term + '&subject=' + $scope.selectedSubject)
			.success(function(data){
				//console.log(data);
				$scope.courses = data;
			})
			.error(function(err){
				console.log(err);
			});
		}
	});

	$scope.events = [
    { id:1, text:"Task A-12458",
      start_date: new Date(2014, 09, 24, 9, 0),
      end_date: new Date(2014, 09, 24, 16, 0) },
    { id:2, text:"Task A-83473",
      start_date: new Date(2014, 09, 22, 9, 0),
      end_date: new Date(2014, 09, 22, 16, 0) }
  ];

  $scope.test = function(){
  	console.log("test");
  }

});
