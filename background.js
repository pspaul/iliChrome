chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (contains(tab.url, 'baseClass=ilExerciseHandlerGUI')) {
		if (contains(tab.url, 'cmd=submissionScreen')) {
			addBtns();
		} else if (contains(tab.url, 'cmd=showOverview')) {
			addLinks();
		}
	}
});

function contains(text, contains) {
	return text.indexOf(contains) > -1;
}

var addBtns = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "add-btns"});
	});
}

var addLinks = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "add-links"});
	});
}