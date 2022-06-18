(function ($) {

	"use strict";
	var fullHeight = function () {

		$('.js-fullheight').css('height', $('.start').height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $('.start').height());
		});

	};
	fullHeight();

	var carousel = function () {
		$('.home-slider').owlCarousel({
			loop: true,
			autoplay: true,
			margin: 0,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: true,
			dots: false,
			autoplayHoverPause: false,
			items: 1,
			navText: [],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});

	};
	carousel();

})(jQuery);

$(window).on('load', function (event) {
	$('body').removeClass('preloading');
	// $('.load').delay(1000).fadeOut('fast');
	$('.loader').delay(1000).fadeOut('fast');
});

//$('.item-cus').hover(function(){
//	$('#desc').removeClass('editp');
//},function(){
//	$('#desc').addClass('editp');
// });

$(document).ready(function () {
	$('#ToSignup').on('click', function () {
		$('#bgr-img').addClass('signup-tag');
		$('#bgr-img').removeClass('signin-tag');
	});
	$('#ToSignin').on('click', function () {
		$('#bgr-img').addClass('signin-tag');
		$('#bgr-img').removeClass('signup-tag');
	});

	$('#continue1').on('click', function () {
		var firstname = document.getElementById('firstname').value;
		var lastname = document.getElementById('lastname').value;
		var school = document.getElementById('school').value;
		if (firstname !== '' && lastname !== '' && school !== '') {
			$('#welcome-1').addClass('display-tag');
			$('#wel-you').html('Chào mừng ' + lastname);
		}
	});
	$('#back').on('click', function () {
		if (firstname !== '' && lastname !== '' && school !== '') {
			$('#welcome-1').removeClass('display-tag');
			$('#welcome-1').addClass('hidden-tag');
		}
	});

	$('#before-btn').click(function (event) {
		var bfquestion = $('.slilde-active').prev();
		$('.result').text('Đáp án');
		console.log(bfquestion.length);
		if (bfquestion.length != 0) {
			$('.slilde-active').addClass('hidden-right').one('webkitAnimationEnd', function (event) {
				$('.hidden-right').removeClass('hidden-right').removeClass('slilde-active');
			});
			bfquestion.addClass('slilde-active').addClass('moveToLeft').one('webkitAnimationEnd', function (event) {
				$('.moveToLeft').removeClass('moveToLeft');
			});
		} else {
			$('.slilde-active').addClass('hidden-right').one('webkitAnimationEnd', function (event) {
				$('.hidden-right').removeClass('hidden-right');
			});
			$('.l-question-js:first-child').addClass('slilde-active').addClass('moveToLeft').one('webkitAnimationEnd', function (event) {
				$('.moveToLeft').removeClass('moveToLeft').removeClass('slilde-active');
			});
		}
	});

	$('#next-btn').click(function (event) {
		var nextquestion = $('.slilde-active').next();
		$('.result').text('Đáp án');
		console.log(nextquestion.length);
		if (nextquestion.length != 0) {
			$('.slilde-active').addClass('hidden-left').one('webkitAnimationEnd', function (event) {
				$('.hidden-left').removeClass('hidden-left').removeClass('slilde-active');
			});
			nextquestion.addClass('slilde-active').addClass('moveToRight').one('webkitAnimationEnd', function (event) {
				$('.moveToRight').removeClass('moveToRight');
			});
		} else {
			$('.slilde-active').addClass('hidden-left').one('webkitAnimationEnd', function (event) {
				$('.hidden-left').removeClass('hidden-left');
			});
			$('.l-question-js:last-child').addClass('slilde-active').addClass('moveToRight').one('webkitAnimationEnd', function (event) {
				$('.moveToRight').removeClass('moveToRight').removeClass('slilde-active');
			});
		}

	});
	$('#next-btn-learn').click(function (event) {
		var nextquestion = $('.slilde-active').next();
		console.log(nextquestion.length);
		if (nextquestion.length != 0) {
			$('.slilde-active').addClass('hidden-left').one('webkitAnimationEnd', function (event) {
				$('.hidden-left').removeClass('hidden-left').removeClass('slilde-active');
			});
			nextquestion.addClass('slilde-active').addClass('moveToRight').one('webkitAnimationEnd', function (event) {
				$('.moveToRight').removeClass('moveToRight');
			});
		} else {
			$('.slilde-active').addClass('hidden-left').one('webkitAnimationEnd', function (event) {
				$('.hidden-left').removeClass('hidden-left');
			});
			$('.l-question-js:first-child').addClass('slilde-active').addClass('moveToRight').one('webkitAnimationEnd', function (event) {
				$('.moveToRight').removeClass('moveToRight');
			});
		}
		$('#next-btn-learn').addClass('hidden-cus');
		$('#noti-q').addClass('hidden-cus');
		var ans = document.getElementById('answer-js');
		var a_l = ans.getElementsByClassName('js-a');
		for (i = 0; i < a_l.length; i++) {
			console.log(a_l.item(i));
			a_l.item(i).classList.remove('correct');
			a_l.item(i).classList.remove('incorrect');
		}

	});

	$('.show-add-major').on('click', function () {
		$('.new-major').addClass('active-1');

	});

	$('.new-closed').on('click', function () {
		$('.new-major').removeClass('active-1');
	});

	$('.show-add-subb').on('click', function () {
		$.ajax({
			type: 'GET',
			url: '/ShowAddSubject/all',
			success: (data) => {
				console.log(data);
				var listMajor = document.getElementById('listMajorr');
				listMajor.innerHTML = '';
				data.forEach(element => {
					listMajor.innerHTML += '<option value="' + element.majorID + '">' + element.majorID + ' - ' + element.majorName + '</option>'
				});

			}
		});
		$('.new-subject').addClass('active-1');
	});

	$('.show-add-sub').on('click', function () {
		var id = document.getElementById('IDM').value;
		$.ajax({
			type: 'GET',
			url: '/ShowAddSubject/' + id,
			success: (data) => {
				console.log(data);
				var listMajor = document.getElementById('listMajorr');
				listMajor.innerHTML = '';
				data.forEach(element => {
					listMajor.innerHTML += '<option value="' + element.majorID + '">' + element.majorID + ' - ' + element.majorName + '</option>'
				});

			}
		});
		$('.new-subject').addClass('active-1');
	});

	$('.new-sub-closed').on('click', function () {
		$('.new-subject').removeClass('active-1');
	});

	$('#listMajorrr').change(() => {
		var valueM = document.getElementById('listMajorrr').value;
		console.log(valueM);
		$.ajax({
			type: 'GET',
			url: '/ShowSubject/' + valueM,
			success: (data) => {
				console.log(data);
				var listMajor = document.getElementById('listSubb');
				listMajor.innerHTML = '<option value="'+valueM+'">-- Chưa chọn --</option>';
				data.forEach(element => {
					listMajor.innerHTML += '<option value="'
						+ element.subjectID + '">'
						+ element.subjectID + ' - '
						+ element.subjectName + '</option>'
				});

			}
		});
	});

	$('.show-add-ex').on('click', function () {
		$.ajax({
			type: 'GET',
			url: '/ShowAddSubject/all',
			success: (data) => {
				console.log(data);
				var listMajor = document.getElementById('listMajorrr');
				listMajor.innerHTML = '<option value="OD">-- Chưa chọn --</option>';
				var listMajorr = document.getElementById('listSubb');
				listMajorr.innerHTML = '<option value="OD">-- Thư mục gốc --</option>';
				data.forEach(element => {
					listMajor.innerHTML += '<option value="' 
					+ element.majorID + '">' 
					+ element.majorID + ' - ' 
					+ element.majorName + '</option>'
				});

			}
		});
		$('.new-ex').addClass('active-1');
	});

	$('.new-ex-closed').on('click', function () {
		$('.new-ex').removeClass('active-1');
	});

	$('.show-add-quiz').on('click', function () {
		$('.new-quiz').addClass('active-1');
	});

	$('.new-quiz-closed').on('click', function () {
		$('.new-quiz').removeClass('active-1');
	});

	$('.show-setting-test').on('click', function () {
		$('.setting-test').addClass('active-1');
	});

	$('.setting-closed').on('click', function () {
		$('.setting-test').removeClass('active-1');
	});

	$('.delete-quizz').on('click', function () {
		$('.delete-quiz').addClass('active-1');
	});

	$('.delete-closed').on('click', function () {
		$('.delete-quiz').removeClass('active-1');
	});

	$('.submit-quizz').on('click', function () {
		$('.submit-quiz').addClass('active-1');
	});

	$('.submit-closed').on('click', function () {
		$('.submit-quiz').removeClass('active-1');
	});

	$('.edit-quizz').on('click', function () {
		$('.edit-quiz').addClass('active-1');
	});

	$('.edit-quiz-closed').on('click', function () {
		$('.edit-quiz').removeClass('active-1');
	});

	$('.edit-namee').on('click', function () {
		$('.edit-name').addClass('active-1');
	});

	$('.edit-name-closed').on('click', function () {
		$('.edit-name').removeClass('active-1');
	});

	$('.edit-passs').on('click', function () {
		$('.edit-pass').addClass('active-1');
	});

	$('.edit-pass-closed').on('click', function () {
		$('.edit-pass').removeClass('active-1');
	});

	$('#all-q').on('click', function () {
		var q = document.getElementById('quizs');
		var input_q = q.getElementsByTagName('input');
		//console.log($('#all-q').checked())
		if ($('#all-q').prop("checked")) {
			for (i = 0; i < input_q.length; i++) {
				input_q.item(i).checked = true;
			}
		} else {
			for (i = 0; i < input_q.length; i++) {
				input_q.item(i).checked = false;
			}
		}

	});

	$('.add-ans-js').on('click', function () {
		var listAnswer = document.getElementsByClassName('list-ans');
		var list = listAnswer.item(0);
		var l = list.getElementsByClassName('ans');
		i = l.length + 1;
		$('#ans' + i).addClass('ans').removeClass('dp-none');
		console.log(i);
	});

	$('.changeAVT').hover(() => {
		if ($('#changeAvt').hasClass('dp-none')) {
			$('#changeAvt').removeClass('dp-none');
		} else {
			$('#changeAvt').addClass('dp-none');
		}

		console.log('test');
	});
});

function showAnswer(answer) {
	$('.result').text(answer);
}

function aFlag(param, id) {
	if (param.classList.contains('btn-primary')) {
		param.classList.remove('btn-primary');
		param.classList.add('btn-danger');
		param.innerHTML = 'Gỡ cờ';
	} else {
		param.classList.remove('btn-danger');
		param.classList.add('btn-primary');
		param.innerHTML = 'Gắn cờ';
	}
}

function fillAnswer(param, a) {

	if (param.classList.contains('correct-ans')) {
		document.getElementById(a).classList.add('correct');
		$('#noti-q').text('Câu trả lời chính xác');
	} else {
		document.getElementById(a).classList.add('incorrect');
		$('#noti-q').text('Hãy thử lại nhé!');
	}

	var ans = document.getElementById('answer-js');
	var a_l = ans.getElementsByClassName('js-a');

	$('#noti-q').removeClass('hidden-cus');
	$('#next-btn-learn').removeClass('hidden-cus');

}

function choose(param, stt) {
	var p = document.getElementById('q' + stt);
	var p1 = p.getElementsByTagName('a');
	console.log(p1.length);
	//console.log(p1.item(4));
	for (i = 0; i < p1.length; i++) {
		if (p1.item(i) === param) {
			if (p1.item(i).classList.contains('choosed-answer')) {
				param.classList.remove('choosed-answer');
				$('#n-q-' + stt).removeClass('choosed-answer');
			} else {
				param.classList.add('choosed-answer');
				$('#n-q-' + stt).addClass('choosed-answer');
			}
		} else {
			p1.item(i).classList.remove('choosed-answer');
		}
	}


}

function returnback1() {
	document.getElementById('welcome-1').style.display = 'none';
	document.getElementById('welcome-2').classList.add('display-tag');
}