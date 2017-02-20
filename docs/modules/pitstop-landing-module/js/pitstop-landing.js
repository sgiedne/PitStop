$(document).ready(function(){
	console.log('Inside document ready');
	
	$('#login').click(function(){
		$('.login-section').hide();
		$('.checklist-section').show();
		$('.down-arrow-image-section').hide();
		$('.up-arrow-image-section').hide();
	});
	
	$('.list-group-item').on('click', function() {
		var $this = $(this);
		var $alias = $this.data('alias');

		$('.active').removeClass('active');
		$this.toggleClass('active');
	});
	
	/* New checklist - start */
	
	$('#newChecklist').on('click', function() {
		$('.checklist-center-section').hide();
		$('.new-checklist-container').show();
	});
	
	// add items
	$('#add-todo').click(function(){
	  var lastSibling = $('#todo-list > .todo-wrap:last-of-type > input').attr('id');
	  var newId;
	  if(typeof(lastSibling) != 'undefined')
		newId = Number(lastSibling) + 1;
	  else
		newId = 1;
		  
	  $(this).before('<span class="editing todo-wrap"><input type="checkbox" id="'+newId+'"/><label for="'+newId+'" class="todo"><i class="fa fa-check"></i><input type="text" class="input-todo" id="input-todo'+newId+'"/></label></div>');
	  $('#input-todo'+newId+'').parent().parent().animate({
		height:"36px"
	  },200)
	  $('#input-todo'+newId+'').focus();
	  
		$('#input-todo'+newId+'').enterKey(function(){
		$(this).trigger('enterEvent');
	  })
	  
	  $('#input-todo'+newId+'').on('blur enterEvent',function(){
		var todoTitle = $('#input-todo'+newId+'').val();
		var todoTitleLength = todoTitle.length;
		if (todoTitleLength > 0) {
		  $(this).before(todoTitle);
		  $(this).parent().parent().removeClass('editing');
		  $(this).parent().after('<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span>');
		  $(this).remove();
		  $('.delete-item').click(function(){
			var parentItem = $(this).parent();
			parentItem.animate({
			  left:"-30%",
			  height:0,
			  opacity:0
			},200);
			setTimeout(function(){ $(parentItem).remove(); }, 1000);
		  });
		}
		else {
		  $('.editing').animate({
			height:'0px'
		  },200);
		  setTimeout(function(){
			$('.editing').remove()
		  },400)
		}
	  })

	});

	// remove items 

	$('.delete-item').click(function(){
	  var parentItem = $(this).parent();
	  parentItem.animate({
		left:"-30%",
		height:0,
		opacity:0
	  },200);
	  setTimeout(function(){ $(parentItem).remove(); }, 1000);
	});

	// Enter Key detect

	$.fn.enterKey = function (fnc) {
		return this.each(function () {
			$(this).keypress(function (ev) {
				var keycode = (ev.keyCode ? ev.keyCode : ev.which);
				if (keycode == '13') {
					fnc.call(this, ev);
				}
			})
		})
	}
	
	/* New checklist - End */
	
	$('#expandGlobalSearch').click(function(){
		$('.up-arrow-image-section').css('display','inline');
		$('.down-arrow-image-section').hide();
		//$('.global-search-section').show();
		document.getElementById("globalsearchsection").scrollIntoView()
	}); 

	$('#collapseGlobalSearch').click(function(){
		$('.up-arrow-image-section').css('display','none');
		$('.down-arrow-image-section').show();
		//$('.global-search-section').hide();
		document.getElementById("headerContainer").scrollIntoView()
	}); 
	
		
    //  $(".accordion p, .accordion div").slideUp("fast");
    //  $(".accordion p, .accordion div").hide();
    var headers = ["H1", "H2", "H3", "H4", "H5", "H6"];
	
    $(".accordion p, .accordion div").hide();
    $(".accordion").click(function (e) {
        var target = e.target
            , name = target.nodeName.toUpperCase();
    
        console.log("HERE------");
        console.log(name);
        console.log(target);
        console.log($(target).next());
        
        if ($.inArray(name, headers) > -1) {
            var subItem = $(target).next();
            var depth = $(subItem).parents().length;
            var allAtDepth = $(".accordion p, .accordion div").filter(function () {
                if ($(this).parents().length >= depth && this !== subItem.get(0)) {
                    return true;
                }
            });
        
            $(allAtDepth).slideUp("fast");
            
            
            subItem.slideToggle("fast", function () {
                $(".accordion :visible:last").css("border-radius", "0 0 10px 10px");
            });
            $(target).css({
                "border-bottom-right-radius": "0"
                , "border-bottom-left-radius": "0"
            });
        }
    });
});