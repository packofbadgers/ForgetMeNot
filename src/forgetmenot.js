fmn = window.fmn || {};
fmn = {
    debug: true,

    log: function (msg) {
        if (window.console && fmn.debug)
            console.log(msg);
    },

    init: function () {
        fmn.log('fmn.init()');

        if ($.cookie('localData'))
            fmn.getLocalStorage();

        $('.demo-form input, .demo-form textarea').blur(function () {
            var key = $(this).attr('id'),
                val = $(this).val();
            fmn.setLocalStorage(key, val);
        });

        $('.demo-form').submit(function (e) {
            e.preventDefault();
            fmn.submitForm($(this));
        });
    },

    setLocalStorage: function (key, value) {
        fmn.log('fmn.setLocalStorage()');
        if (typeof(Storage) == 'undefined') return false;
        localStorage.setItem(key, value);
        $.cookie('localData', true);
    },

    getLocalStorage: function () {
        fmn.log('fmn.getLocalStorage()');
        for (var key in localStorage) {
            $('.demo-form').find('#' + key).val(localStorage.getItem(key));
        }
    },

    clearLocalStorage: function () {
        fmn.log('fmn.clearLocalStorage()');
        for (var key in localStorage) {
            localStorage.removeItem(key);
        }
        $.cookie('localData', false);
    },

    clearForm: function () {
        fmn.log('fmn.clearForm()');
        $('.demo-form input, .demo-form textarea').val('');
    },

    submitForm: function ($form) {
        fmn.log('fmn.submitForm()');
        var options = {
            data: {
                firstName: $form.find('#FirstName').val(),
                lastName: $form.find('#LastName').val(),
                emailAddress: $form.find('#EmailAddress').val(),
                message: $form.find('#Message').val()
            },
            success: function (resp) {
                if (resp != null && resp.length > 0) {
                    $('#response').addClass('success').html('<h3>Success!</h3>');
                    fmn.clearLocalStorage();
                    fmn.clearForm();
                } else {
                    $('#response').addClass('warning').html('<h3>Warning!</h3>');
                }
            }
        };
        fmn.log(JSON.stringify(options.data));
        //fmn.helpers.call(endpoint, options);
    },

    helpers: {
        call: function (endpoint, options) {
            $.ajax({
                url: endpoint,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(options.data),
                success: options.success
            });
        }
    }
};
fmn.init();