$(document).ready(function() {
	var win = $(window);

	// Each time the user scrolls
	win.scroll(function() {
		// End of the document reached?
		if ($(document).height() - win.height() == win.scrollTop()) {
			$("#load").show();
			setTimeout(function(){
				$("#load").hide();
			},5000);
		}
	});
});