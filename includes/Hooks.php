<?php

namespace MediaWiki\Extension\CollapsibleSidebar;

use MediaWiki\Hook\BeforePageDisplayHook;
use OutputPage;
use Skin;

class Hooks implements
	BeforePageDisplayHook
{

	/**
	 * Handler for BeforePageDisplay hook.
	 *
	 * @param OutputPage $out
	 * @param Skin $skin Skin being used.
	 */
	public function onBeforePageDisplay($out, $skin): void
	{
		$requiredSkins = ['vector', 'write', 'gongbi', 'timeless', 'citizen'];
		if (
			!in_array($skin->getSkinName(), $requiredSkins)
		) {
			return;
		}

		if ($skin->getSkinName() === 'vector') {
			$out->addModules('ext.CollapsibleSidebar.vector');
			$out->addModuleStyles('ext.CollapsibleSidebar.vector.styles');
			$out->addModuleStyles('ext.CollapsibleSidebar.styles');
		} else {
			$out->addModules('ext.CollapsibleSidebar.js');
			$out->addModuleStyles('ext.CollapsibleSidebar.styles');
		}

		if ($this->isSidebarCollapsed()) {
			$out->addHtmlClasses('client-collapsedsidebar');
		}
	}

	/**
	 * Is the sidebar collapsed?
	 *
	 * @return bool
	 */
	private function isSidebarCollapsed(): bool
	{
		$var = !isset($_GET['usecollapsedsidebar']) ? '' : $_GET['usecollapsedsidebar'];
		if ($var === '0' || $var === '1') {
			// On usecollapsedsidebar is set, overwrite the cookie.
			return (bool)$var;
		}
		$varCookie = !isset($_COOKIE['usecollapsedsidebar']) ? '' : $_COOKIE['usecollapsedsidebar'];
		if ($varCookie === '0' || $varCookie === '1') {
			// If usecollapsedsidebar not set, return cookie value.
			return (bool)$varCookie;
		}
		// Otherwise return false
		return false;
	}
}
