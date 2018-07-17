var $ = require('jquery');

function tabNav() {
	
	//移动端移除 show 类
	hiddenAll();

	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	gitbook.storage.set("navIndex", $(this).index());
}

function showSearch() {
	console.log('*********toggle***********')
	$("#book-search-input").addClass('show');
}

function showNavWrap() {
	console.log('*********toggle***********'  + $(".nav_wrap"))
	$(".nav_wrap").addClass('show');
}

//隐藏所有 弹窗
function hiddenAll(e){
	$("#book-search-input").removeClass('show');
	$(".nav_wrap").removeClass('show');
}

// Bind all dropdown
function init() {
	
//	$("a").attr("target","_self");
	
	$(document).on('click', '.nav_wrap .nav', tabNav);

	//移动端事件
	$(document).on('click', '.sina_searchBox', showSearch);
	//移动端事件
	$(document).on('click', '.nav_trigger', showNavWrap);
	
	$(document).on('click','.book-body',hiddenAll);

	//页面跳转的时候 切换tab
	gitbook.events.on('page.change', function() {
		var curInex = gitbook.storage.get("navIndex");
		console.log(curInex);
		var $this = $('.nav_wrap .nav').eq(curInex);
		$this.siblings().removeClass("active");
		$this.addClass("active");
	});
}

module.exports = {
	init: init
};