$(function () {

	var audio;



	//Hide Pause
	$('#pause').hide();

	//Initialize the audio player with the first soundtrack
	initAudio($('#playlist li:first-child'));

	function initAudio(element) {
		var song = element.attr('song');
		var cover = element.attr('cover');
		var temp = parseFloat($('#volume-slider').val() / 100);


		//Create audio object
		audio = new Audio('http://archive.org/download/KayrayReadsToYou2/' + song);


		audio.volume = temp;

		audio.addEventListener("loadedmetadata", function () {
			minutes = parseInt(audio.duration / 60);
			seconds = parseInt(audio.duration % 60);

			if (seconds < 10) {
				seconds = '0' + seconds;
			};
			if (minutes < 10) {
				minutes = '0' + minutes;
			};

			$('#duration').html(minutes + ':' + seconds);

		});

		audio.addEventListener('ended', function () {
			if (count > 0) {
				var next = $('#playlist li.active').next();
				if (next.length == 0) {
					next = $('#playlist li:first-child');
				}
				initAudio($(next));
				audio.play();
				showCurrentTime();
			}
		});



		$('#duration').text();
		//Insert song cover. 
		//NOTE: the src path below is relative to the 
		//html file location not this js file location.
		$('img.cover').attr('src', '../media/hobbit/' + cover);
		$('#playlist li').removeClass('active');
		element.addClass('active');
	};


	//@Main buttons code

	$('#play').click(function () {
		audio.play();
	
		$("#play").hide();
		$("#pause").show();

		showCurrentTime();
		//audio.volume = parseFloat(this.value);
	});

	$('#pause').click(function () {
		audio.pause();
		$("#pause").hide();
		$("#play").show();
	});


	$('#next').click(function () {
		audio.pause();
		var next = $('#playlist li.active').next();

		if (next.length == 0) {
			next = $('#playlist li:first-child');
		}
		
		initAudio(next);
		audio.play();
		showCurrentTime();
	});

	$('#prev').click(function () {
		audio.pause();
		var prev = $('#playlist li.active').prev();
		if (prev.length == 0) {
			prev = $('#playlist li:last-child');
		}
	
		initAudio(prev);
		audio.play();
		showCurrentTime();
	
	});

	//@end

	//@Playlist song click
	$('#playlist li').click(function () {

		audio.pause();
		initAudio($(this));
		$('#play').hide();
		$('#pause').show();
		audio.play();
		showCurrentTime();
	});

	//@end


	//@Volume control

	$('#volume-slider').change(function () {
		audio.volume = parseFloat($('#volume-slider').val() / 100);
	});

	//@end




	//@Show the track's current time in minutes and seconds
	//and animate the progress bar

	function showCurrentTime() {

		$(audio).bind('timeupdate', function () {


			var minutes = parseInt(audio.currentTime / 60) % 60;
			var seconds = parseInt(audio.currentTime % 60);

			if (minutes < 10) {
				var minutes = '0' + minutes;
			}

			if (seconds < 10) {
				var seconds = '0' + seconds;
			}


			$('#current-time').html(minutes + ':' + seconds);

			var value = 0;

			if (audio.currentTime > 0) {
				value = Math.floor((100 / audio.duration) * audio.currentTime);
			}
			$('#seeker').css('width', value + '%');
		});

	}

	//@end
});



