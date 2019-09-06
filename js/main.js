$(document).ready(function () {
    var windowWidth = $(window).width();

    if ($(window).width() > 1366) {
        $('.rf-logomaker-hero').mousemove(function(event){
            var moveX = (($(window).width() / 4) - event.pageX) * 0.01;
            var moveY = (($(window).height() / 4) - event.pageY) * 0.01;
            $('.top-letters').css('left', moveX + 'px');
            $('.top-letters').css('top', moveY + 'px');
            $('.bottom-letters').css('right', moveX + 'px');
            $('.bottom-letters').css('bottom', moveY + 'px');
        });
    }

    $('.rf-watch-video-comp').click(function () {
        $('.popup-overlay').addClass('show');
        $('body').addClass('scroll-off');
    });
    $('.close-popup').click(function () {
        $('.popup-overlay').removeClass('show');
        $('body').removeClass('scroll-off');
    });
    $(document).on('click touchstart', function(event) {
        if ($(event.target).has('.popup').length) {
            $('.popup-overlay').removeClass('show');
            $('body').removeClass('scroll-off');
        }
    });
});


