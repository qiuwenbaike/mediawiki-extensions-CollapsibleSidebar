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
	if (!['write'].includes(mw.config.get('skin'))) {
		return;
	}
	const cookieName = 'usecollapsedsidebar';
	const isSidebarCollapsed = document.documentElement.classList.contains('client-collapsedsidebar');
	const sidebarButton = document.getElementById('sidebarButton');
	/* Code for Write */
	const switchMode = {
		hide: () => {
			document.getElementById('content').parentElement.classList.add('col-md-12');
			document.getElementById('content').parentElement.classList.remove('col-md-9');
		},
		show: () => {
			document.getElementById('content').parentElement.classList.add('col-md-9');
			document.getElementById('content').parentElement.classList.remove('col-md-12');
		}
	};
	const checkSidebar = () => {
		if (window.getCookie(cookieName) === '') {
			if (isSidebarCollapsed) {
				switchMode.hide();
			} else {
				switchMode.show();
			}
		}
	};
	const modeSwitcher = () => {
		if (window.getCookie(cookieName) === '') {
			checkSidebar();
		}
		if (window.getCookie(cookieName) === '0') {
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
