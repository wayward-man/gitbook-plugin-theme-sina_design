var $ = require('jquery');
var gitbook = window.gitbook;
var platform = require('./platform');

// Return true if sidebar is open
function isOpen() {
	return gitbook.state.$book.hasClass('with-summary');

}

//设置书签
function setSummary(curIndex) {

	var $dividers = $("li.divider");

	//curIndex = 0;
	var $page_Index = $("li.divider").eq(0).prevAll();
	var $page_Index_not = $("li.divider").eq(0).nextAll();

	//curIndex = 2;
	var $page_brand = $("li.divider").eq(1).nextAll();
	var $page_brand_not = $("li.divider").eq(1).prevAll();

	//curIndex  = 1;
	var $page_design = $("li.divider").eq(0).nextUntil("li.divider");
	var $page_design_not1 = $page_Index;
	var $page_design_not2 = $page_brand;

	var toggleSpeed = 0;

	$dividers.fadeOut(toggleSpeed / 10);
	if(curIndex == 0) {
		$page_Index.fadeIn(toggleSpeed);
		$page_Index_not.fadeOut(toggleSpeed / 10);
	} else if(curIndex == 1) {
		$page_design.fadeIn(toggleSpeed);
		$page_design_not1.fadeOut(toggleSpeed / 10);
		$page_design_not2.fadeOut(toggleSpeed / 10);
	} else if(curIndex == 2) {
		$page_brand.fadeIn(toggleSpeed);
		$page_brand_not.fadeOut(toggleSpeed / 10);
	}
}

//切换顶部 一级导航
function tabNav(e) {
	var curInex = $(this).index();
	//移动端移除 show 类
	hiddenAll();
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	gitbook.storage.set("navIndex", curInex);
	setSummary(curInex);
	e.stopPropagation();
}

function showSearch(e) {
	$("#book-search-input input").focus();
	$(".searchWrap").addClass('show');

	//出发tab 的时候，隐藏 侧栏
	if(platform.isMobile()) {
		toggleSidebar(false, true);
	}
	//	e.stopPropagation();
}

function showNavWrap(e) {
	$(".nav_wrap").addClass('show');
	e.stopPropagation();

	//出发tab 的时候，隐藏 侧栏
	if(platform.isMobile()) {
		toggleSidebar(false, true);
	}
}

//隐藏所有 弹窗
function hiddenAll() {
	$(".nav_wrap").removeClass('show');

}

function toggleIcon(e) {
	var status = gitbook.storage.get('sidebar', true);
	$(".btn_bar").toggleClass('close', status)
}

function cancelResult(event) {
	$('#book-search-results').removeClass('open');
	$("#book-search-input input").val("")
	$(".searchWrap").removeClass('show');
	event.stopPropagation();
}

function toggleInnerTab() {
	$('.fixedLink_wrap,.triangle').toggleClass("show");
	return false;
}

//控制侧栏的 拉开或者 展开
function toggleSidebar(_state, animation) {
	if(gitbook.state != null && isOpen() == _state) return;
	if(animation == null) animation = true;
	gitbook.state.$book.toggleClass('without-animation', !animation);
	gitbook.state.$book.toggleClass('with-summary', _state);
	gitbook.storage.set('sidebar', isOpen());

	//根据slidebar状态 显示不同的 icon
	toggleIcon();
}
//文章内导航

function tabInnerNav() {
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
}

function removePlaceholder() {
	$(this).attr('placeholder', '');
}

function showPlaceholder() {
	$(this).attr('placeholder', '输入并搜索');
}

// Bind all dropdown
function init() {

	if(!gitbook.storage.get("navIndex")){
		//初始化 一级目录
		gitbook.storage.set("navIndex", 1);
	}

	//底部logo
	$(".page-wrapper").append('<aside class="bottom_logn"></aside>');
	console.log($(".page-wrapper"))

	$(document).on('click', '.header_bar', toggleIcon);
	$(document).on('click', '.nav_wrap .nav', tabNav);

	//文章内导航
	$(document).on('blur', '.fixedLink a', tabInnerNav)

	//移动端事件
	$(document).on('touchend click', '.sinaTop .sina_searchBox', showSearch);
	$(document).on('touchend click', '.searchWrap .btn_cancel', cancelResult);
	$(document).on('touchend click', '.sinaTop .nav_trigger', showNavWrap);
	$(document).on('focus', '#book-search-input input', removePlaceholder)
	$(document).on('blur', '#book-search-input input', showPlaceholder)

	//控制文章内 导航显示与否
	$(document).on('touchend click', '.btn_summary', toggleInnerTab);

	$(document).on('click', '.book', hiddenAll);

	//页面跳转的时候 切换tab
	gitbook.events.on('page.change', function() {
		//给需要下载的链接 添加 新窗口打开
		$("a[download]").attr('target','_blank');
		
		
		//顶部导航
		var curInex = gitbook.storage.get("navIndex");
		var $this = $('.nav_wrap .nav').eq(curInex);
		$this.siblings().removeClass("active");
		$this.addClass("active");
		setSummary(curInex);

		var $headers = $("h2:header,h3:header,h4:header");
		var $fixedLink = $(".fixedLink");

		for(var i = 0; i < $headers.length; i++) {
			var inner = $headers.eq(i).html();
			var formateInner = inner.toLocaleLowerCase();
			var className = $headers[i].tagName;

			if(i === 0) {

				var strTop = '<a href="#' + formateInner + '" ></a>';

				$(".btn_toTop").append($(strTop));

				var str = '<a href="#' + formateInner + '" class="active ' + className + '" >' + inner + '</a> ';
			} else {
				var str = '<a href="#' + formateInner + '" class="' + className + '" >' + inner + '</a> ';
			}
			$fixedLink.append($(str));
		}

	});
}

module.exports = {
	init: init
};