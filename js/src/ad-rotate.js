

$(function(){

	$(".promotion > div:gt(0)").hide();

	setInterval(function(){
		$('.promotion > div:first')
			.hide()
			.next()
			.show()
			.end()
			.appendTo('.promotion');
	},  4000);
	
});

