/*
* Github only script
*
* Creates developer buttons - go to github source version annd contenEditable page edit buttons 
*
*/

"use strict";

const devOptionsLocStore = localStorage.getItem("gitCRATemplateDevOptions");

let devOptions = document.getElementById("devoptions");
let keywords = document.getElementById("pageKeywords");
let sourceUrlList = document.getElementById("sourceurl");

let sourceUrlArr, 
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
        if (githubURL !== null) {
            document.getElementById("githubBtnGrp").classList.remove("hide-devmenu");
            document.getElementById("githubBtn").href = githubURL;
        }
    };

document.addEventListener("DOMContentLoaded", function initDevOpts() {
    if (devOptionsLocStore.toLowerCase() === "true" || (devOptions !== null && devOptions.value.toLowerCase() === "true" && devOptionsLocStore.toLowerCase() !== "false")) {
        $(document).on("wb-ready.wb", function () {
            // Add toolbar and buttons
            document.getElementById("test-banner").innerHTML = "<div id=\"devtoolbar\" class=\"pull-right mrgn-rght-md\"><ul class=\"btn-toolbar list-inline\" role=\"toolbar\"><li class=\"btn-group\"><a id=\"editBtn\" class=\"btn btn-default btn-sm\" data-exit=\"false\" href=\"\" title=\"Edit\"><span class=\"fa fa-edit\"></span><span class=\"wb-inv\">Edit</span></a></li><li id=\"githubBtnGrp\" class=\"btn-group hide-devmenu\"><a id=\"githubBtn\" class=\"btn btn-default btn-sm\" data-exit=\"false\" href=\"#\" title=\"Go to Github source\"><span class=\"fab fa-github\"></span><span class=\"wb-inv\">Go to Github source</span></a></li></ul></div>" + document.getElementById("test-banner").innerHTML;
            if (sourceUrlList !== null && sourceUrlList.value !== "") {
                sourceUrlArr = JSON.parse(sourceUrlList.value);
                if ((sourceUrlArr.length === 1 && sourceUrlArr[0].sourcetitle !== "") || sourceUrlArr.length > 1) {
                    document.getElementById("test-banner-content").innerHTML = document.getElementById("test-banner-content").innerHTML + "<ol id=\"testpage-source\" class=\"list-inline mrgn-bttm-0\"></ol>";
                    sourceUrlArr.forEach(function addSourceLinks(sourceUrlData) {
                       document.getElementById("testpage-source").innerHTML = document.getElementById("testpage-source").innerHTML + "<li><span class=\"glyphicon glyphicon-link\"></span>&nbsp;<a data-exit=\"false\" href=\"" + sourceUrlData.sourcelink + "\">" + sourceUrlData.sourcetitle + "</a></li>";
                    });
                }
            }
            if (keywords !== null && keywords.value !== "") {
                document.getElementById("test-banner-content").innerHTML = document.getElementById("test-banner-content").innerHTML + "<p class=\"mrgn-bttm-0\"><span class=\"glyphicon glyphicon-tags mrgn-rght-sm\"><span class=\"wb-inv\">Keywords:</span></span><span id=\"pageKeywords\" class=\"mrgn-lft-sm\">" + keywords.value + "</span></p>";
            }

            if (document.getElementById("devtoolbar") !== null) {
        
                // Initalize Edit button
                document.getElementById("editBtn").addEventListener("click", function (event) {
                    if (document.getElementsByTagName("main").contentEditable === "true") {
                        document.getElementsByTagName("main").contentEditable = "false";
                        document.designMode = "off";
                        void 0;
                        // saves cuurent modified page content to local storage
//                sessionStorage.setItem("content", document.getElementsByTagName("main")[0].innerHTML);
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
                getGithubURL(window.location.origin + window.location.pathname);

        // Load modied page content if it exists from local Storage
/*
        window.onload = function () {
            if (sessionStorage.getItem("content")) {
                document.getElementsByTagName("main")[0].innerHTML = sessionStorage.getItem("content");
            }
        }
*/
            }
        });
    }
}, { once: true });
