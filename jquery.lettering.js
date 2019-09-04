(function ($) {

    'use strict';

    function injector(t, splitter, keywords) {

        let text = t.text();
        let a = text.split(splitter);
        let inject = '';
        let k;

        if (a.length) {
            $(a).each(function (i, item) {
                if (item !== undefined) {
                    if (/^[ .,!?]$/.test(item) || item === '') {
                        inject += item;
                    } else {
                        k = keywords.find(k => k.name === item);
                        if (k !== undefined) {
                            inject += `<span data-tootle="tooltip" title="${k.definition}">${item}</span>`;
                        } else {
                            inject += item;
                        }
                    }
                }
            });
            t.empty().append(inject)
        }
    }

    $.fn.lettering = function (method, keywords = []) {

        let regex = '([ .,!?])';

        keywords.forEach(k => regex += `|(${k.name})`);

        injector($(this), new RegExp(regex, 'gmi'), keywords);

        return this;
    };

})(jQuery);
