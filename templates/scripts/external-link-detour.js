"use strict";

var linkExcludes = {};

//  exitPage.value = "https://cra-design.github.io/gst-hst-business/exit-intent.html",
//  relExternalLnk.value = "false",
//  relExternalLnk.dataset.origin = "https://www.canada.ca",

let exitPage = document.getElementById("exitpage");
let relExternalLnk = document.getElementById("relextlnk");
let linkExcludeURI = "/gst-hst-business/assets/data/link_excludes.json", 
    visitedLinkStyle = document.createElement("style"), 
    adjustLinks = function adjustLinks(elm, hrefSelector, actionSelector, formActionSelector, destStartPath) {
        let adjustHref = function adjustHref(el, destStartPath) {
            let adjustedURI = el, 
                replaceChar = ["?", "#", "&"];

            if (destStartPath !== "") {
                adjustedURI = new URL(adjustedURI, destStartPath).href;
            }
            replaceChar.forEach(function entityReplace (arrEl) {
                adjustedURI = adjustedURI.replace(arrEl, encodeURIComponent(arrEl));
            }, adjustedURI);
            return adjustedURI;
        }, 
        updateFormSubmit = function updateFormSubmit(formEl, formAttr, exitPageURI) {
            let hiddenInEl;

            hiddenInEl = document.createElement("input");
            hiddenInEl.value = adjustHref(formEl[formAttr], destStartPath);
            hiddenInEl.name = "uri";
            hiddenInEl.type = "hidden";
            formEl.append(hiddenInEl);
            formEl[formAttr] = exitPageURI;
        };

        if (exitPage) {
            if (hrefSelector !== "") {
                $(elm).find(hrefSelector).each(function updateExitHref() {
                    const maxURILength = 2048;
                    let pagetitle = encodeURIComponent(this.innerText),
                        exitPageURI = exitPage.value, 
                        destURI = adjustHref(this.href, destStartPath), 
                        currentURI = this.protocol + "//" + this.hostname + this.pathname, 
                        linkExcludeIndex = linkExcludes.exitLinkExcludes.findIndex(function findlink(linkArr) {
                            if ("origin" in linkArr) {
                                return linkArr["origin"].toLowerCase() === currentURI.toLowerCase();
                            }
                        }, currentURI);

                    if (linkExcludeIndex === -1) {
                        /*
                        let urlObj = { "url": exitPageURI }
                        this.dataset.wbExitscript = JSON.stringify(urlObj);
                        this.classList.add("wb-exitscript");
                        */
                        if (pagetitle === "") {
                            pagetitle = encodeURIComponent(this.textContent);
                        }
                        switch (true) {
                            case exitPageURI.length + destURI.length + 5 <= maxURILength:
                                exitPageURI = exitPageURI + "?uri=" + destURI;
                            case exitPageURI + pagetitle.length + 11 <= maxURILength:
                                exitPageURI = exitPageURI + "&pagetitle=" + pagetitle;
                        }
                        this.href = exitPageURI;
                    } else if ("destination" in linkExcludes.exitLinkExcludes[linkExcludeIndex] === true) {
                        this.href = linkExcludes.exitLinkExcludes[linkExcludeIndex].destination;
                    } else {
                        this.href = exitPageURI;
                    }
                });
                /*
                $(".wb-exitscript").trigger("wb-init.wb-exitscript");
                */
            }

            if (actionSelector !== "") {
                $(elm).find(actionSelector).each(function updateExitAction() {
                    this.method = "GET";
                    updateFormSubmit(this, "action", exitPage.value);
                });
            }

            if (formActionSelector !== "") {
                $(elm).find(formActionSelector).each(function updateExitForm() {
                    updateFormSubmit(this, "formaction", exitPage.value);
                });
            }
        }
    }, 
    getDomain = function (url) {
        let pattern = new RegExp("^(https?:\/\/[^\/]+\/[^\/]*\/?)"),
            domains = pattern.exec(url);

        return domains[0];
    }, 
    rootDomain = getDomain(window.location.origin + window.location.pathname), 
    defaultadjustLinks = function defaultadjustLinks(elm, isAjaxed, relExternalLnk) {
        adjustLinks(elm, "a[href^='http']a:not([href^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", "form[action^='http']form:not([action^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", "input[formaction^='http']input:not([formaction^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript), button[formaction^='http']button:not([formaction^='" + rootDomain + "'], [formaction^='/'], [data-exit='false'], .wb-exitscript)", "");
        if ((relExternalLnk && relExternalLnk.value === "true" && relExternalLnk.dataset.origin !== "") || isAjaxed === true) {
            adjustLinks(elm, "a[href^='/']a:not([data-exit='false'], .wb-exitscript)", "form[action^='/']form:not([data-exit='false'], .wb-exitscript)", "input[formaction^='/']input:not([data-exit='false'], .wb-exitscript), button[formaction^='/']button:not([data-exit='false'], .wb-exitscript)", relExternalLnk.dataset.origin);
        }        
    };

linkExcludes.exitLinkExcludes = [];

//load link exclude json file
$.getJSON(linkExcludeURI, function(data) {
    linkExcludes = data;
});

//Remove visited link highlighting from links to exit page
if (exitPage) {
    visitedLinkStyle.innerHTML = ".btn-primary[href*='" + exitPage.value + "']:visited, .btn-success[href*='" + exitPage.value + "']:visited, .btn-info[href*='" + exitPage.value + "']:visited, .btn-danger[href*='" + exitPage.value + "']:visited { color: #fff; } .btn-default[href*='" + exitPage.value + "']:visited { color: #335075; } .btn-warning[href*='" + exitPage.value + "']:visited { color: #000; } a[href*='" + exitPage.value + "']:visited{ color:inherit; } ";
    $("head").append(visitedLinkStyle);
}

// changes all external site links and forms to go to destination link
$(document).on("wb-ready.wb", function () {
    defaultadjustLinks(this, false, relExternalLnk);
});

// changes all GCM Menu external site links and forms to go to destination link
$(".gcweb-menu").on("wb-ready.gcweb-menu", function () {
    adjustLinks(this, ".gcweb-menu a[href^='http']a:not([href^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", ".gcweb-menu form[action^='http']form:not([action^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", ".gcweb-menu input[formaction^='http']input:not([formaction^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript), .gcweb-menu button[formaction^='http']button:not([formaction^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", "");
    if (relExternalLnk && relExternalLnk.value === "true" && relExternalLnk.dataset.origin !== "") {
        adjustLinks(this, ".gcweb-menu a[href^='/']a:not([data-exit='false'], .wb-exitscript)", ".gcweb-menu form[action^='/']form:not([data-exit='false'], .wb-exitscript)", ".gcweb-menu input[formaction^='/']input:not([data-exit='false'], .wb-exitscript), .gcweb-menu button[formaction^='/']button:not([data-exit='false'], .wb-exitscript)", relExternalLnk.dataset.origin);
    }
});

// changes all ajaxed external site links and forms to go to destination link
$("[data-ajax-after], [data-ajax-append], [data-ajax-before], [data-ajax-prepend], [data-ajax-replace]").on("wb-contentupdated", function (event, data) {
    defaultadjustLinks(this, true, relExternalLnk);
});
