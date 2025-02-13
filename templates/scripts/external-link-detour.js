"use strict";

//  exitPage.value = "https://cra-design.github.io/gst-hst-business/exit-intent.html",
//  relExternalLnk.value = "false",
//  relExternalLnk.dataset.origin = "https://www.canada.ca",
let exitPage = document.getElementById("exitpage");
let relExternalLnk = document.getElementById("relextlnk");
let visitedLinkStyle = document.createElement("style"), 
    adjustLinks = function adjustLinks(elm, hrefSelector, actionSelector, formActionSelector, destStartPath) {
        let adjustHref = function adjustHref(el, destStartPath) {;
            if (destStartPath !== "") {
                return new URL(el.replace("?", "&"), destStartPath).href;
            }
            return el;
        }, 
        updateFormSubmit = function updateFormSubmit(formEl, formAttr) {
            let hiddenInEl;

            hiddenInEl = document.createElement("input");
            hiddenInEl.value = adjustHref(formEl[formAttr], destStartPath);
            hiddenInEl.name = "uri";
            hiddenInEl.type = "hidden";
            formEl.append(hiddenInEl);
            formEl[formAttr] = exitPage.value;
        };

        if (exitPage) {
            if (hrefSelector !== "") {
                $(elm).find(hrefSelector).each(function updateExitHref() {
                    /*
                    let urlObj = { "url": exitPage.value }
                    this.dataset.wbExitscript = JSON.stringify(urlObj);
                    this.classList.add("wb-exitscript");
                    */
                    this.href = adjustHref(this.href, destStartPath);
                    this.href = exitPage.value + "?uri=" + adjustHref(this.href, destStartPath) + "&pagetitle=" + encodeURIComponent(this.innerText);
                });
                /*
                $(".wb-exitscript").trigger("wb-init.wb-exitscript");
                */
            }

            if (actionSelector !== "") {
                $(elm).find(actionSelector).each(function updateExitAction() {
                    this.method = "GET";
                    updateFormSubmit(this, "action");
                });
            }

            if (formActionSelector !== "") {
                $(elm).find(formActionSelector).each(function updateExitForm() {
                    updateFormSubmit(this, "formaction");
                });
            }
        }
    }, 
    defaultadjustLinks = function defaultadjustLinks(elm, isAjaxed) {
        adjustLinks(elm, "a[href^='http']a:not([href^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", "form[action^='http']form:not([action^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript)", "input[formaction^='http']input:not([formaction^='" + rootDomain + "'], [data-exit='false'], .wb-exitscript), button[formaction^='http']button:not([formaction^='" + rootDomain + "'], [formaction^='/'], [data-exit='false'], .wb-exitscript)", "");
        if ((relExternalLnk && relExternalLnk.value === "true" && relExternalLnk.dataset.origin !== "") || isAjaxed === true) {
            adjustLinks(elm, "a[href^='/']a:not([data-exit='false'], .wb-exitscript)", "form[action^='/']form:not([data-exit='false'], .wb-exitscript)", "input[formaction^='/']input:not([data-exit='false'], .wb-exitscript), button[formaction^='/']button:not([data-exit='false'], .wb-exitscript)", relExternalLnk.dataset.origin);
        }        
    }, 
    getDomain = function (url) {
        let pattern = new RegExp("^(https?:\/\/[^\/]+\/[^\/]*\/?)"),
            domains = pattern.exec(url);

        return domains[0];
    }, 
    rootDomain = getDomain(window.location.origin + window.location.pathname);

//Remove visited link highlighting from links to exit page
if (exitPage) {
    visitedLinkStyle.innerHTML = "a[href*='" + exitPage.value + "']:visited{ color:#284162; }";
    $("head").append(visitedLinkStyle);
}

// changes all external site links and forms to go to destination link
$(document).on("wb-ready.wb", function () {
    defaultadjustLinks(this, false);
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
    defaultadjustLinks(this, true);
});
