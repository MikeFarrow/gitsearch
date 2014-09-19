// Controller for the issue list screen
gitSrch.controller('issueCont', function($scope, $routeParams, gitIssue) {

	$scope.init = init();
	$scope.repoData = {};
	$scope.showError = false;

	// Initialise the issues
	function init() {
		$scope.hello = 'hiInit';

		// Set the promise
		var promise = gitIssue.get($routeParams.user, $routeParams.repo);
		promise.then(
			function(result) {
				// Check for errors
				if (!result.err){
					// Check for no records
					if (result.total_count != 0){
						// Load the JSONP data
						$scope.repoData = result.items;
						$scope.showError = false;
					} else {
						// Show no records found message
						$scope.showError = true;
						$scope.errMessage = 'No issues found for this repository';
					}

				} else {
					$scope.showError = true;
					$scope.errMessage = result.msg;
				}
		  }
		);

	}

});

// Servive for retrieving gitHub issues
gitSrch.service('gitIssue', function($http, $q) {

	this.get = function(user, repo){
		var deferred = $q.defer();
		// Build the http request
		$http({
			method: "JSONP",
			params: {
				 q: 'repo:' + user + '/' + repo,
				 callback: "JSON_CALLBACK"
			},
			url: "https://api.github.com/search/issues",
			isArray: true

		}).success(function(data, status) {
			// Do any post fetch deferred processing
	  	deferred.resolve({
				total_count: data.data.total_count,
				items: data.data.items
			});

		}).error(function(data, status) {
			// Handle errors
			deferred.resolve({
				err: true,
				msg: 'Error: ' + status
			});
		});

		return deferred.promise;
	}
});