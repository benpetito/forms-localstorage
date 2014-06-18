/* global formsApp, store, angular */
'use strict';

/* Controllers */

formsApp.controller('MainController', ['$scope', '$log', '$timeout', 'DSCacheFactory',
  function ($scope, $log, $timeout, DSCacheFactory) {
    $scope.master = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      comments: undefined
    },
    $scope.saveSuccess = false,
    $scope.saveError = false,
    $scope.savedForms = [],
    $scope.submitMessage = '0 forms submitted to remote database.',
    $scope.submitSuccess = false;

    // html5 localStorge interface wrapper for store.js 
    var storeJsToStandard = {
      getItem: store.get,
      setItem: store.set,
      removeItem: store.remove
    },
    CACHE_ID = 'formsApp';

    var _dataCache = new DSCacheFactory('dataCache', {
      capacity: 1000,
      storageMode: 'localStorage',
      storageImpl: storeJsToStandard,
      verifyIntegrity: true
    });

    var _showError = function() {
      $scope.saveError = true;
      $timeout(function() {
        $scope.saveError = false;
      }, 3000);
    };

    var _showSuccess = function() {
      $scope.saveSuccess = true;
      $timeout(function() {
        $scope.saveSuccess = false;
      }, 3000);
    };

    var _showSubmitSuccess = function(submittedCount) {
      $scope.submitMessage = submittedCount + ' forms submitted to remote database.';
      $scope.submitSuccess = true;
      $timeout(function() {
        $scope.submitSuccess = false;
      }, 5000);
    };

    $scope.init = function() {
      // clear the form on page load
      $scope.reset();

      // load any previously saved forms from the cache
      if (_dataCache.get(CACHE_ID)) {
        $scope.savedForms = _dataCache.get(CACHE_ID);
        $log.debug('Loaded ' + $scope.savedForms.length + ' items from local storage.');
      }
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
      
      if($scope.form1) {
        $scope.form1.$setPristine();
      }
    };

    /**
     * Simulates submitting the form to remote service for 
     * persistence.
     */
    $scope.submit = function() {
      $log.debug('Uploading forms to remote server.');
      var count = $scope.savedForms.length;
      $scope.savedForms.splice(0, $scope.savedForms.length);
      _dataCache.put(CACHE_ID, $scope.savedForms);
      _showSubmitSuccess(count);
    };

    $scope.update = function(user) {
      if($scope.form1) {
        if($scope.form1.$valid) {
          //$scope.master = angular.copy(user);  
          $scope.savedForms.push(user);
          $scope.reset();

          // add form to the cache
          _dataCache.put(CACHE_ID, $scope.savedForms);
          $log.debug('Wrote forms to cache');
          _showSuccess();
        }
      }
    };

    $scope.init();
  }
]);