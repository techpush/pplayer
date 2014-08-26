/**
 * bella.pplay.js
 * Photo Filming
 * Author by @ndaidong
 * GitHub : https://github.com/dongnd/bella-js
 * Copyright by *.bellajs.org
*/
;(function(){
	
	"use strict";
	
	var SPEED = 20;
	
	var baseDir = 'img/', player;
	var container, screen, width, height;
	
	var images = [], iindex = -1;

	function onbegin(){
		console.log('Begin');
		screen.innerHTML = '';
	}	
	function onend(){
		console.log('End');
		play(0);
	}

	function onstart(){
		console.log('1');
	}
	
	function getNextXY(x, y, tx, ty, direct){
		if(direct==1){
			x+=tx;
			y+=ty;
		}
		else if(direct==2){
			x+=tx;
			y-=ty;						
		}
		else if(direct==3){
			x-=tx;
			y+=ty;						
		}
		else if(direct==4){
			x-=tx;
			y-=ty;						
		}	
		return {x:x, y:y}
	}
	
	function makeScenario(src){
		var css = [
		  'top: {Y}px; left: {X}px; width: {W}px; height: {H}px;',
		  '-webkit-transform: scale(1) rotate({D}deg);',
		  '-moz-transform: scale(1) rotate({D}deg);',
		  '-ms-transform: scale(1) rotate({D}deg);',
		  '-o-transform: scale(1) rotate({D}deg);',
		  'transform: scale(1) rotate({D}deg);',
		  'background: #000 url('+src+') no-repeat center center;background-size:cover;',
		  'opacity: {O};',
		  'border-radius: {R}%;',
		].join('');
		
		var direction2D, direction3D, zval;
		
		var ran = Math.random()*100;
		if(ran>=50){
			direction3D = 1;
			zval = 3;
		}
		else{
			direction3D= 2;
			zval = 1;
		}
		var blur = 0, tranx = 0, trany = 0;
		var w = zval*width, h = zval*height;
				
		var ran = Math.random()*4;
		if(ran<1){
			direction2D = 1;
			tranx=-1*(w-width)/2;
			trany=-1*(h-height)/2;
		}
		else if(ran>=1&&ran<2){
			direction2D = 2;
			tranx=-1*(w-width)/2;
			trany=-1*height/2;
		}
		else if(ran>=2&&ran<3){
			direction2D = 3;
			tranx=-1*width/2;
			trany=-1*(h-height)/2;
		}
		else if(ran>=3&&ran<=4){
			direction2D = 4;
			tranx=-1*width/2;
			trany=-1*height/2;
		}
		
		var deg=0.1, rad=0;
		
		var s = css;
		s = s.replaceAll('{O}', blur);
		s = s.replaceAll('{X}', tranx);
		s = s.replaceAll('{Y}', trany);
		s = s.replaceAll('{W}', w);
		s = s.replaceAll('{H}', h);
		s = s.replaceAll('{D}', deg);
		s = s.replaceAll('{R}', rad);
		
		var el = Bella.dom.add('DIV', screen);		
		el.setAttribute('style', s);
		
		var o = blur;
		var k = zval;
		var x = tranx;
		var y = trany;
		var d = deg;
		var r = rad;
		
		var tx = 0, ty = 0, dk = 0;
		
		var ran = Math.random()*30;
		if(ran<3){
			dk=25;
		}
		else if(ran>=3&&ran<27){
			
		}
		else if(ran>27&&ran<=30){
			dk=-25;
		}
		
		var ran = Math.random()*100;
		if(ran<30){
			tx=0.5;
		}
		else if(ran>70){
			tx=-0.5;
		}

		var ran = Math.random()*100;
		if(ran<50){
			ty=0.5;
		}
		else if(ran>70){
			ty=-0.5;
		}
		
		var xk = Math.random()/1000;
		
		var move3DTimer, disappearing = false;
		
		var finish = function(){
			clearInterval(move3DTimer);
			el.destroy();			
		}
		
		if(direction3D===1){
			move3DTimer = setInterval(function(){
				if(!disappearing && o<1){
					o+=0.01;
					if(o>1){
						o=1;
					}					
				}
				o=Bella.number.round(o, 2);
				if(!!disappearing){
					if(o==0.8){
						playNext();
					}
					else if(o<0.5){
						d+=dk;
					}
				}
				zval = k;
				if(k<=1){
					finish();
				}
				else{
					k-= xk+0.001;
					var w = width*k, h = height*k;

					if(k<=1.15){
						disappearing = true;
						if(o>0){
							o-=0.01;
						}
						else{
							finish();
						}							
					}
					if(o<0){
						o=0;
					}
					
					var ne = getNextXY(x, y, tx, ty, direction2D);
					x = ne.x, y = ne.y;
					
					if(x>0){
						x=0;
					}
					if(y>0){
						y=0;
					}
					if(x<width-w){
						x=width-w;
					}
					if(y<height-h){
						y=height-h;
					}
					
					var s = css;
					s = s.replaceAll('{W}', w);
					s = s.replaceAll('{H}', h);
					s = s.replaceAll('{O}', o);
					s = s.replaceAll('{X}', x);
					s = s.replaceAll('{Y}', y);
					s = s.replaceAll('{D}', d);
					s = s.replaceAll('{R}', r);
					el.setAttribute('style', s);
				}
				blur = o;
			}, SPEED);			
		}
		else{
			
			move3DTimer = setInterval(function(){
				if(!disappearing && o<1){
					o+=0.01;
					if(o>1){
						o=1;
					}					
				}
				o=Bella.number.round(o, 2);
				if(!!disappearing){
					if(o==0.8){
						playNext();
					}
					else if(o<0.5){
						d+=dk;
					}
				}			
				zval = k;
				if(k>=3){
					finish();
				}
				else{
					k+= xk+0.001;
					var w = width*k, h = height*k;

					if(k>=1.85){
						disappearing = true;
						if(o>0){
							o-=0.01;
						}
						else{
							finish();
						}
					}
					if(o<0){
						o=0;
					}					
					
					var ne = getNextXY(x, y, tx, ty, direction2D);
					x = ne.x, y = ne.y;
										
					if(x>0){
						x=0;
					}
					if(y>0){
						y=0;
					}
					if(x<width-w){
						x=width-w;
					}
					if(y<height-h){
						y=height-h;
					}

					var s = css;
					s = s.replaceAll('{W}', w);
					s = s.replaceAll('{H}', h);
					s = s.replaceAll('{O}', o);
					s = s.replaceAll('{X}', x);
					s = s.replaceAll('{Y}', y);
					s = s.replaceAll('{D}', d);
					s = s.replaceAll('{R}', r);
					el.setAttribute('style', s);	
				}
				blur = o;
			}, SPEED);			
		}
	}
	
	function playNext(){
		var k = iindex+1;
		play(k);
	}
	
	
	function startPlaying(){
		onstart();
		var img = images[iindex];
		var src = !!img.src?img.src:baseDir+img.file;
		
		var pic = new Image();
		pic.onload = function(){
			makeScenario(src);
		}
		pic.src = src;
	}
	
	function play(k){
		if(k>=images.length){
			onend();
		}
		else{
			iindex = k;
			if(k===0){
				onbegin();
			}	
			startPlaying();	
			
			var kk = k+1;
			if(kk<images.length){
				var img = images[kk];
				var src = !!img.src?img.src:baseDir+img.file;
				var pic = new Image();
				pic.src = src;	
			}
		}
	}
	
	function render(){
		
		if(images.length>0){
							
			var inner = Bella.dom.add('DIV', container);
			inner.addClass('inner');
					
			var pic = new Image();
			pic.onload = function(){
	
				var img = images[0];
				var src = !!img.src?img.src:baseDir+img.file;
				var I = new Image();
				I.src = src;
								
				setTimeout(function(){
					var d1 = Bella.dom.add('DIV', inner);
					d1.addClass('message');
					var d2 = Bella.dom.add('SPAN', d1);
					d2.addClass('line');
					d2.innerHTML = 'Nothing here and now.';
					
					var f = Bella.dom.add('SPAN', inner);
					f.addClass('fullscreen');
					f.innerHTML = 'Click everywhere to enter fullscreen mode';
							
					setTimeout(function(){
						d2.addClass('black');
						var d3 = Bella.dom.add('SPAN', d1);
						d3.addClass('line');
						d3.innerHTML = 'Stop thinking!';
						setTimeout(function(){
							d3.addClass('violet');
							var d4 = Bella.dom.add('SPAN', d1);
							d4.addClass('line');
							d4.innerHTML = 'And listen to your spirit...';
							setTimeout(function(){
								d4.addClass('yellow');
								f.addClass('white');
								setTimeout(function(){
									player = Bella.dom.add('IFRAME');
									player.setAttribute('src', '//www.youtube.com/embed/videoseries?list=PL1AFC30D985F0BA95&autoplay=1&loop=1');
									play(0);
								}, 3e3);
							}, 3e3);			
						}, 3e3);
					}, 3e3);
				}, 3e3);
			}
			pic.src = 'img/peaceful-moment.png';
						
			screen = inner;
		}
	}
	
	var pplayer = {
		assign : function(el, options){
			var opts = options || {};
			
			if(!!opts.baseDir){
				baseDir = opts.baseDir;
			}
			
			width = opts.width || 600;
			height = opts.height || 400;
			
			container = Bella.element(el);
			if(!opts.width && !opts.height){
				var ws = Bella.getWindowSize();
				width = ws.w, height = ws.h;
				Bella.setOnresizeCallback(function(){
					var ws = Bella.getWindowSize();
					width = ws.w, height = ws.h;
					container.setSize(width, height);
				});
			}
			container.setSize(width, height);
		},
		attach : function(arr){
			arr.forEach(function(item){
				images.push(item);	
			});
		},
		render : render
	}
	Bella.pplayer = pplayer;
})();
