angular.module('directivesFrontEnd',[])
 .directive('news', function () {
      
      var controller = function () {
              var vm = this;
              function init() {                
                //vm.articles = angular.copy(vm.dataStore);               
              }
              init();
      };    
      return {
          restrict: 'EA', //Default for 1.3+
          scope : { 
            data : '=', 
            editpost : '&', 
            deletepost : '&' 
          },
          controller: controller,
          controllerAs: 'vm',
          bindToController: true, //required in 1.3+ with controllerAs
          templateUrl: 'directives/newsTemplate.html'
      };
  });