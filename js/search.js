// Controller for the Git search application
gitSrch.controller('searchCont', function($scope, $location, gitSearch) {

	$scope.repoData = {};
	$scope.showError = false;

	// Searches gitHub when button clicked
	$scope.searchAction = function(){

		// Set the promise
		var promise = gitSearch.get($scope.searchField);
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
						$scope.errMessage = 'No results found for this search term';
					}

				} else {
					$scope.showError = true;
					$scope.errMessage = result.msg;
				}
		  }
		);
	}

});

// Service for searching GitHub repositories
gitSrch.service('gitSearch', function($http, $q) {

	this.get = function(repo){
		var deferred = $q.defer();
		// Build the http request
		$http({
			method: "JSONP",
			params: {
				 q: repo,
				 callback: "JSON_CALLBACK"
			},
			url: "https://api.github.com/search/repositories",
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
