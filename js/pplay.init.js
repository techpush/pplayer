/**
 * pplay.init.js
 * Author by @ndaidong
 * GitHub : https://github.com/dongnd/bella-js
 * Copyright by *.bellajs.org
*/

Bella.setOnloadCallback(function(){
	
	Bella.pplayer.assign('pplay');
	Bella.pplayer.attach([
		{title: '', file: 'cloudy_world-wide.jpg'},	
		{title: '', file: 'French-fields.jpg'},	
		{title: '', file: 'fields-countryside-france-2.jpg'},	
		{title: '', file: 'Alpes.jpg'},	
		{title: '', file: 'himalaya.jpg'},
		{title: '', file: 'best_of_nature_widescreen-1920x1200.jpg'},
		{title: '', file: 'snow_wonderland-1440x900.jpg'},
		{title: '', file: 'autumn_breeze-2560x1440.jpg'},
		{title: '', file: 'swedish_fields-1440x900.jpg'},		
		{title: '', file: 'mount_pilatus_switzerland-1440x900.jpg'},		
		{title: '', file: 'In_the_beginning.jpg'},
		{title: '', file: 'derelict_house-wide.jpg'},
		{title: '', file: 'hawaii-wide.jpg'},
		{title: '', file: 'virgin_land-wide.jpg'},
		{title: '', file: 'Nice-Spring-Flowers-Pictures-And-Wallpapaers.jpg'},
		{title: '', file: 'Spring-Mountain-View-HD-Wallpaper.jpg'},
		{title: '', file: 'spring-landscape-photography.jpg'},
		{title: '', file: '1919.jpg'},
		{title: '', file: 'winter.jpg'},
		{title: '', file: 'dusk_mountains-1440x900.jpg'},
		{title: '', file: 'death_valley_sunset_dunes-1440x900.jpg'},
		{title: '', file: 'uphill_road-1440x900.jpg'},
		{title: '', file: 'snowy_alps-1440x900.jpg'},
		{title: '', file: 'mount_pilatus-1440x900.jpg'},
		{title: '', file: 'swiss_alps_night_sky-1440x900.jpg'},
		{title: '', file: 'purple_winter_sunset-1440x900.jpg'},
		{title: '', file: 'great_landscape-1366x768.jpg'},
		{title: '', file: 'french_mountains-1440x900.jpg'},
		{title: '', file: 'lighthouse_sunset-1440x900.jpg'},
	]);
	
	Bella.pplayer.render();
	
	function enableFullscreen(){
		var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !==null) || (document.mozFullScreen || document.webkitIsFullScreen);

		var docElm = document.documentElement;
		if (!isInFullScreen){
			if (docElm.requestFullscreen){
				docElm.requestFullscreen();
			}
			else if (docElm.mozRequestFullScreen){
				docElm.mozRequestFullScreen();
			}
			else if (docElm.webkitRequestFullScreen){
				docElm.webkitRequestFullScreen();
			}
		}
	}
	Bella.listen(document, 'click', enableFullscreen);
});

