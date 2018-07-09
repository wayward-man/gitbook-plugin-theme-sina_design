var moment = require('moment');
module.exports = {
	hooks: {
		config: function(config) {
			config.styles = config.styles || config.pluginsConfig['theme-default'].styles;

			return config;
		},
		'page:before': function(page) {

			console.log("*************************************");
			console.log("*************************************");
			console.log("*************************************");
			console.log("*************************************");

			console.log(this.options);

			console.log("*************************************");
			console.log("*************************************");
			console.log("*************************************");

			var  _copy = 'powered by Gitbook'
			if(this.options.pluginsConfig['sina_disign']) {
			   _copy = this.options.pluginsConfig['sina_disign']['copyright'];
			}
			var _copyInner = '<span class="copyright">' + _copy + '</span>';
			
			var str = ' \n<footer class="page-footer">' + _copyInner + '</footer>';
			
			page.content  +=  str;
			return page;

		}
	},
	filters: {
		date: function(d, format) {
			return moment(d).format(format)
		}
	}
};