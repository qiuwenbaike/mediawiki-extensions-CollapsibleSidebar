/**
 * collapsibleSidebar
 *
 * source: <https://git.qiuwen.wiki/InterfaceAdmin/Gadgets/src/branch/master/src/Gadgets/CollapsibleSidebar>
 * source: <https://git.qiuwen.wiki/InterfaceAdmin/Gadgets/src/branch/master/src/Gadgets/CollapsibleSidebar-gongbi>
 *
 * Author(s):
 * - AnYi
 *
 * Rewrite in ES5 and ES6 by WaitSpring
 */
'use strict';
(() => {
	window.getCookie = (name) => ('; '
		.concat(decodeURIComponent(document.cookie))
		.split('; '.concat(name, '='))
		.pop()
		.split(';')
		.shift());
	window.setCookie = (name, value, time, path = '/', isSecure = true) => {
		if (!name || !value || !time || !path) {
			return;
		}
		const base = ''
			.concat(name, '=')
			.concat(encodeURIComponent(value), ';path=')
			.concat(path)
			.concat(isSecure ? ';Secure' : '');
		const date = new Date();
		if (time === 'tmp') {
			document.cookie = base;
		} else {
			date.setTime(date.getTime() + time * 36e5);
			document.cookie = ''.concat(base, ';expires=').concat(date.toGMTString());
		}
	};
})();
