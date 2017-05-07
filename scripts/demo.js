
$(function () {
    'use strict';

    $('#autocomplete-dynamic').autocomplete({
        
        serviceUrl: '/suggestions',
        dataType:'json',
        onSelect: function(value){ console.log('You selected: ' + value); }
    });

});