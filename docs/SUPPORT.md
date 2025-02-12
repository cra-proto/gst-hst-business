# Support information

> [!NOTE]
> Make sure to use the spacing indicated below or in the page templates as improper spacing and layout of values can cause issues in the how the page is generated

## GCWeb Jekyll page template example

```yaml
---

# The "#" character can be used to create comments

layout: [default]                                  # Available: core, default, fluid, layout-home, layout-servermesssage, layout-splashpage, no-container, without-h1
title: "The title of the current page"             # This value will set the title and h1 tag
sectionTitle: "Section title for the page"         # This value will set the section title above the h1 tag
titleH1: "The header of the current page"          # This value will set the h1 tag (title over rides)
lang: [en | fr]                                    # Either "en" or "fr"
description: "Description of the current page"     # Optional. Metadata description
subject: "the subject of the current page"         # Optional. Metadata subject
auth:
  type: [signedoff | active | contextual]          # Optional. Creates and configures a sign in button
  label: "Sign in button label"                    # Label of the sign in button
  labelExtended: "Sign in button extended label"   # Extended label of the sign in button
  link: "The url"                                  # link of the sign in button
altLangPage: "The url"                             # Optional. Use the url of the alternate language page to display the language toggle
dateModified: YYYY-MM-DD                           # ISO date
dateIssued: YYYY-MM-DD                             # Optional. ISO date
breadcrumbs:                                       # By default the Canada.ca breadcrumbs is already set
  - title: "The title"
    link: "The url"
css: "https://domain/your-stylesheet.css"          # Optional. You can add custom css to your page
script: "https://domain/your-awesome-script.js"    # Optional. You can add custom javascript to your page
---

<p>Content that would be displayed on the page</p>
```

## Additional GCWeb Jekyll page template settings (Optional)

```yaml
breadcrumbs: false                                 # Disable the breadcrumb

nositesearch: true                                 # Remove the site search
nomenu: true                                       # Remove the top menu
feedback: false                                    # Remove the feedback
share: false                                       # Remove the share button
noFooterMain: true                                 # Remove the footer
noFooterContextual: true                           # Remove the Contextual footer
noFooterCorporate: true                            # Remove the Corporate footer
```

## Custom page options

```yaml
layout: [default]                                  # Available: no-test-banner, without-h1-test-banner
soureceurl:                                        # Optional. Links will be added to the page banner 
  - title: "The title" 
    link: "The url"
```

## Custom site [_config.yml](https://github.com/cra-design/gst-hst-business/blob/main/_config.yml) file options

```yaml
exitPage: "Exit intent page url"                   # Identifies the link to the exit intent page used for link generation on all pages
relativeExternalLinks: [true | false]              # Identifies whether links to the exit intent page will be generated from relative links where the link starts with "/"
externalOrigin: "https://domain"                   # The domain will be prepended to all links on all pages where the link starts with "/"
relativeExternalLinks: false
developerOptions: [true | false]                   # Turns the developer options on/off for all pages (edit button, github button, cuntom banner links, exit page leave site button)
```

## Previewing the theme locally

If you'd like to preview the theme locally (for example, in the process of proposing a change):

1. Clone down the theme's repository (`git clone https://github.com/wet-boew/gcweb-jekyll`)
2. `cd` into the theme's directory
3. Run `script/bootstrap` to install the necessary dependencies
4. Run `bundle exec jekyll serve` to start the preview server
5. Visit [`localhost:4000`](http://localhost:4000) in your browser to preview the theme

## Running tests

The theme contains a minimal test suite, to ensure a site with the theme would build successfully. To run the tests, simply run `script/cibuild`. You'll need to run `script/bootstrap` one before the test script will work.

## Resources

- [User Centered Design Guide](https://design.cra-arc.alpha.canada.ca/en/index.html)
- [GCWeb, the WET-BOEW Canada.ca theme](https://wet-boew.github.io/GCWeb/index-en.html)
- [Mermaid markdown documentation](https://mermaid.js.org/intro/getting-started.html)
- [Jekyll theme for GCWeb](https://github.com/wet-boew/gcweb-jekyll)
- [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
- [Learn YAML in Y minutes](https://learnxinyminutes.com/docs/yaml/)
- [Centrally Deployed Templates Solutions \(CDTS\) - Internet](https://cenw-wscoe.github.io/sgdc-cdts/docs/internet-nodocwrite-en.html)
- [GitHub Help](https://help.github.com)
