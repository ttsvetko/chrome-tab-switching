(function () {
	function sendMessage() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.windows.getCurrent({"populate": true},function(win) {
				chrome.tabs.sendMessage(tab.id, JSON.stringify(win));
			})
		})
	}

	chrome.browserAction.onClicked.addListener(function(tab) {
		sendMessage();
	});

	chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse) {
			var response = "";
			if (request.id) {
				chrome.tabs.update(request.id, {"active": true}, function (tab) {
					sendResponse({message: "Tab Activated"});
				})
			}
			
	});
}())