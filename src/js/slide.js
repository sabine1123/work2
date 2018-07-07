var slider = {
	default: {
		current		: 0,	// index of current item
		autoplay	: false,// slideshow on / off
		interval	: 3500,  // time between transitions
		l_rOffset   : 250
	},
	init: function(options){
		this.options 		= $.extend( true, {}, this.default, options );

		// support for 3d / 2d transforms and transitions
		this.support3d		= Modernizr.csstransforms3d;
		this.support2d		= Modernizr.csstransforms;
		this.supportTrans	= Modernizr.csstransitions;

		this.$wrapper		= $('.banner_gallery');
		
		this.$items			= this.$wrapper.children('.items');
		this.itemsCount		= this.$items.length;
		// 切換
		this.$prev		= $('.prev');
		this.$next		= $('.next');

		// minimum of 3 items
		if( this.itemsCount < 3 ) {
			this.$prev.hide();
			this.$next.hide();
			return false;
		}	

		this.current		= this.options.current;

		this.isAnim			= false;

		this.$items.css({
			'opacity'	: 0,
			'visibility': 'hidden'
		});

		this.validate();
		
		this.layout();
		
		// load the events
		this.loadEvents();
		
		// slideshow
		if( this.options.autoplay ) {
			this.startSlideshow();		
		}
	},
	//檢查當前或傳入參數是否有誤
	validate: function() {
		if( this.options.current < 0 || this.options.current > this.itemsCount - 1 ) {
			this.current = 0;
		}	
	},
	layout: function() {				
		// current, left and right items
		this.setItems();
		
		// current item is not changed
		// left and right one are rotated and translated
		var leftCSS, rightCSS, currentCSS;
		var l_rOffset = this.options.l_rOffset;
		// console.log(l_rOffset);
		// 支援3D / 2D 判斷
		if( this.support3d && this.supportTrans ) {		
			leftCSS 	= {
				'-webkit-transform'	: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
				'-moz-transform'	: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
				'-o-transform'		: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
				'-ms-transform'		: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
				'transform'			: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)'
			};
			
			rightCSS	= {
				'-webkit-transform'	: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
				'-moz-transform'	: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
				'-o-transform'		: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
				'-ms-transform'		: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
				'transform'			: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)'
			};
			
			leftCSS.opacity		= 1;
			leftCSS.visibility	= 'visible';
			rightCSS.opacity	= 1;
			rightCSS.visibility	= 'visible';	

		}else if( this.support2d && this.supportTrans ) {			
			leftCSS 	= {
				'-webkit-transform'	: 'translate(-'+ l_rOffset +'px) scale(0.8)',
				'-moz-transform'	: 'translate(-'+ l_rOffset +'px) scale(0.8)',
				'-o-transform'		: 'translate(-'+ l_rOffset +'px) scale(0.8)',
				'-ms-transform'		: 'translate(-'+ l_rOffset +'px) scale(0.8)',
				'transform'			: 'translate(-'+ l_rOffset +'px) scale(0.8)'
			};
			
			rightCSS	= {
				'-webkit-transform'	: 'translate('+ l_rOffset +'px) scale(0.8)',
				'-moz-transform'	: 'translate('+ l_rOffset +'px) scale(0.8)',
				'-o-transform'		: 'translate('+ l_rOffset +'px) scale(0.8)',
				'-ms-transform'		: 'translate('+ l_rOffset +'px) scale(0.8)',
				'transform'			: 'translate('+ l_rOffset +'px) scale(0.8)'
			};
			
			currentCSS	= {
				'z-index'			: 999
			};
			
			leftCSS.opacity		= 1;
			leftCSS.visibility	= 'visible';
			rightCSS.opacity	= 1;
			rightCSS.visibility	= 'visible';		
		}
		
		this.$leftItm.css( leftCSS || {} );
		this.$rightItm.css( rightCSS || {} );
		
		this.$currentItm.css( currentCSS || {} ).css({
			'opacity'	: 1,
			'visibility': 'visible'
		}).addClass('dg-center');
		
	},
	setItems: function() {				
		this.$items.removeClass('dg-center');
		
		this.$currentItm	= this.$items.eq( this.current );
		this.$leftItm		= ( this.current === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$items.eq( this.current - 1 );
		this.$rightItm		= ( this.current === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$items.eq( this.current + 1 );
		
		if( !this.support3d && this.support2d && this.supportTrans ) {		
			this.$items.css( 'z-index', 1 );
			this.$currentItm.css( 'z-index', 999 );		
		}
		
		// next & previous items
		if( this.itemsCount > 3 ) {		
			// next item
			this.$nextItm		= ( this.$rightItm.index() === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$rightItm.next();
			this.$nextItm.css( this.getCoordinates('outright') );
			
			// previous item
			this.$prevItm		= ( this.$leftItm.index() === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$leftItm.prev();
			this.$prevItm.css( this.getCoordinates('outleft') );		
		}
		
	},
	loadEvents: function() {			
		var _self	= this;		
		this.$prev.on( 'click', function() {

			if( _self.options.autoplay ) {			
				clearTimeout( _self.slideshow );
				_self.options.autoplay	= false;			
			}			
			_self.navigate('prev');
			return false;			
		});
		
		this.$next.on( 'click', function() {

			if( _self.options.autoplay ) {			
				clearTimeout( _self.slideshow );
				_self.options.autoplay	= false;			
			}
			
			_self.navigate('next');
			return false;			
		});
		
		this.$items.on('webkitTransitionEnd transitionend OTransitionEnd',function() {
			// console.log("transitionend");
			// _self.$currentItm.addClass('dg-center');
			// _self.$items.removeClass('dg-transition');
			_self.isAnim	= false;
			
		});	
	},
	getCoordinates: function( position ) {	
		var l_rOffset = this.options.l_rOffset;			
		if( this.support3d && this.supportTrans ) {		
			switch( position ) {
				case 'outleft':
					return {
						'-webkit-transform'	: 'translateX(-350px) translateZ(-300px) rotateY(45deg)',
						'-moz-transform'	: 'translateX(-350px) translateZ(-300px) rotateY(45deg)',
						'-o-transform'		: 'translateX(-350px) translateZ(-300px) rotateY(45deg)',
						'-ms-transform'		: 'translateX(-350px) translateZ(-300px) rotateY(45deg)',
						'transform'			: 'translateX(-350px) translateZ(-300px) rotateY(45deg)',
						'opacity'			: 0,
						'visibility'		: 'hidden'
					};
					break;
				case 'outright':
					return {
						'-webkit-transform'	: 'translateX(350px) translateZ(-300px) rotateY(-45deg)',
						'-moz-transform'	: 'translateX(350px) translateZ(-300px) rotateY(-45deg)',
						'-o-transform'		: 'translateX(350px) translateZ(-300px) rotateY(-45deg)',
						'-ms-transform'		: 'translateX(350px) translateZ(-300px) rotateY(-45deg)',
						'transform'			: 'translateX(350px) translateZ(-300px) rotateY(-45deg)',
						'opacity'			: 0,
						'visibility'		: 'hidden'
					};
					break;
				case 'left':
					return {
						'-webkit-transform'	: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
						'-moz-transform'	: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
						'-o-transform'		: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
						'-ms-transform'		: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
						'transform'			: 'translateX(-'+ l_rOffset +'px) translateZ(-200px) rotateY(45deg)',
						'opacity'			: 1,
						'visibility'		: 'visible'
					};
					break;
				case 'right':
					return {
						'-webkit-transform'	: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
						'-moz-transform'	: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
						'-o-transform'		: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
						'-ms-transform'		: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
						'transform'			: 'translateX('+ l_rOffset +'px) translateZ(-200px) rotateY(-45deg)',
						'opacity'			: 1,
						'visibility'		: 'visible'
					};
					break;
				case 'center':
					return {
						'-webkit-transform'	: 'translateX(0px) translateZ(0px) rotateY(0deg)',
						'-moz-transform'	: 'translateX(0px) translateZ(0px) rotateY(0deg)',
						'-o-transform'		: 'translateX(0px) translateZ(0px) rotateY(0deg)',
						'-ms-transform'		: 'translateX(0px) translateZ(0px) rotateY(0deg)',
						'transform'			: 'translateX(0px) translateZ(0px) rotateY(0deg)',
						'opacity'			: 1,
						'visibility'		: 'visible'
					};
					break;
			};		
		}else if( this.support2d && this.supportTrans ) {		
			switch( position ) {
				case 'outleft':
					return {
						'-webkit-transform'	: 'translate(-350px) scale(0.7)',
						'-moz-transform'	: 'translate(-350px) scale(0.7)',
						'-o-transform'		: 'translate(-350px) scale(0.7)',
						'-ms-transform'		: 'translate(-350px) scale(0.7)',
						'transform'			: 'translate(-350px) scale(0.7)',
						'opacity'			: 0,
						'visibility'		: 'hidden'
					};
					break;
				case 'outright':
					return {
						'-webkit-transform'	: 'translate(350px) scale(0.7)',
						'-moz-transform'	: 'translate(350px) scale(0.7)',
						'-o-transform'		: 'translate(350px) scale(0.7)',
						'-ms-transform'		: 'translate(350px) scale(0.7)',
						'transform'			: 'translate(350px) scale(0.7)',
						'opacity'			: 0,
						'visibility'		: 'hidden'
					};
					break;
				case 'left':
					return {
						'-webkit-transform'	: 'translate(-'+ l_rOffset +'px) scale(0.8)',
						'-moz-transform'	: 'translate(-'+ l_rOffset +'px) scale(0.8)',
						'-o-transform'		: 'translate(-'+ l_rOffset +'px) scale(0.8)',
						'-ms-transform'		: 'translate(-'+ l_rOffset +'px) scale(0.8)',
						'transform'			: 'translate(-'+ l_rOffset +'px) scale(0.8)',
						'opacity'			: 1,
						'visibility'		: 'visible'
					};
					break;
				case 'right':
					return {
						'-webkit-transform'	: 'translate('+ l_rOffset +'px) scale(0.8)',
						'-moz-transform'	: 'translate('+ l_rOffset +'px) scale(0.8)',
						'-o-transform'		: 'translate('+ l_rOffset +'px) scale(0.8)',
						'-ms-transform'		: 'translate('+ l_rOffset +'px) scale(0.8)',
						'transform'			: 'translate('+ l_rOffset +'px) scale(0.8)',
						'opacity'			: 1,
						'visibility'		: 'visible'
					};
					break;
				case 'center':
					return {
						'-webkit-transform'	: 'translate(0px) scale(1)',
						'-moz-transform'	: 'translate(0px) scale(1)',
						'-o-transform'		: 'translate(0px) scale(1)',
						'-ms-transform'		: 'translate(0px) scale(1)',
						'transform'			: 'translate(0px) scale(1)',
						'opacity'			: 1,
						'visibility'		: 'visible'
					};
					break;
			};		
		}else {		
			switch( position ) {
				case 'outleft'	: 
				case 'outright'	: 
				case 'left'		: 
				case 'right'	:
					return {
						'opacity'			: 0,
						'visibility'		: 'hidden'
					};
					break;
				case 'center'	:
					return {
						'opacity'			: 1,
						'visibility'		: 'visible'
					};
					break;
			};
		}
	},
	navigate: function( dir ) {
		if( this.supportTrans && this.isAnim )
			return false;
			
		this.isAnim	= true;
		
		switch( dir ) {		
			case 'next' :				
				this.current	= this.$rightItm.index();
				
				// current item moves left
				this.$currentItm.addClass('dg-transition').css( this.getCoordinates('left') );
				
				// right item moves to the center
				this.$rightItm.addClass('dg-transition').css( this.getCoordinates('center') );	
				
				// next item moves to the right
				if( this.$nextItm ) {					
					// left item moves out
					this.$leftItm.addClass('dg-transition').css( this.getCoordinates('outleft') );
					
					this.$nextItm.addClass('dg-transition').css( this.getCoordinates('right') );
					
				}else {
					// left item moves right
					this.$leftItm.addClass('dg-transition').css( this.getCoordinates('right') );				
				}
				break;
				
			case 'prev' :			
				this.current	= this.$leftItm.index();
				
				// current item moves right
				this.$currentItm.addClass('dg-transition').css( this.getCoordinates('right') );
				
				// left item moves to the center
				this.$leftItm.addClass('dg-transition').css( this.getCoordinates('center') );
				
				// prev item moves to the left
				if( this.$prevItm ) {					
					// right item moves out
					this.$rightItm.addClass('dg-transition').css( this.getCoordinates('outright') );
				
					this.$prevItm.addClass('dg-transition').css( this.getCoordinates('left') );
					
				}else {				
					// right item moves left
					this.$rightItm.addClass('dg-transition').css( this.getCoordinates('left') );				
				}
				break;					
		};
		
		this.setItems();
		
		if( !this.supportTrans )
			this.$currentItm.addClass('dg-center');		
	},
	startSlideshow: function() {	
		var _self	= this;
		
		this.slideshow	= setTimeout( function() {				
			_self.navigate( 'next' );			
			if( _self.options.autoplay ) {			
				_self.startSlideshow();			
			}
		}, this.options.interval );	
	},
	destroy: function() {		
		this.$prev.off('click');
		this.$next.off('click');
		this.$items.off('webkitTransitionEnd transitionend OTransitionEnd');	
		if(this.options.autoplay){
			// console.log("clear");
			clearTimeout(this.slideshow);
		}
	}
}