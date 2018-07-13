var $ = require('jquery');

function tabNav() {
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
    gitbook.storage.set("navIndex",$(this).index());
}

// Bind all dropdown
function init() {
    $(document).on('click','.nav_wrap .nav', tabNav);
    
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


