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
        $out->addModules('ext.CollapsibleSidebar.js');
        $out->addModuleStyles('ext.CollapsibleSidebar.css');
        if ($this->isCollapsibleSidebarActive()) {
            $out->addHtmlClasses('client-collapsedsidebar');
        } else {
            $out->addHtmlClasses('client-shownsidebar');
        }
    }

    /**
     * Is the Dark Mode active?
     *
     * @return bool
     */
    private function isCollapsibleSidebarActive(): bool
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
