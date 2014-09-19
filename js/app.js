// Initiate the module for the Git search application
var gitSrch = angular.module('gitSrch', ['ngRoute']);

//This configures the routes 
gitSrch.config(function ($routeProvider, $locationProvider) {

	$routeProvider
	.when('/',
		{
			controller: 'searchCont',
			templateUrl: 'tmplt/search.html'
		})
	.when('/issue/:user/:repo',
		{
			controller: 'issueCont',
			templateUrl: 'tmplt/issue.html'
		})

	.otherwise({ redirectTo: '/' });

});