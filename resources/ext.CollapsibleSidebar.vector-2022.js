/**
 * collapsibleSidebar
 *
 * Author(s):
 * - AnYi
 *
 * Rewrite in ES5 and ES6 by WaitSpring
 */
'use strict';
(() => {
	const getCookie = (name) => ('; '
		.concat(decodeURIComponent(document.cookie))
		.split('; '.concat(name, '='))
		.pop()
		.split(';')
		.shift());
	const cookieName = 'usecollapsedsidebar';
	const isSidebarCollapsed = document.documentElement.classList.contains('client-collapsedsidebar');
	const sidebarButton = document.getElementById('sidebarButton');
	/* Code for Write */
	const switchMode = {
		hide: () => {
			document.body.classList.add('skin-vector-disable-max-width');
		},
		show: () => {
			document.body.classList.remove('skin-vector-disable-max-width');
		}
	};
	const checkSidebar = () => {
		if (getCookie(cookieName) === '') {
			if (isSidebarCollapsed) {
				switchMode.hide();
			} else {
				switchMode.show();
			}
		}
	};
	const modeSwitcher = () => {
		if (getCookie(cookieName) === '') {
			checkSidebar();
		}
		if (getCookie(cookieName) === '0') {
			switchMode.hide();
		} else {
			switchMode.show();
		}
	};
	sidebarButton.addEventListener('click', () => {
		modeSwitcher();
	});
	/* Entry function */
	checkSidebar();
})();
