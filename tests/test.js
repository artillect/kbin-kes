const timeObserver = new MutationObserver(updateTime);
const ns = 'timestamp'
let times = document.querySelectorAll('.timeago')
const settings = getModSettings(ns);
function updateTime(toggle) {
    if (toggle) {
    times.forEach((time) => {
	let oldTime = time.innerText;
	time.setAttribute('oldtime', oldTime);
	let iso = time.getAttribute('datetime');
	let isoYear = (iso.split('T')[0]);
	let isoTime = (iso.split('T')[1]);
	isoTime = (isoTime.split('+')[0]);
	let cleanISOTime = isoYear + " @ " + isoTime;
	let localTime = new Date(iso);
	let localAsISO = localTime.toLocaleString('sv').replace(' ', ' @ ');
        let offset = "offset"
	    if (settings.offset) {
		    console.log("found localstorage key")
	            console.log(settings.offset)
		    switch (settings.offset) {
			    case "UTC":
				time.innerText = cleanISOTime;
                    break;
			    case "Local time":
				time.innerText = localAsISO;
                    break;
		    }
	    }
        timeObserver.observe(document.body, { childList: true, subtree: true });
     });
    } else {
    times.forEach((time) => {
	let oldTime = time.getAttribute('oldtime');
	if (oldTime){
	time.innerText = oldTime;
	}
    });
        timeObserver.disconnect();
    }
}
updateTime(true);
