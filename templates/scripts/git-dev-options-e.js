/*
* Github only script
*
* Creates developer buttons - go to github source version annd contenEditable page edit buttons 
*
*/

"use strict";

let devOptions = document.getElementById("devoptions");
let keywords = document.getElementById("pageKeywords");
let sourceUrlList = document.getElementById("sourceurl");
let insertId = "test-banner";

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
        devOptionsLocStore = null, 
        gitURL = "",
        sourceLinkInfo = "", 
        metadataInfo = "", 
        overlaySec = "";

    if (devOptions !== null && "locStorage" in devOptions.dataset && devOptions.dataset.locStorage !== "") {
        devOptionsLocStore = localStorage.getItem(devOptions.dataset.locStorage);
    }

    if (devOptionsLocStore === "true" || (devOptions !== null && devOptions.value.toLowerCase() === "true" && devOptionsLocStore !== "false")) {
        $("#site-banner-inc").on("wb-contentupdated", function () {
            // Add toolbar and buttons
            if (document.getElementById(insertId) !== null) {
                gitURL = getGithubURL(window.location.origin + window.location.pathname);
                pageInfo = "<div id=\"devtoolbar\" class=\"pull-right mrgn-rght-md\">\n    <ul class=\"btn-toolbar list-inline\" role=\"toolbar\">\n        <li id=\"editBtnGrp\" class=\"btn-group\"><a id=\"editBtn\" class=\"btn btn-default btn-sm\" data-exit=\"false\" href=\"\" title=\"Edit\"><span class=\"fa fa-edit mrgn-tp-sm\"></span><span class=\"wb-inv\">Edit</span></a></li>\n";
                if (sourceUrlList !== null && sourceUrlList.value !== "") {
                    sourceUrlArr = JSON.parse(sourceUrlList.value);
                    if ((sourceUrlArr.length === 1 && sourceUrlArr[0].sourcetitle.trim() !== "") || sourceUrlArr.length > 1) {
                        sourceLinkInfo = "<h3 class=\"mrgn-tp-sm\">Pertinent links</h3>\n<ol id=\"testpage-source\" class=\"list-inline mrgn-bttm-0\">\n";
                        sourceUrlArr.forEach(function addSourceLinks(sourceUrlData) {
                           sourceLinkInfo = sourceLinkInfo + "<li><span class=\"glyphicon glyphicon-link\"></span><a data-exit=\"false\" href=\"" + sourceUrlData.sourcelink + "\" target=\"_blank\">" + sourceUrlData.sourcetitle + "</a></li>\n";
                        });
                        sourceLinkInfo = sourceLinkInfo + "</ol>\n";
                    }
                }
                titleElm = document.querySelector("meta[name=dcterms\\.title]");
                if (titleElm !== null && "content" in titleElm === true && titleElm.content.trim() !== "") {
                    metadataInfo = metadataInfo + "<p class=\"mrgn-bttm-sm\"><strong>Title</strong>:&nbsp;" + titleElm.content.trim() + "</p>\n";
                }
                subjectElm = document.querySelector("meta[name=dcterms\\.subject]");
                if (subjectElm !== null && "content" in subjectElm === true && subjectElm.content.trim() !== "") {
                    metadataInfo = metadataInfo + "<p class=\"mrgn-bttm-sm\"><strong>Subject</strong>:&nbsp;" + subjectElm.content.trim() + "</p>\n";
                }
                descriptionElm = document.querySelector("meta[name=dcterms\\.description]");
                if (descriptionElm !== null && "content" in descriptionElm === true && descriptionElm.content.trim() !== "") {
                    metadataInfo = metadataInfo + "<p class=\"mrgn-bttm-sm\"><strong>Description</strong>:&nbsp;" + descriptionElm.content.trim() + "</p>\n";
                }
                if (keywords !== null && keywords.value.trim() !== "") {
                    metadataInfo = metadataInfo + "<p><strong>Keywords</strong>:&nbsp;<span id=\"pageKeywords\" class=\"mrgn-lft-sm\">" + keywords.value + "</span></p>";
                }

                if (sourceLinkInfo + metadataInfo !== "") {
                    pageInfo = pageInfo + "        <li id=\"pageInfoBtnGrp\" class=\"btn-group\"><a id=\"pageInfoBtn\" class=\"btn btn-default btn-sm wb-lbx\" data-exit=\"false\" href=\"#dev-page-info\" aria-controls=\"dev-page-info\" role=\"button\" title=\"Page information\"><span class=\"glyphicon glyphicon-info-sign mrgn-tp-sm\"></span><span class=\"wb-inv\">Page information</span></a></li>\n";
                }

                if (gitURL !== "") {
                    pageInfo = pageInfo + "        <li id=\"githubBtnGrp\" class=\"btn-group\"><a id=\"githubBtn\" class=\"btn btn-default btn-sm\" data-exit=\"false\" href=\"#\" title=\"Go to Github source\" target=\"_blank\"><span class=\"fab fa-github mrgn-tp-sm\"></span><span class=\"wb-inv\">Go to Github source</span></a></li>\n";
                }

                pageInfo = pageInfo + "    </ul>\n</div>\n";
                document.getElementById(insertId).innerHTML = pageInfo + document.getElementById(insertId).innerHTML;
                if (sourceLinkInfo + metadataInfo !== "") {
                    overlaySec = overlaySec + "<section id=\"dev-page-info\" class=\"mfp-hide modal-dialog modal-content overlay-def\">\n    <header class=\"modal-header\">\n        <h2 class=\"modal-title\">Page information</h2>\n    </header>\n    <div id=\"dev-info-body\" class=\"modal-body\">\n";
                    overlaySec = overlaySec + sourceLinkInfo;
                    if (sourceLinkInfo !== "" && metadataInfo !== "") {
                        overlaySec = overlaySec + "\n<hr>\n";
                    }
                    overlaySec = overlaySec + "<h3 class=\"mrgn-tp-sm mrgn-bttm-md\">Metadata</h3>\n" + metadataInfo;
                    overlaySec = overlaySec + "\n    </div>\n</section>\n";
                    document.getElementById(insertId).outerHTML = document.getElementById(insertId).outerHTML + overlaySec;
                    $(".wb-lbx").trigger("wb-init.wb-lbx");
                }
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
//                            sessionStorage.setItem("content", document.getElementsByTagName("main")[0].innerHTML);
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
                    document.getElementById("githubBtn").href = gitURL;
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
