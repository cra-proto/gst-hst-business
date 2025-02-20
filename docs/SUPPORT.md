# Support information

> [!NOTE]
> Make sure to use the spacing indicated below or in the page templates as improper spacing and layout of values can cause issues in the how the page is generated

## GCWeb Jekyll page template example

```yaml
---

# The "#" character can be used to create comments

layout: ["default"]                                # Available layout types: core, default, application, documentation, fluid, home, no-container, servermesssage, splashpage-en, without-h1
lang: ["en" | "fr"]                                # This value will set the page language
title: "The title of the current page"             # This value will set the title and h1 tag
sectionTitle: "Section title for the page"         # This value will set the section title above the h1 tag
titleH1: "The header of the current page"          # This value will set the h1 tag (title over rides)
description: "Description of the current page"     # Optional. Metadata description
subject: "the subject of the current page"         # Optional. Metadata subject
altLangPage: "The url"                             # Optional. Use the url of the alternate language page to display the language toggle
auth:
  type: ["signedoff" | "active" | "contextual"]    # Optional. Creates and configures a sign in button
  label: "Sign in button label"                    # Label of the sign in button
  labelExtended: "Sign in button extended label"   # Extended label of the sign in button
  link: "The url"                                  # link of the sign in button
breadcrumbs:                                       # By default the Canada.ca breadcrumbs is already set
  - title: "The title"
    link: "The url"
feedbackData:
  section: "The title of the current page"         # This value sets what to identify the page as in the feedback section for when feedback is sent    
dateIssued: YYYY-MM-DD                             # Optional. ISO date
dateModified: YYYY-MM-DD                           # ISO date
css: "https://domain/your-stylesheet.css"          # Optional. You can add custom css to your page
script: "https://domain/your-awesome-script.js"    # Optional. You can add custom javascript to your page
---

<p>Content that would be displayed on the page</p>
```

## Additional GCWeb Jekyll page template settings (Optional)

```yaml
breadcrumbs: false                                 # Disable the breadcrumb
overwriteBreadcrumbs:

nositesearch: true                                 # Remove the site search
nomenu: true                                       # Remove the top menu
feedback: false                                    # Remove the feedback
share: false                                       # Remove the share button
noFooterMain: true                                 # Remove the footer
noFooterContextual: true                           # Remove the Contextual footer
noFooterCorporate: true                            # Remove the Corporate footer
archived: true                                     # Adds the archived banner to the top of the page
privacyUrl: "privacy page url"                     #
termsUrl: "terms and conditions page url"          #
secondarymenu:                                     
parentPage:                                        
pageclass: "page css class"                        # css class to add to the <body> tag  
creator: "the page creator"                        #
applicationName:
applicationURL:
css: "https://domain/your-stylesheet.css"          # Optional. You can add custom css to your entire site
script: "https://domain/your-awesome-script.js"    # Optional. You can add custom javascript to your entire site
```

## Site [_config.yml](https://github.com/cra-design/gst-hst-business/blob/main/_config.yml) file options
[//]: # (**************************Test comment*********************************)
```yaml
layout: default
lang: en
share: true
sitemenu: true
sitesearch: true
feedback: true
feedbackData:
  theme: "Taxes"
feedbackPath: "https://www.canada.ca/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html"
privacyUrl: "https://www.canada.ca/en/revenue-agency/corporate/privacy-notice.html"
termsURL: "https://www.canada.ca/en/transparency/terms.html"
creator:
  en: "Canada Revenue Agency"
  fr: "Agence du revenu du Canada"
contextualFooter:
  title: "Canada Revenue Agency (CRA)"
  links:
   - text: "Contact the CRA"
     url: "https://www.canada.ca/en/revenue-agency/corporate/contact-information.html"
```

## Custom page options

```yaml
testBanner: [true | false]                         # Optional. Can toggle the banner off or on for a page
soureceurl:                                        # Optional. Links will be added to the page banner 
  - title: "The title" 
    link: "The url"
```

## Custom site [_config.yml](https://github.com/cra-design/gst-hst-business/blob/main/_config.yml) file options

```yaml
siteBanner: [true | false]                         # Toggles the site wide banner off and on for the site
developerOptions: [true | false]                   # Turns the developer options on/off for all pages (edit button, github button, cuntom banner links, exit page leave site button)

exitPage: "Exit intent page url"                   # Identifies the link to the exit intent page used for link generation on all pages
exitByURL: [true | false]                          # Toggles if the exit page uses the developed method or if it uses the WET Exit plugin. Default is true 
relativeExternalLinks: [true | false]              # Identifies whether links to the exit intent page will be generated from relative links where the link starts with "/"
externalOrigin: "https://domain"                   # The domain will be prepended to all links on all pages where the link starts with "/"
relativeExternalLinks: false
```

## Resources

- [User Centered Design Guide](https://design.cra-arc.alpha.canada.ca/en/index.html)
- [GCWeb, the WET-BOEW Canada.ca theme](https://wet-boew.github.io/GCWeb/index-en.html)
- [Mermaid markdown documentation](https://mermaid.js.org/intro/getting-started.html)
- [Jekyll theme for GCWeb](https://github.com/wet-boew/gcweb-jekyll)
- [Web page creation - GCWeb Jekyll \(translated\)](https://wet--boew-github-io.translate.goog/gcweb-jekyll/pages/index-fr.html?_x_tr_sl=fr&_x_tr_tl=en&_x_tr_hl=en-US&_x_tr_pto=wapp)
- [Variables | Jekyll](https://jekyllrb.com/docs/variables/)
- [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
- [Learn YAML in Y minutes](https://learnxinyminutes.com/docs/yaml/)
- [Centrally Deployed Templates Solutions \(CDTS\) - Internet](https://cenw-wscoe.github.io/sgdc-cdts/docs/internet-nodocwrite-en.html)
- [GitHub Help](https://help.github.com)
