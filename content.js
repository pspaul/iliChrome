chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "add-btns":
			addBtns();
			break;
		case "add-links":
			addLinks();
			break;
	}
});

var insertedBtns = false, insertedLinks = false;

function addBtns() {
	if (insertedBtns) {
		return;
	} else {
		insertedBtns = true;
	}
	
	// clear bottom button bar
	var buttonWrapperArr = document.querySelectorAll('.ilTableCommandRow div');
	if (buttonWrapperArr.length > 0) {
		var buttonWrapper = buttonWrapperArr[0];
		
		var barBtns = document.querySelectorAll('.ilTableCommandRow div input');
		for (var i = 0;i < barBtns.length;i++) {
			buttonWrapper.removeChild(barBtns[i]);
		}
		var barBtns = document.querySelectorAll('.ilTableCommandRow div select');
		for (var i = 0;i < barBtns.length;i++) {
			buttonWrapper.removeChild(barBtns[i]);
		}
	}
	
	// clear top button bar
	buttonWrapperArr = document.querySelectorAll('.ilTableCommandRowTop div');
	if (buttonWrapperArr.length > 0) {
		var buttonWrapper = buttonWrapperArr[0];
		
		var barBtns = document.querySelectorAll('.ilTableCommandRowTop div input');
		for (var i = 0;i < barBtns.length;i++) {
			buttonWrapper.removeChild(barBtns[i]);
		}
		var barBtns = document.querySelectorAll('.ilTableCommandRowTop div select');
		for (var i = 0;i < barBtns.length;i++) {
			buttonWrapper.removeChild(barBtns[i]);
		}
	}
	
	if (buttonWrapperArr.length <= 0) {
		buttonWrapperArr = document.querySelectorAll('.ilTableOuter');
	}
	
	if (buttonWrapperArr.length > 0) {
		var buttonWrapper = buttonWrapperArr[0];
		
		// download
		var dow = document.createElement('input');
		dow.className = 'submit';
		dow.type = 'submit';
		dow.id = 'btnDownload';
		dow.value = 'Download';
		dow.name = 'cmd[download]';
		buttonWrapper.appendChild(dow);
		
		// delete
		var del = document.createElement('input');
		del.className = 'submit';
		del.type = 'submit';
		del.id = 'btnDelete';
		del.value = 'Löschen';
		del.name = 'cmd[deleteDelivered]';
		buttonWrapper.appendChild(del);
		 
		// select file
		var sel = document.createElement('input');
		sel.className = 'submit';
		sel.type = 'file';
		sel.id = 'btnSelect';
		sel.name = 'deliver[0]';
		buttonWrapper.appendChild(sel);
		 
		// upload
		var upl = document.createElement('input');
		upl.className = 'submit';
		upl.type = 'submit';
		upl.id = 'btnUpload';
		upl.value = 'Hochladen';
		upl.name = 'cmd[deliverFile]';
		buttonWrapper.appendChild(upl);
		
		// change form for file upload
		for (var i = 0;i < document.forms.length;i++) {
			var f = document.forms[i];
			if (f.id == '') {
				f.enctype = 'multipart/form-data';
			}
		}
	}
}

function addLinks() {
	if (insertedLinks) {
		return;
	} else {
		insertedLinks = true;
	}
	
	var forms = document.querySelectorAll('form[name=formInfoScreen]');
	for (var i = 0;i < forms.length;i++) {
		
		// show
		var show = document.createElement('a');
		show.className = 'submit';
		show.innerHTML = 'Ansehen';
		show.id = 'lnkView';
		var path = forms[i].action;
		path = path.replace('cmdClass=ilinfoscreengui', 'cmdClass=ilobjexercisegui');
		path = path.replace('cmd=post', 'cmd=submissionScreen');
		path = path.replace('rtoken=', 'blabla=');
		
		var snip = path.substring(path.indexOf('cmdNode=')+8, path.length);
		snip = snip.substring(0, (snip.indexOf('&') > -1 ? snip.indexOf('&') : snip.length));
		path = path.replace('cmdNode='+snip, 'cmdNode='+snip.substring(0, snip.lastIndexOf(':')));
		
		show.href = path;
		forms[i].appendChild(show);
	}
}