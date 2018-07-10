
module.exports = {
    hooks: {
    	
		init:function(){
			console.log('******* SINA INIT ***************');
		},		
        config: function(config) {
            config.styles = config.styles || config.pluginsConfig['theme-default'].styles;
            return config;
        }
        
    }
};


