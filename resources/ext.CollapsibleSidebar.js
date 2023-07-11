/**
 * collapsibleSidebarGongbi
 * Author(s):
 * - AnYi
 * Rewrite in ES5 and ES6 by WaitSpring
 */
'use strict';
( () => {
	if ( ![ 'gongbi', 'timeless', 'write' ].includes( mw.config.get( 'skin' ) ) ) {
		return;
	}
	const getCookie = ( name ) => ( '; '
		.concat( decodeURIComponent( document.cookie ) )
		.split( '; '.concat( name, '=' ) )
		.pop()
		.split( ';' )
		.shift() );
	const setCookie = ( name, value, time, path = '/', isSecure = true ) => {
		if ( !name || !value || !time || !path ) {
			return;
		}
		const base = ''
			.concat( name, '=' )
			.concat( encodeURIComponent( value ), ';path=' )
			.concat( path )
			.concat( isSecure ? ';Secure' : '' );
		const date = new Date();
		if ( time === 'tmp' ) {
			document.cookie = base;
		} else {
			date.setTime( date.getTime() + time * 36e5 );
			document.cookie = ''.concat( base, ';expires=' ).concat( date.toGMTString() );
		}
	};
	const cookieName = 'usecollapsedsidebar';
	const images = {
		hideSidebarButtonIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 13.229 13.229'%3E%3Ccircle cx='6.615' cy='6.615' fill='%23fff' stroke='%2336c' stroke-width='1.322' r='5.953'/%3E%3Cpath d='M3.307 3.307v2.205h.735v-1.47h1.47v-.735zm.735 4.41h-.735v2.205h2.205v-.735h-1.47zm5.145 1.47h-1.47v.735h2.205V7.717h-.735zm0-5.88h-1.47v.735h1.47v1.47h.735V3.307z' fill='%2336c'/%3E%3C/svg%3E",
		showSidebarButtonIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 13.229 13.229'%3E%3Ccircle cx='6.615' cy='6.615' fill='%23fff' stroke='%2336c' stroke-width='1.322' r='5.953'/%3E%3Cpath d='M5.512 5.512V3.307h-.735v1.47h-1.47v.735zm-.735 4.41h.735V7.717H3.307v.735h1.47zm3.675-1.47h1.47v-.735H7.717v2.205h.735zm0-2.94h1.47v-.735h-1.47v-1.47h-.735v2.205z' fill='%2336c'/%3E%3C/svg%3E"
	};
	const isSidebarCollapsed = document.documentElement.classList.contains( 'client-collapsedsidebar' );
	/* sidebarButton */
	const sidebarButton = document.createElement( 'img' );
	sidebarButton.id = 'sidebarButton';
	sidebarButton.src = isSidebarCollapsed ?
		images.showSidebarButtonIcon :
		images.hideSidebarButtonIcon;
	sidebarButton.draggable = false;
	sidebarButton.alt = isSidebarCollapsed ? mw.message( 'collapsiblesidebar-show-link' ) : mw.message( 'collapsiblesidebar-hide-link' );
	sidebarButton.title = isSidebarCollapsed ? mw.message( 'collapsiblesidebar-show-link-tooltip' ) : mw.message( 'collapsiblesidebar-hide-link-tooltip' );
	sidebarButton.style.opacity = '0.7';
	sidebarButton.style.bottom = '162px';
	/* add EventListener to button */
	const eventTargetFunction = ( { type } ) => {
		sidebarButton.style.opacity = type === 'mouseenter' ? '1' : '0.7';
	};
	sidebarButton.addEventListener( 'mouseenter', eventTargetFunction );
	sidebarButton.addEventListener( 'mouseleave', eventTargetFunction );
	document.body.appendChild( sidebarButton );
	/* add EventListener to Window */
	const windowEventFunction = () => {
		if ( document.getElementById( 'cat_a_lot' ) ||
			document.getElementById( 'proveit' ) ||
			document.getElementsByClassName( 'wordcount' )[ 0 ] ) {
			sidebarButton.style.bottom = '206px';
		} else {
			sidebarButton.style.bottom = '162px';
		}
	};
	window.addEventListener( 'scroll', windowEventFunction );
	window.addEventListener( 'selectionchange', windowEventFunction );
	/* switchMode function */
	const switchMode = {
		hide: () => {
			document.documentElement.classList.add( 'client-collapsedsidebar' );
			document.documentElement.classList.remove( 'client-shownsidebar' );
			setCookie( cookieName, '0', '-1' );
			setCookie( cookieName, '1', 1e9 );
			sidebarButton.src = images.showSidebarButtonIcon;
			sidebarButton.alt = mw.message( 'collapsiblesidebar-show-link' );
			sidebarButton.title = mw.message( 'collapsiblesidebar-show-link-tooltip' );
			if ( mw.config.get( 'skin' ) === 'write' ) {
				document.getElementById( 'content' ).parentElement.classList.add( 'col-md-12' );
				document.getElementById( 'content' ).parentElement.classList.remove( 'col-md-9' );
			}
		},
		show: () => {
			document.documentElement.classList.add( 'client-shownsidebar' );
			document.documentElement.classList.remove( 'client-collapsedsidebar' );
			setCookie( cookieName, '1', '-1' );
			setCookie( cookieName, '0', 1e9 );
			sidebarButton.src = images.hideSidebarButtonIcon;
			sidebarButton.alt = mw.message( 'collapsiblesidebar-collapse-link' );
			sidebarButton.title = mw.message( 'collapsiblesidebar-collapse-link-tooltip' );
			if ( mw.config.get( 'skin' ) === 'write' ) {
				document.getElementById( 'content' ).parentElement.classList.add( 'col-md-9' );
				document.getElementById( 'content' ).parentElement.classList.remove( 'col-md-12' );
			}
		}
	};
	const checkSidebar = () => {
		if ( getCookie( cookieName ) === '' ) {
			if ( isSidebarCollapsed ) {
				switchMode.hide();
			} else {
				switchMode.show();
			}
		}
	};
	const modeSwitcher = () => {
		if ( getCookie( cookieName ) === '' ) {
			checkSidebar();
		}
		if ( getCookie( cookieName ) === '0' ) {
			switchMode.hide();
		} else {
			switchMode.show();
		}
	};
	sidebarButton.addEventListener( 'click', () => {
		modeSwitcher();
	} );
	checkSidebar();
} )();
