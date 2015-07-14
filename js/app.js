angular
  .module('summernote-page', [
    'ui.router'
  ])
  .config(PageConfgig)
  .controller('PageController', PageController)
  .run(PageRun);


PageConfgig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$stateProvider'];

function PageConfgig($urlRouterProvider,  $urlMatcherFactoryProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  $urlMatcherFactoryProvider.strictMode(false); // Handling trailing slashes            

  var states = getStates();

  angular.forEach(states, function (state) {
    $stateProvider.state(state.state, state.config);
  });

  function getStates() {
    return [
      {
        state: 'app',
        config: {
          url: '',
          abstract: true,
          controller: 'PageController',
          template: '<div ui-view/>'
        }
      },
      {
        state: 'app.home',
        config: {
          url: '/',
          templateUrl: 'html/main.html'
        }
      },
      {
        state: 'app.gettingstarted',
        config: {
          url: '/getting-started',
          templateUrl: 'html/getting-started.html'
        }
      },
      {
        state: 'app.deepdive',
        config: {
          url: '/deep-dive',
          templateUrl: 'html/deep-dive.html'
        }
      },
      {
        state: 'app.example',
        config: {
          url: '/example',
          templateUrl: 'html/example.html'
        }
      },
      {
        state: 'app.history',
        config: {
          url: '/history',
          templateUrl: 'html/history.html'
        }
      },
      {
        state: 'app.team',
        config: {
          url: '/team',
          templateUrl: 'html/team.html'
        }
      }
    ];
  }  
}  

PageController.$inject = ['$scope', '$location', '$anchorScroll'];

function PageController($scope, $location, $anchorScroll) {
  var $body = $(document.body);
  var $navbar = $('.navbar');

  $scope.$on('$viewContentLoaded', function (event) {
    window.scrollTo(0, 0);
    ga('send', 'pageview', { page: $location.url() });
  });

  $scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };
}

PageController.$inject = ['$rootScope'];

function PageRun($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function () {
    $('.navbar-collapse').collapse('hide');

    var $sidebar = $('.bs-page-sidebar');
    if ($sidebar.length) {
      $body.scrollspy({
        target: '.bs-page-sidebar',
        offset: $navbar.height()
      });

      $sidebar.affix({
        offset: {
          top: function() {
            var offsetTop = $sidebar.offset().top;
            var nPadding = 20;
            return (this.top = offsetTop - nPadding - $navbar.height());
          }, bottom: function() {
            return (this.bottom = $('.bs-page-footer').outerHeight(true));
          }
        } 
      });
    }

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
}
