function closeSwitcher(event) {
	switcher.remove();
	stopPropagation(event);
}

function stopPropagation(event) {
	if (event) {
		event.stopPropagation();
	}
}

function switchToTab(tabId) {
	chrome.extension.sendMessage({"id": tabId}, function(response) {
		console.log(response);
	});
}

chrome.extension.onMessage.addListener(function(request, sender) {
	window.win = JSON.parse(request);

	var $ = jQuery;

	$("div[data-ng-controller='TabsListCtrl']").remove();
	switcher = $(
					"<div data-ng-app='tabslist' data-ng-controller='TabsListCtrl'>" +
						"<link rel='stylesheet' href='" + chrome.extension.getURL("content_scripts/styles/main.css") + "' scoped >" +
						"<div class='overlay'>" +
							"<div class='tabsListDialog'>" + 
								"<header>" +
									"<input type='search' ng-model='searchTab'/>" +
								"</header>" +
								"<div class='content'>" +
									"<div class='list'>" +
										"<div data-ng-repeat='tab in tabs | filter: searchTab' data-ng-click='switchTo(tab)'>" +
											"<img data-ng-src='{{tab.favIconUrl}}' />" +
											"{{tab.title}}" +
										"</div>" +
									"</div>" +
								"</div>" +
								"<footer>" + chrome.i18n.getMessage("closeMsg") + "</footer>" +
							"</div>" +
						"</div>" +
					"</div>"
				)
				.appendTo(document.body)
				.on("tabslist.load", function() {
					angular.bootstrap(this);
					window.tabsList = angular.module("tabslist", []);
					$(this).find("input").focus();
				})
				.on("keydown", function(event) {
					if (event.keyCode === 27) {
						closeSwitcher(event);
					}
				})
				.on("click", function(event) {
					$(this).find("input").focus();
					stopPropagation(event);
				})
				.trigger("tabslist.load");
});
