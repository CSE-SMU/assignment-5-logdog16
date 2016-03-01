angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.factory('BeerData', function(){                                          // This factory stores information as a singleton so multiple controllers can access it
  return {data: {}};
})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {     // use dependency injection to get the BeerData factory
  $scope.form = {};                                                       // used to store your form data

  $scope.search = function() {                                            // called when the search button is clicked
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',               // the link to my proxy
      params: {                                                           // sets the GET params
        name: $scope.form.name
      }
    }).then(function successCallback(response) {
      BeerData.data = response.data;
      console.log(BeerData.data);                                     // save the response data in the factory
      $state.go('app.beers');                                             // go to the beer results state
    });
  }
})

.controller('BeersCtrl', function($scope, BeerData) {
  console.log(BeerData.data);                                             // test to make sure that the data got passed through


  $scope.playlists = BeerData.data.data;
})


.controller('BeerCtrl', function($scope, $stateParams, BeerData) {        // use dependency injection to get the BeerData factory
  console.log($stateParams.id);                                           // test to make sure the id gets passed through the URL

  // make another http request to get the beer or...
  // loop through BeerData to find the beer with the same id
});
