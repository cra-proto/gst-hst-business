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
            return githubURL;
        } else {
            return "";
        }
    };

document.addEventListener("DOMContentLoaded", function initDevOpts() {
    let pageInfo, titleElm, subjectElm, descriptionElm, 
        gitURL = "",
        titleInfo = "", 
        subjectInfo = "", 
        descriptionInfo = "", 
        sourceLinkInfo = "", 
        keywordInfo = "";

    if (devOptionsLocStore === "true" || (devOptions !== null && devOptions.value.toLowerCase() === "true" && devOptionsLocStore !== "false")) {
        $(document).on("wb-ready.wb", function () {
            // Add toolbar and buttons
            if (document.getElementById("test-banner") !== null) {
                pageInfo = "<div id=\"devtoolbar\" class=\"pull-right mrgn-rght-md\"><ul class=\"btn-toolbar list-inline\" role=\"toolbar\"><li id=\"editBtnGrp\" class=\"btn-group\"><a id=\"editBtn\" class=\"btn btn-default btn-sm\" data-exit=\"false\" href=\"\" title=\"Edit\"><span class=\"fa fa-edit\"></span><span class=\"wb-inv\">Edit</span></a></li>";
                gitURL = getGithubURL(window.location.origin + window.location.pathname);
                if (gitURL !== "") {
                    pageInfo = pageInfo + "<li id=\"githubBtnGrp\" class=\"btn-group\"><a id=\"githubBtn\" class=\"btn btn-default btn-sm\" data-exit=\"false\" href=\"#\" title=\"Go to Github source\"><span class=\"fab fa-github\"></span><span class=\"wb-inv\">Go to Github source</span></a></li>";
                }
                titleElm = document.querySelector("meta[name=dcterms\\.title]");
                if (titleElm.length > 0 && "content" in titleElm[0] === true) {
                    titleInfo = "<p><strong>Title</strong>:&nbsp;" + titleElm[0].content.trim() + "</p>\n";
                }
                subjectElm = document.querySelector("meta[name=dcterms\\.subject]");
                if (subjectElm.length > 0 && "content" in subjectElm[0] === true) {
                    subjectInfo = "<p><strong>Subject</strong>:&nbsp;" + subjectElm[0].content.trim() + "</p>\n";
                }
                descriptionElm = document.querySelector("meta[name=dcterms\\.description]");
                if (descriptionElm.length > 0 && "content" in descriptionElm[0] === true) {
                    descriptionInfo = "<p><strong>Description</strong>:&nbsp;" + descriptionElm[0].content.trim() + "</p>\n";
                }

                if (sourceUrlList !== null && sourceUrlList.value !== "") {
                    sourceUrlArr = JSON.parse(sourceUrlList.value);
                    if ((sourceUrlArr.length === 1 && sourceUrlArr[0].sourcetitle !== "") || sourceUrlArr.length > 1) {
                        sourceLinkInfo = "<ol id=\"testpage-source\" class=\"list-inline mrgn-bttm-0\">\n";
                        sourceUrlArr.forEach(function addSourceLinks(sourceUrlData) {
                           sourceLinkInfo = sourceLinkInfo + "<li><span class=\"glyphicon glyphicon-link\"></span>&nbsp;<a data-exit=\"false\" href=\"" + sourceUrlData.sourcelink + "\">" + sourceUrlData.sourcetitle + "</a></li>\n";
                        });
                        sourceLinkInfo = sourceLinkInfo + "</ol>\n";
                    }
                }
                if (keywords !== null && keywords.value !== "") {
                    keywordInfo = "<p><strong>Keywords</strong>:&nbsp;<span id=\"pageKeywords\" class=\"mrgn-lft-sm\">" + keywords.value + "</span></p>";
                }

                if (sourceLinkInfo + keywordInfo !== "") {
                    pageInfo = pageInfo + "<li id=\"pageInfoBtnGrp\" class=\"btn-group wb-inv\"><a id=\"pageInfoBtn\" class=\"btn btn-default btn-sm wb-lbx\" data-exit=\"false\" href=\"#dev-page-info\" aria-controls=\"dev-page-info\" role=\"button\" title=\"Page information\"><span class=\"glyphicon glyphicon-info-sign\"></span><span class=\"wb-inv\">Page information</span></a></li>";
                }

                pageInfo = pageInfo + "</ul></div>";
                if (sourceLinkInfo + keywordInfo !== "") {
                    pageInfo = pageInfo + "<section id=\"dev-page-info\" class=\"mfp-hide modal-dialog modal-content overlay-def\">\n    <header class=\"modal-header\">\n        <h2 class=\"modal-title\">Page information</h2>\n    </header>\n    <div class=\"modal-body\">\n";
                    pageInfo = pageInfo + sourceLinkInfo;
                    if (sourceLinkInfo !== "" && keywordInfo !== "") {
                        pageInfo = pageInfo + "\n<hr>\n";
                    }
                    pageInfo = pageInfo + titleInfo + subjectInfo + descriptionInfo + keywordInfo;
                    pageInfo = pageInfo + "\n    </div>\n</section>";
                }
                document.getElementById("test-banner").innerHTML = pageInfo + document.getElementById("test-banner").innerHTML;
            }


            if (document.getElementById("test-banner-content") !== null && sourceLinkInfo !== "") {
                document.getElementById("test-banner-content").innerHTML = document.getElementById("test-banner-content").innerHTML + sourceLinkInfo;
            }

            if (document.getElementById("test-banner-content") !== null && keywordInfo !== "") {
                document.getElementById("test-banner-content").innerHTML = document.getElementById("test-banner-content").innerHTML + keywordInfo;
            }


            if (document.getElementById("devtoolbar") !== null) {
        
                // Initalize Edit button
                if (document.getElementById("editBtn") !== null) {
                    document.getElementById("editBtn").addEventListener("click", function (event) {
                        if (document.getElementsByTagName("main").contentEditable === "true") {
                            document.getElementsByTagName("main").contentEditable = "false";
                            document.designMode = "off";
                            void 0;
                            // saves cuurent modified page content to local storage
//                    sessionStorage.setItem("content", document.getElementsByTagName("main")[0].innerHTML);
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
                if (document.getElementById("githubBtn") !== null && gitURL !== "") {
                    document.getElementById("githubBtn").href = githubURL;
                }
        
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
