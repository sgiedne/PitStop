var categoryName = '';
var selectedChecklistId = '';
var deleteChecklistId = '';

$(document).ready(function(){
	console.log('Inside document ready');	
	$('#log-out').hide();
	$('#username').val('');
	$('#password').val('');
	$("#feedback_button").click(function(){
    	$('.form').slideToggle();   		
    });
	
	$('#login').click(function(){
		$('.login-success').hide();
		var usrName = $('#username').val();
		var pwd = $('#password').val();
		if(typeof(Storage) !== "undefined") {
			if(localStorage.getItem("usrName") == usrName &&  localStorage.getItem("pwd") == pwd){
				$('.login-section').hide();
				$('.checklist-section').show();
				$('.existing-checklist').hide();
				$('.down-arrow-image-section').hide();
				$('.up-arrow-image-section').hide();
				$('#log-out').show();
				//$('.bottom-section').hide();
				getExistingchecklist();
			}else{
				$('.login-failed').show();
				/* 				
			    $('.login-section').hide();
				$('.checklist-section').show();
				$('.existing-checklist').hide();
				$('.down-arrow-image-section').hide();
				$('.up-arrow-image-section').hide(); */
			}
			clearFormFields();
		}		
	});

	$('#log-out').click(function(){
			$('.login-section').show();
			$('.checklist-section').hide();
			$('.existing-checklist').show();
			$('.down-arrow-image-section').show();
			$('.up-arrow-image-section').show();
			$('#log-out').hide();
			//$('.bottom-section').show();
			clearLogInFormFields();		
	});
	
	$('#signupButton, .signup-link').click(function(){
          $('#loginButton').css("background-color", "#ecf0f1");
          $('#loginButton > span').css("color", "#333");
          $('#signupButton').css("background-color", "#07364E");
          $('#signupButton > span').css("color", "white");
          //$('.left-panel').toggle(50);
          //$('.right-panel').toggle(100);
		  $('.left-panel').hide();
		  $('.right-panel').show();
		  $('.login-failed').hide();
    });
	
	//dialog box start
	
	$('#delete').on('click', function() {
		if(deleteChecklistId != ''){
			var obj =	JSON.parse(localStorage.getItem("checklists"));		
			var items = [];
			var checklistArray = obj.checklists;
			$.each(checklistArray, function(i, item){
				if(item.id != deleteChecklistId){
					items.push({id: item.id, title: item.title, category: item.category, items: item.items});
				}
			});
			obj.checklists = items;
			localStorage.setItem("checklists", JSON.stringify(obj));
			var $accountDeleteDialog = $('#confirm-delete'), transition;
			$accountDeleteDialog[0].close();
			$accountDeleteDialog.removeClass('dialog-scale');
			clearTimeout(transition);
			getExistingchecklist();			
		}
	});
	 
	$('#cancel').on('click', function() {
		var $accountDeleteDialog = $('#confirm-delete'), transition;
		$accountDeleteDialog[0].close();
		$accountDeleteDialog.removeClass('dialog-scale');
		clearTimeout(transition);
	});
	//dialog box end
	
	$('#saveChecklist').click(function(){
		var usrname;
		var items = [];
		var now = new Date();
		var title = $('#titleValue').val();
		var category = $('#select-picker').val();
		if(title == '' && category == 'selectCategory'){
			$('.error-meesage').show();
			$('#titleValue').css("border-color", "red");
			$('select').css("border-color", "red");
		}else if(category == 'selectCategory'){
			$('.error-meesage').show();
			$('select').css("border-color", "red");
			$('#titleValue').css("border-color", "#A6AFB7");
		}else if(title == ''){
			$('.error-meesage').show();
			$('#titleValue').css("border-color", "red");	
			$('select').css("border-color", "#A6AFB7");			
		}else{
			if(typeof(Storage) !== "undefined") {
				usrname = localStorage.getItem("usrName");
				$( ".todo" ).each(function( index ) {
					items.push($(this).text());
				});

				var obj =	JSON.parse(localStorage.getItem("checklists"));
				if(typeof(obj) != "undefined" && obj != null){
					obj.checklists.push(
						{id: now.getTime(), title: title, category: category, items: items}
					);
					localStorage.setItem("checklists", JSON.stringify(obj));
				}else{
					var saveObject = {
						username: usrname,
						password: '',
						checklists: [
							{
								id: now.getTime(),
								title: title,
								category: category,
								items: items
							}
						]
					}
					localStorage.setItem("checklists", JSON.stringify(saveObject));
				}
			}		
			getExistingchecklist();
			displaySelectedCategory();
		}
		//$('.list-group-item').text('All Checklist').toggleClass('active');
	});
	
	$('#updateChecklist').click(function(){
		var items = [];
		var usrname;
		if(typeof(Storage) !== "undefined") {
			usrname = localStorage.getItem("usrName");
			$( ".todo" ).each(function( index ) {
				items.push($(this).text());
			});

			var title = $('#titleValue').val();
			var category = $('#select-picker').val();

			var obj =	JSON.parse(localStorage.getItem("checklists"));		
			$.each(obj.checklists, function(i, item) {
				if(item.id == selectedChecklistId){
					item.title = title;
					item.category = category;
					item.items = items;
				}
			});	
		}
		localStorage.setItem("checklists", JSON.stringify(obj));
		getExistingchecklist();
		displaySelectedCategory();		
		//$('.list-group-item').text('All Checklist').toggleClass('active');
	});
	
	$('#cancelChecklist').click(function(){
		$('.checklist-center-section').show();
		$('.new-checklist-container').hide();
		$('.error-meesage').hide();
		$('#titleValue').css("border-color", "#A6AFB7");
		$('select').css("border-color", "#A6AFB7");
	});
		
	$('#loginButton').click(function(){	
	$('#username').val('');
	$('#password').val('');	
		 loginFunctionalty();
	});
	
	$('#register').click(function(){
		var usrName = $('#regusername').val();
		var pwd = $('#regpassword').val();
		var cnfpwd = $('#confPassword').val();
		console.log(usrName + " " +pwd+ " " + cnfpwd);
		if(pwd == cnfpwd ) {
		  console.log("Equal");
		  if(typeof(Storage) !== "undefined") {
			localStorage.setItem("usrName", usrName);
			localStorage.setItem("pwd", pwd);
			clearFormFields();
			loginFunctionalty();
			$('.login-success').show();							
		  }		  
		} else {
			$('.pwd-failed').show();
			clearFormFields();
			console.log("Not equal");
		}
	});
	
	$('.list-group-item').on('click', function() {
		var $this = $(this);
		var $alias = $this.data('alias');
		$('.active').removeClass('active');
		$this.toggleClass('active');
		clickedElement($this);
	});
	
	/* New checklist - start */
	
	$('#newChecklist').on('click', function() {
		$('#titleValue').val('');
		$('#select-picker').val('selectCategory');
		if((categoryName) != ''){			
			if(categoryName != 'All Checklist')
				$('#select-picker').val(categoryName);
		}
		$('.todo-wrap').remove();		
		$('.checklist-center-section').hide();
		$('.new-checklist-container').show();
		$('#saveChecklist').show();
		$('#updateChecklist').hide();
		$('.new-checklist-container').css('background-color', 'white');
	});
	
	// add items
	$('#add-todo').click(function(){
	  var lastSibling = $('#todo-list > .todo-wrap:last-of-type > input').attr('id');
	  var newId;
	  if(typeof(lastSibling) != 'undefined')
		newId = Number(lastSibling) + 1;
	  else
		newId = 1;
		  
	  $(this).before('<span class="editing todo-wrap"><input type="checkbox" id="'+newId+'"/><label for="'+newId+'" class="todo"><i class="fa fa-check"></i><input type="text" class="input-todo" id="input-todo'+newId+'"/></label></span>');
	  
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
		document.getElementById("globalsearchsection").scrollIntoView();
		//$(".globalsearchsection")[0].scrollintoview({ duration: "slow", direction: "y"})
	}); 

	$('#collapseGlobalSearch').click(function(){
		$('.up-arrow-image-section').css('display','none');
		$('.down-arrow-image-section').show();
		//$('.global-search-section').hide();
		document.getElementById("headerContainer").scrollIntoView();
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

function loginFunctionalty(){
	  $('#signupButton').css("background-color", "#ecf0f1");
	  $('#signupButton > span').css("color", "#333");
	  $('#loginButton').css("background-color", "#07364E");
	  $('#loginButton > span').css("color", "white");
	  //$('.left-panel').toggle(100);
	  //$('.right-panel').toggle(50);
	  $('.left-panel').show();
	  $('.right-panel').hide();	
}
function clearFormFields(){
	$('#regusername').val('');
	$('#regpassword').val('');
	$('#confPassword').val('');	
}

function getchecklist(){
	$('.checklist-center-section').show();
	$('.new-checklist-container').hide();
	$('.checklist-center-section').css('background-color', 'white');
	var title;
	var uniqueId;
	if(typeof(Storage) !== "undefined") {
		if(typeof(localStorage.getItem("checklists")) != 'undefined'){
		  var obj =	JSON.parse(localStorage.getItem("checklists"));		
			$.each(obj.checklists, function(i, item) {
				title = item.title;
				uniqueId =  item.id;
				appendChecklists(title, uniqueId);
			});		  
		}
	}
	console.log("UniqueId: "+uniqueId);
}

function clearLogInFormFields(){
	$('#username').val('');
	$('#password').val('');
	$('.login-success').hide();
	$('.login-failed').hide();
	$('.pwd-failed').hide();
	$('#regusername').val('');
	$('#regpassword').val('');
	$('#confPassword').val('');
}

function showEditScreen(listTitle, uniqueId){
	$('.error-meesage').hide();
	$('#titleValue').css("border-color", "#A6AFB7");
	$('select').css("border-color", "#A6AFB7");
	console.log('listTitle:' +listTitle.id);
	console.log('Title:' +uniqueId);
	selectedChecklistId = uniqueId;
	var storedtitle;
	var clickedItem = new Object();
	var storedCategory;
	$('.todo-wrap').remove();
	$('#saveChecklist').hide();
	$('#updateChecklist').show();
	if(typeof(Storage) !== "undefined") {
		if(typeof(localStorage.getItem("checklists")) != 'undefined'){
		  var obj =	JSON.parse(localStorage.getItem("checklists"));		
			$.each(obj.checklists, function(i, item) {
				if(uniqueId == item.id){
					storedtitle = item.title;
					clickedItem = item.items;
					storedCategory = item.category;	
				}				
			});		  
		}
	}
	console.log('Item: '+clickedItem);	
	$('.todo-wrap').remove();
	formExistingItems(clickedItem);	
	$('#titleValue').val(storedtitle);
	if(typeof (storedCategory) != "undefined")
		$('#select-picker').val(storedCategory);
	else
		$('#select-picker').val('selectCategory');

	$('.checklist-center-section').hide();
	$('.new-checklist-container').show();
	$('.new-checklist-container').css('background-color', 'white');
	
}

function formExistingItems(clickedItem){
	var count = 1;
	$.each(clickedItem, function( key, value ) {
		var parentSection = '<span class="todo-wrap">';
		var inputSection = '<input type="checkbox" id="'+(count)+'"/>';
		var labelSection = '<label for="'+count+'" class="todo"><i class="fa fa-check"></i>'+value+'</label>';
		var deleteSection = '<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span></span>';
		labelSection += deleteSection ;
		inputSection += labelSection;
		parentSection +=inputSection;
		count = count + 1;
		$(".category-dropdown").after(parentSection);
	});	
}

function getExistingchecklist(){
	
	$('.checklist-center-section').show();
	$('.new-checklist-container').hide();
	$('.checklist-center-section').css('background-color', 'transparent');
	$('.row').remove();
	var title;
	var uniqueId;
	if(typeof(Storage) !== "undefined") {
		if(typeof(localStorage.getItem("checklists")) != 'undefined'){
		  var obj =	JSON.parse(localStorage.getItem("checklists"));		
			$.each(obj.checklists, function(i, item) {
				title = item.title;
				uniqueId =  item.id;
				appendChecklists(title, uniqueId);
			});		  
		}
	}
}

function removeChecklist(uniqueId){
	deleteChecklistId = uniqueId;	
	var $accountDeleteDialog = $('#confirm-delete'), transition;	 
	$accountDeleteDialog[0].showModal();
	transition = window.setTimeout(function() {
		$accountDeleteDialog.addClass('dialog-scale');
	}, 0.5);
	
	//$('.col-md-4').remove();
}

function clickedElement($this) {
    console.log($this.text());
	categoryName = $this.text().trim();
	$('.checklist-center-section').show();
	$('.new-checklist-container').hide();
	$('.checklist-center-section').css('background-color', 'transparent');
	var storedtitle;
	var clickedItem = new Object();
	var storedCategory;
	var uniqueId;
	$('.row').remove();
	if(typeof(Storage) !== "undefined") {
		if(typeof(localStorage.getItem("checklists")) != 'undefined'){
		  var obj =	JSON.parse(localStorage.getItem("checklists"));		
			$.each(obj.checklists, function(i, item) {
				if($this.text().trim() == item.category || 'All Checklist' == $this.text().trim()){
					storedtitle = item.title;
					clickedItem = item.items;
					storedCategory = item.category;	
					uniqueId =  item.id;
					if(typeof(storedCategory) != "undefined"){
						appendChecklists(storedtitle, uniqueId);
						$('.checklist-center-section').css('background-color', 'white');
					}
				}				
			});		  
		}
	}	
}

function appendChecklists(storedtitle, uniqueId){
	
	var htmlSection ='';
	if($('.row > .col-md-4').length == 3 || $('.row > .col-md-4').length == 0)
		htmlSection = '<div class="row">';
	var col = '<div class="col-md-4" id = "'+uniqueId+'">'
	var panesection = '<div class="panel panel-default">';
	var panelHeading = '<div class="panel-heading">'+storedtitle+'<a href="#" onclick = "removeChecklist('+uniqueId+')" class="remove-link"><i class="fa fa-times remove-icon"></i></a></div>';
	var paneBody = '<a href="#" onclick = "showEditScreen('+storedtitle+','+uniqueId+');" id='+storedtitle+'><div class="panel-body"><img src="https://illinoiscaselaw.com/wp-content/uploads/checklist.png" alt="" class="img-responsive center-block" /></div></a></div>';
	if($('.row > .col-md-4').length == 3 || $('.row > .col-md-4').length == 0)
		var parentEndTag = '</div>';
	panelHeading += paneBody ;
	panesection += panelHeading
	col +=panesection;
	htmlSection += col;
	if($('.row > .col-md-4').length == 3 || $('.row > .col-md-4').length == 0)
		parentEndTag += htmlSection;
	$('.existing-checklist').show();
	if($('.row > .col-md-4').length == 3 || $('.row > .col-md-4').length == 0)
		$(".existing-checklist").append(htmlSection);
	else
		$(".row").append(htmlSection);
	
	$('.checklist-center-section').css('background-color', 'white');
}

function displaySelectedCategory(){
	
	if("Travel" == categoryName){
		$('#travel').trigger('click');
	}else if("Daily Activities" == categoryName){
		$('#dailyAct').trigger('click');
	} else if("Office/College" == categoryName){
		$('#offColl').trigger('click');
	} else if("Sports" == categoryName){
		$('#sports').trigger('click');
	} else if("Others" == categoryName){
		$('#others').trigger('click');
	} else{
		$('#allChecklist').trigger('click');
	}		
}