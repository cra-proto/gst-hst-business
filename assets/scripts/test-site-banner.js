"use strict";

let githubURL,
    getGithubURL = function (pageURL) {
        var pageName = "";
        if (pageURL.indexOf(".htm") === -1) {
            pageName = "index.html";
        };

        if (pageURL.indexOf(".github.io/") > -1) {
            return pageURL.toString().replace(/^https:\/\/(.*?)\.github\.io\/(.*?)\/((?:.*)(?=\/))?(\/?.*\.(?:[^\?#])*)?/, "https:\/\/github\.com\/$1\/$2\/blob\/main\/$3$4" + pageName);
        } else if (pageURL.indexOf("://test.canada.ca/") > -1) {
            return pageURL.toString().replace(/^https:\/\/test\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\.(?:[^\?#])*)?/, "https:\/\/github\.com\/gc-proto\/$1\/blob/master/$2$3" + pageName);
        } else if (pageURL.indexOf(".alpha.canada.ca/") > -1) {
            return pageURL.toString().replace(/^https:\/\/design\.cra-arc\.alpha\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\.(?:[^\?#])*)?/, "https:\/\/github\.com\/alpha-canada-ca\/cra-ucd-guide\/blob/main/$1\/$2$3" + pageName);
            return "#";
        }
        return "";
    };

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

githubURL = getGithubURL(window.location.href);
if (githubURL === "") {
    document.getElementById("githubBtnGrp").classList.add("wb-inv");
} else {
    document.getElementById("devtoolbar").classList.add("mrgn-rght-md");
    document.getElementById("githubBtn").href = githubURL;
}
