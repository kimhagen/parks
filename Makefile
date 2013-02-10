ios:
	@cat public/index.html | sed -e 's/^.*@CORDOVA@.*$$/<script src="js\/cordova-ios\.js"><\/script>/' -e 's/src="js\/parks.js"/src="js\/parks-ios.js"/' > public/index-ios.html
	@cat public/js/parks.js | sed 's/^.*@CORDOVA@.*$$/document.addEvetnListener("deviceReady", onReady, false);/' > public/js/parks-ios.js

android:
	@cat public/index.html | sed -e 's/^.*@CORDOVA@.*$$/<script src="js\/cordova-android.js"><\/script>/' -e 's/src="js\/parks.js"/src="js\/parks-android.js"/' > public/index-android.html
	@cat public/js/parks.js | sed 's/^.*@CORDOVA@.*$$/document.addEvetnListener("deviceReady", onReady, false);/' > public/js/parks-android.js
