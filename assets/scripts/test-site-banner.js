"use strict";

let exitPage = "exit-intent.html",
    getGithubURL = function (pageURL) {
        let pageName = "",
            githubURL = null;

        if (pageURL.indexOf(".htm") === -1) {
            pageName = "index.html";
        }

        switch (true) {
            // Generate github.com URL's from [repo name].github.io URL's
            case pageURL.indexOf(".github.io/") > -1:
                githubURL = pageURL.toString().replace(new RegExp("^https:\/\/(.*?)\.github\.io\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/$1\/$2\/blob\/main\/$3$4" + pageName);
                break;
            // Generate github.com URL's from test.canada.ca URL's
            case pageURL.indexOf("://test.canada.ca/") > -1:
                githubURL = pageURL.toString().replace(new RegExp("^https:\/\/test\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/gc-proto\/$1\/blob\/master\/$2$3" + pageName);
                break;
            // Generate github.com URL's from [repo name].alpha.canada.ca URL's
            case pageURL.indexOf(".alpha.canada.ca/") > -1:
                githubURL = pageURL.toString().replace(new RegExp("^https:\/\/design\.cra-arc\.alpha\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/alpha-canada-ca\/cra-ucd-guide\/blob\/main\/$1\/$2$3" + pageName);
                break;
        }
        return githubURL;
    },
    getDomain = function (url) {
        let pattern = new RegExp("^(https?:\/\/[^\/]+\/[^\/]*\/?)"),
            domains = pattern.exec(url);

        return domains[0];
    },
    currentPageUrl = window.location.origin + window.location.pathname,
    githubURL = getGithubURL(currentPageUrl),
    rootDomain = getDomain(currentPageUrl),
    visitedLinkStyle = document.createElement("style");

//Remove visited link highlighting from links to exit page
visitedLinkStyle.innerHTML = "a[href*='" + rootDomain + exitPage + "']:visited{ color:#284162;}";
$("head").append(visitedLinkStyle);

// Initalize Edit button
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

// Initalize Github button
if (githubURL !== null) {
    document.getElementById("githubBtnGrp").classList.remove("wb-inv");
    document.getElementById("devtoolbar").classList.add("mrgn-rght-md");
    document.getElementById("githubBtn").href = githubURL;
}

$(document).on("wb-ready.wb", function () {
    $("a:not([href^='mailto:'], [href^='#'], [href^='" + rootDomain + "'])").each(function updateExitURL() {
        this.data("wb-exitscript", { url: rootDomain + exitPage });
/*
        this.href = rootDomain + exitPage + "?uri=" + this.href.replace("?", "&") + "&pagetitle=" + encodeURIComponent(this.innerText);
        this.addClass("wb-exitscript");
*/
    });
    $("form:not([action^='" + rootDomain + "'])").each(function updateExitURL() {
/*
        this.action = rootDomain + exitPage + "?uri=" + this.action.replace("?", "&");
*/
    });
});
