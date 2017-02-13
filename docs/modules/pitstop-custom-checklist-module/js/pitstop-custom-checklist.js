$(document).ready(function(){
	console.log('Inside document ready');
	
	$('.list-group-item').on('click', function() {
		var $this = $(this);
		var $alias = $this.data('alias');

		$('.active').removeClass('active');
		$this.toggleClass('active');
	})
});

