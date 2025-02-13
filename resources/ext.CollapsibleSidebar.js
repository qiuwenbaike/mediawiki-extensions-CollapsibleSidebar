/**
 * @name collapsibleSidebar.js
 * @description add button to collapse sidebar to MediaWiki sites
 * @author 安忆 <i@anyi.in>, WaitSpring
 * @license GPL-3.0
 */
'use strict';
document.addEventListener('DOMContentLoaded', () => {
	const wgCanonicalSpecialPageName = mw.config.get(
		'wgCanonicalSpecialPageName'
	);
	const skin = mw.config.get('skin');
	if (wgCanonicalSpecialPageName === 'ApiHelp' || skin === 'vector-2022') {
		return;
	}

	const COOKIE_NAME = 'usecollapsedsidebar';
	const HIDE_ICON =
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 13.229 13.229'%3E%3Ccircle cx='6.615' cy='6.615' fill='%23fff' stroke='%2336c' stroke-width='1.322' r='5.953'/%3E%3Cpath d='M3.307 3.307v2.205h.735v-1.47h1.47v-.735zm.735 4.41h-.735v2.205h2.205v-.735h-1.47zm5.145 1.47h-1.47v.735h2.205V7.717h-.735zm0-5.88h-1.47v.735h1.47v1.47h.735V3.307z' fill='%2336c'/%3E%3C/svg%3E";
	const SHOW_ICON =
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 13.229 13.229'%3E%3Ccircle cx='6.615' cy='6.615' fill='%23fff' stroke='%2336c' stroke-width='1.322' r='5.953'/%3E%3Cpath d='M5.512 5.512V3.307h-.735v1.47h-1.47v.735zm-.735 4.41h.735V7.717H3.307v.735h1.47zm3.675-1.47h1.47v-.735H7.717v2.205h.735zm0-2.94h1.47v-.735h-1.47v-1.47h-.735v2.205z' fill='%2336c'/%3E%3C/svg%3E";
	const IS_COLLAPSED = document.documentElement.classList.contains(
		'client-collapsedsidebar'
	);
	const message = function (key) {
		return mw.message('collapsiblesidebar-' + key).plain();
	};

	const button = document.createElement('img');
	button.id = 'sidebarButton';
	button.src = IS_COLLAPSED ? SHOW_ICON : HIDE_ICON;
	button.draggable = false;
	button.alt = IS_COLLAPSED ? message('show-link') : message('hide-link');
	button.title = IS_COLLAPSED ?
		message('show-link-tooltip') :
		message('hide-link-tooltip');
	button.style.opacity = '0.7';
	button.style.bottom = '169px';
	/* add EventListener to button */
	const eventTargetFunction = function (event) {
		button.style.opacity = event.type === 'mouseenter' ? '1' : '0.7';
	};
	button.addEventListener('mouseenter ', eventTargetFunction);
	button.addEventListener('mouseleave', eventTargetFunction);
	document.body.appendChild(button);

	const eventFunc = function () {
		button.style.bottom =
			document.getElementById('cat_a_lot') ||
			document.getElementById('proveit') ||
			document.getElementsByClassName('wordcount')[ 0 ] ?
				'213px' :
				'169px';
	};
	window.addEventListener('scroll', eventFunc);
	window.addEventListener('selectionchange', eventFunc);

	const getCookie = function (name) {
		return '; '
			.concat(decodeURIComponent(document.cookie))
			.split('; '.concat(name, '='))
			.pop()
			.split(';')
			.shift();
	};

	const setCookie = function (object) {
		const name = object.name;
		const value = object.value;
		const hour = object.hour || 0;
		const path = object.path || '/';
		const isSecure = object.isSecure || true;

		if (!name || !value || !path) {
			return;
		}

		const base = ''
			.concat(name, '=')
			.concat(encodeURIComponent(value), ';path=')
			.concat(path)
			.concat(isSecure ? ';Secure' : '');

		const date = new Date();

		if (hour === 0) {
			document.cookie = base;
		} else {
			date.setTime(date.getTime() + hour * 60 * 60 * 1000);
			document.cookie = ''
				.concat(base, ';expires=')
				.concat(date.toGMTString());
		}
	};

	const switchMode = {
		hide: function () {
			document.documentElement.classList.add('client-collapsedsidebar');
			if (skin === 'write') {
				document
					.getElementById('content')
					.parentNode.classList.remove('col-xl-10');
				document
					.getElementById('content')
					.parentNode.classList.add('col-xl-12');
			}
			setCookie({ name: COOKIE_NAME, value: '0', hour: -1 });
			setCookie({ name: COOKIE_NAME, value: '1', hour: 24 * 365 * 1000 });
			button.src = SHOW_ICON;
			button.alt = message('show-link');
			button.title = message('show-link-tooltip');
		},
		show: function () {
			document.documentElement.classList.remove(
				'client-collapsedsidebar'
			);
			if (skin === 'write') {
				document
					.getElementById('content')
					.parentNode.classList.add('col-xl-10');
				document
					.getElementById('content')
					.parentNode.classList.remove('col-xl-12');
			}
			setCookie({ name: COOKIE_NAME, value: '1', hour: -1 });
			setCookie({ name: COOKIE_NAME, value: '0', hour: 24 * 365 * 1000 });
			button.src = HIDE_ICON;
			button.alt = message('hide-link');
			button.title = message('hide-link-tooltip');
		}
	};

	const checkSidebar = function () {
		if (getCookie(COOKIE_NAME) === '') {
			if (IS_COLLAPSED) {
				switchMode.hide();
			} else {
				switchMode.show();
			}
		}
	};

	const modeSwitcher = function () {
		if (getCookie(COOKIE_NAME) === '') {
			checkSidebar();
		}
		if (getCookie(COOKIE_NAME) === '0') {
			switchMode.hide();
		} else {
			switchMode.show();
		}
	};

	button.addEventListener('click', () => {
		modeSwitcher();
	});

	checkSidebar(); // Entry function
});
