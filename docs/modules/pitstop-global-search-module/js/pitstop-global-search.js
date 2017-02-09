$(document).ready(function(){
	console.log('Inside pitstop global search document ready');
	var parentDiv = $('#accordion div'),
	childDiv = $('#accordion h4').siblings('div');
	
	$('#accordion p').click(function(){
		parentDiv.slideUp();
		if($(this).next().is(':hidden')){
			$(this).next().slideDown();
		}else{
			$(this).next().slideUp();
		}
	});
	
	$('#accordion h4').click(function(){
		childDiv.slideUp();
		if($(this).next().is(':hidden')){
			$(this).next().slideDown();
		}else{
			$(this).next().slideUp();
		}
	});
});
