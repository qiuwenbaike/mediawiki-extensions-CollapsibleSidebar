/**
 * @name collapsibleSidebar.vector.js
 * @description add button to collapse sidebar to MediaWiki sites
 * @author 安忆 <i@anyi.in>, WaitSpring
 * @license GPL-3.0
 */
'use strict';
(() => {
	if (mw.config.get('wgCanonicalSpecialPageName') === 'ApiHelp') {
		return;
	}
	const COOKIE_NAME = 'usecollapsedsidebar';
	const images = {
		logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='36.111' viewBox='0 0 39.687 9.554'%3E%3Cpath d='M8.216 1.472c.31.237.66.668.772 1.044.85.442 1.383-1.144-.708-1.098zm1.328 1.853c-.198.448-.605 1.153-.986 1.702a4.823 4.797 0 0 1-.675-1.444v-.548h2.973c.119 0 .198-.04.222-.126a16.873 16.778 0 0 0-.937-.752l-.517.65H7.883V1.473c.198-.032.262-.102.277-.213l-1.24-.125v1.67H3.838l.064.229h3.02v2.275L3.916 6.65l.73.988a.331.33 0 0 0 .16-.243L6.92 5.583v1.696c0 .11-.04.157-.184.157A40.3 40.082 0 0 1 5.6 7.374v.102c.445.078.643.188.787.33s.19.36.223.66C7.73 8.37 7.882 8 7.882 7.35V4.063c.428 1.96 1.208 2.94 2.392 3.72.11-.45.405-.794.795-.88l.023-.087c-.85-.306-1.747-.76-2.408-1.616a13.518 13.443 0 0 0 1.67-1.074c.183.017.262-.017.302-.094zm-4.912.158c.365.416.74 1.05.818 1.615.9.674 1.677-1.113-.748-1.662zm8.382-2.355c.294.29.62.769.73 1.177.812.495 1.424-1.037-.66-1.232zm-.786.965v6.37h.15c.343 0 .709-.18.709-.275V2.456c.246-.032.31-.125.333-.242zm2.71 4.37V5.49h1.24v.886zm1.24-3.263v.903h-1.24V3.2zm-1.24 1.13h1.24v.94h-1.24zm3.394-3.038l-.398.462H14.88l.072.22h3.06v5.343c0 .125-.048.18-.19.18a15.553 15.467 0 0 1-.812-.047v-.883l.723-.056c.104-.008.184-.062.2-.148l-.59-.66-.333.47V3.2h.612c.11 0 .198-.04.214-.125l-.77-.635-.43.54h-3.212l.056.22h.62v3.325l-.78.056.088.243 2.766-.196v1.444h.143c.429 0 .692-.165.692-.213v-.25c.238.062.374.142.485.242.119.125.167.338.19.613 1.05-.102 1.185-.448 1.185-1.045V2.118a.545.542 0 0 0 .326-.157zm7.03 2.41v1.71h-3.146v-1.71zm-3.146 3.805V5.63h3.148v1.874zm3.569-5.65h-5.556l.064.229h2.79l-.136 1.396h-.668l-1.017-.407v5.35h.15c.414 0 .803-.22.803-.33v-.36h3.148v.65h.159c.333 0 .795-.204.802-.267v-4.26a.567.564 0 0 0 .326-.164l-.914-.706-.454.495h-2.034c.35-.368.7-.895.993-1.396h2.87c.12 0 .206-.04.23-.126l-1.003-.778zm6.035.136c.334.314.676.84.747 1.287.82.588 1.542-1.02-.684-1.343zm-.15 1.938c.333.298.683.807.77 1.246.835.565 1.535-1.066-.715-1.302zm-1.217-.142h1.105c.103 0 .19-.04.214-.126l-.77-.705-.422.612h-.127V2.187l.714-.165c.256.087.43.063.526-.016l-1.018-.885c-.525.4-1.574.942-2.44 1.24l.032.1 1.28-.124V3.57H28.29l.064.22h1.081c-.246 1.09-.69 2.26-1.319 3.075l.096.087a6.336 6.301 0 0 0 1.335-1.38v2.91h.167c.446 0 .74-.205.74-.26v-3.76c.198.33.397.746.453 1.107.668.558 1.406-.738-.454-1.341zm4.252 1.9l-.063.014V1.646c.214-.031.27-.117.286-.227l-1.191-.117v4.566l-2.647.494.111.213 2.536-.48V8.44h.175c.342 0 .73-.204.73-.298v-2.22l1.034-.197c.096-.017.175-.08.175-.158l-.77-.61z'/%3E%3Cpath d='M0 1.47v6.88h1.846v-.576H.784V2.046h1.062V1.47zm39.687 0v6.88h-1.846v-.576h1.062V2.046h-1.062V1.47z' fill='%2336c'/%3E%3C/svg%3E",
		next: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%232196f3' d='M17.1 5L14 8.1 29.9 24 14 39.9l3.1 3.1L36 24z'/%3E%3C/svg%3E",
		prev: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%232196f3' d='M30.9 43l3.1-3.1L18.1 24 34 8.1 30.9 5 12 24z'/%3E%3C/svg%3E"
	};
	const isSidebarCollapsed = document.documentElement.classList.contains('client-collapsedsidebar');
	const bodyWidth = (/android|ipad|iphone|mobile/i.test(navigator.userAgent) ?
		(window.outerWidth > 0 ? window.outerWidth : document.body.offsetWidth) :
		window.innerWidth > 0 ? window.innerWidth : document.body.offsetWidth
	) ?? 0;

	const sidebarCollapse = document.createElement('img');
	sidebarCollapse.id = 'sidebarCollapse';
	sidebarCollapse.src = isSidebarCollapsed ? images.next : images.prev;
	sidebarCollapse.draggable = false;
	sidebarCollapse.alt = isSidebarCollapsed ?
		mw.message('collapsiblesidebar-show-link') :
		mw.message('collapsiblesidebar-hide-link');
	sidebarCollapse.title = isSidebarCollapsed ?
		mw.message('collapsiblesidebar-show-link-tooltip') :
		mw.message('collapsiblesidebar-hide-link-tooltip');
	sidebarCollapse.style.left = isSidebarCollapsed ? '0.3em' :
		(bodyWidth >= 982) ? '10.3em' : '9.3em';
	document.body.appendChild(sidebarCollapse);

	const sliderCollapseLogoLink = document.createElement('a');
	sliderCollapseLogoLink.href = document.getElementsByClassName('mw-wiki-logo')[0].href;
	sliderCollapseLogoLink.title = document.getElementsByClassName('mw-wiki-logo')[0].title;
	const sliderCollapseLogo = document.createElement('img');
	sliderCollapseLogo.id = 'sliderCollapseLogo';
	sliderCollapseLogo.classList.add('mw-no-invert');
	sliderCollapseLogo.src = images.logo;
	sliderCollapseLogo.alt = document.getElementsByClassName('mw-wiki-logo')[0].title;
	sliderCollapseLogo.title = document.getElementsByClassName('mw-wiki-logo')[0].title;
	sliderCollapseLogo.style.display = isSidebarCollapsed ? '' : 'none';
	sliderCollapseLogoLink.appendChild(sliderCollapseLogo);
	document.getElementById('mw-navigation').appendChild(sliderCollapseLogoLink);

	const getCookie = (name) => ('; '
		.concat(decodeURIComponent(document.cookie))
		.split('; '.concat(name, '='))
		.pop()
		.split(';')
		.shift());
	const setCookie = ({
		name,
		value,
		hour = 0,
		path = '/',
		isSecure = true
	}) => {
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
			document.cookie = ''.concat(base, ';expires=').concat(date.toGMTString());
		}
	};

	const switchMode = {
		bodyWidth: (/android|ipad|iphone|mobile/i.test(navigator.userAgent) ?
			(window.outerWidth > 0 ? window.outerWidth : document.body.offsetWidth) :
			window.innerWidth > 0 ? window.innerWidth : document.body.offsetWidth
		) ?? 0,
		hide: () => {
			document.documentElement.classList.add('client-collapsedsidebar');
			setCookie({ name: COOKIE_NAME, value: '0', hour: -1 });
			setCookie({ name: COOKIE_NAME, value: '1', hour: 24 * 365 * 1000 });
			document.getElementById('sidebarCollapse').src = images.next;
			document.getElementById('sidebarCollapse').style.left = '0.3em';
		},
		show: () => {
			document.documentElement.classList.remove('client-collapsedsidebar');
			setCookie({ name: COOKIE_NAME, value: '1', hour: -1 });
			setCookie({ name: COOKIE_NAME, value: '0', hour: 24 * 365 * 1000 });
			document.getElementById('sidebarCollapse').src = images.prev;
			document.getElementById('sidebarCollapse').style.left =
				(switchMode.bodyWidth >= 982) ? '10.3em' : '9.3em';
		}
	};
	const checkSidebar = () => {
		if (getCookie(COOKIE_NAME) === '') {
			if (isSidebarCollapsed) {
				switchMode.hide();
			} else {
				switchMode.show();
			}
		}
	};
	const modeSwitcher = () => {
		if (getCookie(COOKIE_NAME) === '') {
			checkSidebar();
		}
		if (getCookie(COOKIE_NAME) === '0') {
			switchMode.hide();
		} else {
			switchMode.show();
		}
	};
	sidebarCollapse.addEventListener('click', () => {
		modeSwitcher();
	});
	/* Entry function */
	checkSidebar();
})();
