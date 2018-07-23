var $ = require('jquery');
var gitbook = window.gitbook;

function tabNav() {

	//移动端移除 show 类
	hiddenAll();

	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	gitbook.storage.set("navIndex", $(this).index());
}

function showSearch() {
	$(".searchWrap").addClass('show');
	return false;
}

function showNavWrap() {
	$(".nav_wrap").addClass('show');
	return false;
}

//隐藏所有 弹窗
function hiddenAll(e) {
	$(".nav_wrap").removeClass('show');
}

function toggleIcon(e) {
	var status = gitbook.storage.get('sidebar', true);
	$(".btn_bar").toggleClass('close', status)
}

function cancelResult() {
	$('#book-search-results').removeClass('open');
	$("#book-search-input input").val("")
	$(".searchWrap").removeClass('show');
	return false;
}

// Bind all dropdown
function init() {
	window.onload = function() {}
	//底部logo
	$(".page-wrapper").append('<aside class="bottom_logn"></aside>');
	console.log($(".page-wrapper"))

	$(document).on('click', '.header_bar', toggleIcon);
	$(document).on('click', '.nav_wrap .nav', tabNav);

	//移动端事件
	$(document).on('touchstart', '.sinaTop .sina_searchBox', showSearch);
	$(document).on('touchstart', '.searchWrap .btn_cancel', cancelResult);
	$(document).on('touchstart', '.sinaTop .nav_trigger', showNavWrap);

	$(document).on('click', '.book-body', hiddenAll);

	//页面跳转的时候 切换tab
	gitbook.events.on('page.change', function() {
		var curInex = gitbook.storage.get("navIndex");
		console.log(curInex);
		var $this = $('.nav_wrap .nav').eq(curInex);
		$this.siblings().removeClass("active");
		$this.addClass("active");

		//如果该页面没有 底部logo
		var $page = $(".page-wrapper");
		if($page.children('.bottom_logn').length > 0) {
			return
		} else {
			$page.append('<aside class="bottom_logn"></aside>');
			console.log("*********************");
			console.log("添加bottom_login");
			console.log("*********************");
		}
	});
}

module.exports = {
	init: init
};