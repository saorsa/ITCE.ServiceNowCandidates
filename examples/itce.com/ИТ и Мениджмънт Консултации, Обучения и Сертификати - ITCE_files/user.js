$(function() {
	var constants = {
		'login_base_url': 'https://www2.itce.com/SitePages/LoginOrSignUp.aspx?openMode=authenticate',
		'register_base_url': 'https://www2.itce.com/SitePages/LoginOrSignUp.aspx?openMode=WPreg',
		'logout_base_url': 'https://www2.itce.com/SitePages/LoginOrSignUp.aspx?openMode=logout',
        'pwdreset_base_url': 'https://www2.itce.com/SitePages/LoginOrSignUp.aspx?openMode=pwdForgot',
        'auth_base_url': 'https://www.itce.com/auth.php',
        'switch_lang_base_url': 'https://www.itce.com/lang.php',
        'rem_auth_base_url': 'https://www.itce.com/?logout=1'
	};

    function add_lcid(url) {
        return url + '&lcid=' + strings.lcid;
    }

    $('#form-login input[type="text"], #form-login input[type="email"], #form-login input[type="password"], #form-register input[type="text"], #form-register input[type="email"], #form-register input[type="password"]').keyup(function(e) {
    	var val = $(this).val();
    	val     = val.replace(/[а-яА-Я]/gi, '');
    	$(this).val(val);
    });
	
	$('.side-title-toggle').on('click', function(e) {
		e.preventDefault();
		
		if($(this).hasClass('active')) {
			return false;
		}
		
		$('.side-title-toggle').removeClass('active');
		$(this).addClass('active');
		
		var toggle = $($(this).attr('data-toggle'));
		$('#user_info').hide();

		$('.form-toggle').slideUp();
		toggle.slideDown();
	});

    //$('#language-switcher span').click(function(e) {
    //    e.preventDefault();
    //    var frame = document.getElementById('itce_main_frame');
    //    var langid = parseInt($(this).attr('data-langid'));
    //
    //    frame.contentWindow.ChangeMUI(langid);
    //});
		    
	// $('#language-switcher span').click(function(e) {
	// 	e.preventDefault();

 //        if(typeof lang_id == 'undefined' || lang_id == false) {
 //            lang_id = $(this).attr('data-langid');
 //            href    = $(this).parent('a').attr('href');
 //        }

 //        $.ajax({
 //            url: constants.switch_lang_base_url,
 //            type: 'POST',
 //            data: {lcid: lang_id},
 //            success: function() {
 //                $.ajax({
 //                    url: 'https://www-tl.itce.com/',
 //                    type: 'GET',
 //                    xhrFields: {
 //                        withCredentials: true
 //                    },
 //                    crossDomain: true,
 //                    success: function(html) {
 //                        window.location = href;
 //                    }
 //                });
 //            }
 //        });
	// });

    $('#user_logout').click(function(e) {
        e.preventDefault();

        var that    = $(this);
        var refresh = document.location.toString().toLowerCase();

        $.ajax({
            url: constants.rem_auth_base_url,
            success: function() {
                $.ajax({
                    url: constants.logout_base_url,
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function() {
                        window.location = constants.rem_auth_base_url;
                    }
                });
            }
        });
    });
	
	$('#form-login').submit(function(e) {
		e.preventDefault();
		
		var that = $(this);
		var data = that.serializeArray();
        var p = {};
		
		var refresh   = document.location.toString().toLowerCase();
				
		var base_url  = constants.login_base_url;
		var login_url = base_url;
		
		var error_field = that.find('#login_error');
		
		for(var k in data) {
            if(data[k]['name'] == 'un') {
                p.username = data[k]['value'];
            }
            if(data[k]['name'] == 'pwd') {
                p.password = data[k]['value'];
            }

			login_url += '&' + data[k]['name'] + '=' + data[k]['value'];
		}

        $.ajax({
            url: constants.auth_base_url,
            type: 'POST',
            data: {username: p.username, password: p.password},
            beforeSend: function() {
                error_field.html('');
                error_field.hide();
                that.find('button[type="submit"]').attr('disabled', true);
                that.find('button[type="submit"] i').removeClass('icon-arrow-right');
                that.find('button[type="submit"] i').addClass('icon-clock');
            },
            success: function(html) {
                $.ajax({
                    url: add_lcid(login_url),
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function(html, status, xhr) {
                        var msg = $.parseJSON(html);
                        that.find('button[type="submit"]').removeAttr('disabled');
                        if(msg.status == true) {
                            window.location = refresh;
                        }
                        else {
                            that.find('input[type="password"]').val('');
                            error_field.show();
                            error_field.html(strings.error_authentication_invalid);
                            that.find('button[type="submit"] i').addClass('icon-arrow-right');
                            that.find('button[type="submit"] i').removeClass('icon-clock');
                        }
                    },
                    error: function() {
                        that.find('button[type="submit"]').removeAttr('disabled');
                        that.find('button[type="submit"] i').addClass('icon-arrow-right');
                        that.find('button[type="submit"] i').removeClass('icon-clock');

                        error_field.show();
                        error_field.html(strings.error_generic_server_error);
                    }
                });
            },
            error: function() {
                that.find('button[type="submit"]').removeAttr('disabled');
                error_field.show();
                error_field.html(strings.error_generic_server_error);
            }
        });
	});
	
	$('#form-register').submit(function(e) {
		e.preventDefault();
		
		var that = $(this);
		var data = that.serializeArray();
		
		var base_url = constants.register_base_url;
		var reg_url  = base_url;
		
		for(var k in data) {
			var t_n = data[k]['name'];
			var t_v = data[k]['value'];
			
			if(t_n == 'stn' && t_v != 'true') {
				t_v = 'false';
			}
			
			reg_url += '&' + t_n + '=' + t_v;
		}
		
		var error_field = that.find('#register_error');
        $('#password_reg_error').hide();

        var pwd1 = that.find('input[name="pwd"]');
        var pwd2 = that.find('input[name="conf_pwd"]');

        if((pwd1 != undefined && pwd2 != undefined) && (pwd1.val() == pwd2.val()))
        {
            $.ajax({
                url: add_lcid(reg_url),
                type: 'GET',
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                beforeSend: function() {
                    error_field.html('');
                    error_field.hide();
                    that.find('button[type="submit"]').attr('disabled', true);
                    that.find('button[type="submit"] i').removeClass('icon-arrow-right');
                    that.find('button[type="submit"] i').addClass('icon-clock');

                },
                success: function(html) {
                    var msg = $.parseJSON(html);
                    if(msg.status == true) {
                        $('#form-register').hide();

                        $('#form-register input[type="email"], #form-register input[type="password"], #form-register input[type="text"]').val('');
                        $('#form-register input[type="checkbox"]').removeAttr('checked');

                        $('#user_info').show();
                        $('#user_info_text').html(strings.registration_success);
                    }
                    else {
                        error_field.html(msg.message);
                        error_field.show();
                    }
                    that.find('button[type="submit"]').removeAttr('disabled');
                    that.find('button[type="submit"] i').addClass('icon-arrow-right');
                    that.find('button[type="submit"] i').removeClass('icon-clock');
                },
                error: function() {
                    that.find('button[type="submit"]').removeAttr('disabled');
                    that.find('button[type="submit"] i').addClass('icon-arrow-right');
                    that.find('button[type="submit"] i').removeClass('icon-clock');
                }
            });
        }
        else
        {
            $('#password_reg_error').html(strings.passwords_dont_match);
            $('#password_reg_error').show();
            return;
        }
	});

    $('#form-pwdreset').submit(function(e) {
        e.preventDefault();

        var that = $(this);
        var data = that.serializeArray();

        var base_url = constants.pwdreset_base_url;
        var reg_url = base_url;

        for (var k in data) {
            var t_n = data[k]['name'];
            var t_v = data[k]['value'];

            reg_url += '&' + t_n + '=' + t_v;
        }

        $.ajax({
            url: add_lcid(reg_url),
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function () {
                $('#user_info').hide();
                $('#user_info_text').html('');

                that.find('button[type="submit"]').attr('disabled', true);
                that.find('button[type="submit"] i').removeClass('icon-arrow-right');
                that.find('button[type="submit"] i').addClass('icon-clock');
            },
            success: function (html) {
                var msg = $.parseJSON(html);
                if (msg.status == true) {
                    $('#form-pwdreset').hide();

                    $('#user_info').show();
                    $('#user_info_text').html(msg.message);
                }
                else {
                    $('#user_info').show();
                    $('#user_info_text').html(msg.message);
                }
                that.find('button[type="submit"]').removeAttr('disabled');
                that.find('button[type="submit"] i').addClass('icon-arrow-right');
                that.find('button[type="submit"] i').removeClass('icon-clock');
            },
            error: function () {
                that.find('button[type="submit"]').removeAttr('disabled');
                that.find('button[type="submit"] i').addClass('icon-arrow-right');
                that.find('button[type="submit"] i').removeClass('icon-clock');
            }
        });
    });
});
