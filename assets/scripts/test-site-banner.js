"use strict";

//let exitPage = "https://cra-design.github.io/gst-hst-business/exit-intent.html",
let exitPage = document.getElementById("exitpage");
let relExternalLnk = document.getElementById("relextlnk"), 
    devbar = document.getElementById("devtoolbar"), 
    getGithubURL = function (pageURL) {
        let pageName = "", 
            gitURL = null;

        if (pageURL.indexOf(".htm") === -1) {
            pageName = "index.html";
        }

        switch (true) {
            // Generate github.com URL's from [repo name].github.io URL's
            case pageURL.indexOf(".github.io/") > -1:
                gitURL = pageURL.toString().replace(new RegExp("^https:\/\/(.*?)\.github\.io\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/$1\/$2\/blob\/main\/$3$4" + pageName);
                break;
            // Generate github.com URL's from test.canada.ca URL's
            case pageURL.indexOf("://test.canada.ca/") > -1:
                gitURL = pageURL.toString().replace(new RegExp("^https:\/\/test\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/gc-proto\/$1\/blob\/master\/$2$3" + pageName);
                break;
            // Generate github.com URL's from [repo name].alpha.canada.ca URL's
            case pageURL.indexOf(".alpha.canada.ca/") > -1:
                gitURL = pageURL.toString().replace(new RegExp("^https:\/\/design\.cra-arc\.alpha\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/alpha-canada-ca\/cra-ucd-guide\/blob\/main\/$1\/$2$3" + pageName);
                break;
        }
        return gitURL;
    }, 
    getDomain = function (url) {
        let pattern = new RegExp("^(https?:\/\/[^\/]+\/[^\/]*\/?)"),
            domains = pattern.exec(url);

        return domains[0];
    }, 
    currentPageUrl = window.location.origin + window.location.pathname, 
    githubURL = getGithubURL(currentPageUrl), 
    rootDomain = getDomain(currentPageUrl), 
    adjustLinks = function adjustLinks(hrefSelector, actionSelector, formActionSelector, destStartPath) {
        if (exitPage) {
            if (hrefSelector !== "") {
                $(hrefSelector).each(function updateExitHref() {
                    /*
                    let urlObj = { "url": exitPage.value }
                    this.dataset.wbExitscript = JSON.stringify(urlObj);
                    this.classList.add("wb-exitscript");
                    this.href = destStartPath + this.href;
                    this.href = exitPage.value + "?uri=" + destStartPath + this.href.replace("?", "&") + "&pagetitle=" + encodeURIComponent(this.innerText);
                    */
                });
                /*
                $(".wb-exitscript").trigger("wb-init.wb-exitscript");
                */
            }

            if (actionSelector !== "") {
                $(actionSelector).each(function updateExitAction() {
                    /*
                    let hiddenInEl;

                    this.method = "GET";
                    hiddenInEl = document.createElement("input");
                    hiddenInEl.value = destStartPath + this.action;
                    hiddenInEl.name = "uri";
                    hiddenInEl.type = "hidden";
                    this.action = exitPage.value;
                    this.append(hiddenInEl);
                    */
                });
            }

            if (formActionSelector !== "") {
                $(formActionSelector).each(function updateExitForm() {
                    /*
                    let hiddenInEl;

                    hiddenInEl = document.createElement("input");
                    hiddenInEl.value = destStartPath + this.formaction;
                    hiddenInEl.name = "uri";
                    hiddenInEl.type = "hidden";
                    this.formaction = exitPage.value;
                    this.append(hiddenInEl);
                    */
                });
            }
        }
    }, 
    visitedLinkStyle = document.createElement("style");

//Remove visited link highlighting from links to exit page
if (exitPage) {
    visitedLinkStyle.innerHTML = "a[href*='" + exitPage.value + "']:visited{ color:#284162; }";
    $("head").append(visitedLinkStyle);
}

// Initalize Edit button
if (devbar) {
    document.getElementById("editBtn").addEventListener("click", function (event) {
        if (document.getElementsByTagName("main").contentEditable === "true") {
            document.getElementsByTagName("main").contentEditable = "false";
            document.designMode = "off";
            void 0;
            this.classList.add("btn-default");
            this.classList.remove("btn-primary");
        } else {
            document.getElementsByTagName("main").contentEditable = "true";
            document.designMode = "on";
            void 0;
            this.classList.add("btn-primary");
            this.classList.remove("btn-default");
        }
        event.preventDefault();
    });
}

// Initalize Github button
if (devbar && githubURL !== null) {
    document.getElementById("githubBtnGrp").classList.remove("hide-devmenu");
    devbar.classList.add("mrgn-rght-md");
    document.getElementById("githubBtn").href = githubURL;
}

// changes all external site links and forms to go to destination link
$(document).on("wb-ready.wb", function () {
    adjustLinks("a:not([href^='mailto:'], [href^='#'], [href^='/'], [href^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", "form:not([action^='" + rootDomain + "'], [action^='/'], [data-exit='false'], .wb-exitscript)", "input:not([formaction^='" + rootDomain + "'], [formaction^='/'], [data-exit='false'], .wb-exitscript), button:not([formaction^='" + rootDomain + "'], [formaction^='/'], [data-exit='false'], .wb-exitscript)", "");
    if (relExternalLnk.value !== "") {
        adjustLinks("a[href^='/'], a:not([data-exit='false'], .wb-exitscript)", "form[action^='/'], form:not([data-exit='false'], .wb-exitscript)", "input[formaction^='/'], input:not([data-exit='false'], .wb-exitscript), button[formaction^='/'], button:not([data-exit='false'], .wb-exitscript)", relExternalLnk.value);
    }
});

// changes all GCM Menu external site links and forms to go to destination link
$(".gcweb-menu").on("wb-ready.gcweb-menu", function () {
    adjustLinks(".gcweb-menu a:not([href^='mailto:'], [href^='#'], [href^='/'], [href^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", ".gcweb-menu form:not([action^='" + rootDomain + "'], [action^='/'], [data-exit='false'], .wb-exitscript)", ".gcweb-menu input:not([formaction^='" + rootDomain + "'], [formaction^='/'], [data-exit='false'], .wb-exitscript), .gcweb-menu button:not([formaction^='" + rootDomain + "'], [formaction^='/'], [data-exit='false'], .wb-exitscript)", "");
    if (relExternalLnk.value !== "") {
        adjustLinks(".gcweb-menu a[href^='/'], .gcweb-menu a:not([data-exit='false'], .wb-exitscript)", ".gcweb-menu form[action^='/'], .gcweb-menu form:not([data-exit='false'], .wb-exitscript)", ".gcweb-menu input[formaction^='/'], .gcweb-menu input:not([data-exit='false'], .wb-exitscript), .gcweb-menu button[formaction^='/'], .gcweb-menu button:not([data-exit='false'], .wb-exitscript)", relExternalLnk.value);
    }
});
