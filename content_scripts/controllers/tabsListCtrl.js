function TabsListCtrl($scope) {
	$scope.win = window.win || {};
	$scope.tabs = $scope.win.tabs || [];

	$scope.switchTo = function(tab) {
		switchToTab(tab.id);
		closeSwitcher();
	} 
}