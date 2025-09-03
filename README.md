# GST/HST for Small Business [COP FY2024 - FY2025]

Project to optimize the content related to filing GST/HST returns.

**COP Timeframe:** [July 31, 2024 - June 2025]

## Important links

### Page management

- [\[GST COP\] Scoped inventory page \(github\)](https://cra-design.github.io/gst-hst-business/index.html)
- [Added/Deleted/Modified files and pages to be published](https://github.com/cra-design/gst-hst-business/blob/main/docs/CHANGELOG.md)

### Information

- [Design phase roadmap](https://github.com/cra-design/gst-hst-business/blob/main/docs/ROADMAP.md)
- [Contribution guidelines](https://github.com/cra-design/gst-hst-business/blob/main/docs/CONTRIBUTING.md)
- [Support information](https://github.com/cra-design/core-prototype/blob/main/docs/SUPPORT.md)
- [Privacy statement](https://github.com/cra-design/gst-hst-business/blob/main/docs/PRIVACY.md)

### Templates

- [GitHub Canada.ca page template \(Jekyll\)](https://github.com/cra-design/gst-hst-business/blob/main/templates/page_template_jekyll-en.html)
- [GitHub Canada.ca page template \(CDTS\)](https://github.com/cra-design/gst-hst-business/blob/main/templates/page_template-e.html)
- [GitHub Canada.ca page template with login \(CDTS\)](https://github.com/cra-design/gst-hst-business/blob/main/templates/page_template_login-e.html)

### Tools

- [Github.dev](https://github.dev/cra-design/gst-hst-business/blob/main/)
- [Convert page to GCWeb/Jekyll page tool](https://cra-design.github.io/core-prototype/core/tools/page-convert-jekyll.html)

---

## Update procedures:

- Prototype development files will have `_proto#` appended to the end of the filename
- Changes will be committed to the repository by selecting `create a new branch` and then performing a `pull request` to merge the newly updated content
- Updates or pull requests should be named or have comments identifying what has been updated or changed
- Any repository path structure changes should be communicated to all individuals who directly update the repository
- Relative links should not be used on any pages and all links in the repository should be absolute links
- Create and name all files in the locations that reflects what they will be named and where they will be eventually be published when created on Canada.ca
- Follow [Government of Canada domains and URLs - How to write URLs](https://design.canada.ca/specifications/mandatory-elements/domains-urls.html#du3a) guidelines for naming paths and files
- In the [_config.yml](https://github.com/cra-design/gst-hst-business/blob/main/_config.yml) file the `developerOptions:` setting should be changed to `false` before testing takes place

---

## Design phase roadmap:

- [x] Prototype: co-design navigation and content
- [x] SME review and accuracy check
- [x] Validation usability testing (including accessibility review)
- [x] Refine prototype (if required)
- [ ] ~~Spot check usability (if required)~~

```mermaid
%%{
  init: {
    'darkMode': false, 
    'theme': 'base', 
    'themeVariables': {
      'lineColor': '#F8B229', 
      'textColor': '#ADADAD', 
      'primaryColor': '#000ED6', 
      'primaryBorderColor': '#534FBC', 
      'primaryTextColor': '#ADADAD', 
      'secondaryColor': '#850000', 
      'secondaryTextColor': '#ADADAD', 
      'tertiaryColor': '#FFFFFF',  
      'tertiaryTextColor': '#ADADAD'
    }
  }
}%%

%% https://mermaid.js.org/config/directives.html#declaring-directives)](https://mermaid.js.org/config/directives.html#declaring-directives
%% https://mermaid.js.org/config/schema-docs/config-defs-gantt-diagram-config.html#toppadding

%% color theme need opened with the high contrast light theme.
gantt
    title Design phase timeframe
    dateFormat  YYYY-MM-DD
    section Design
    Create repository and page template files :done, a1, 2024-09-18, 3d
    Baseline user testing and notetaking :done, b1, 2024-09-26, 19d
    Import scoped files to repo :done, a2, 2024-10-10, 9d
    Evaluation of baseline user testing :done, b2, after b1, 14d
    Content and design updates and prototyping :after b2, 134d
    Validation user testing and notetaking :active, b3, 2025-03-12, 20d

```

\* future dates may be placeholders.

---

## Canada.ca path structure of scoped files

[https://www.canada.ca/en/revenue-agency/services/](https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/) \[66 pages\]

```mermaid
mindmap
  root((services))
    [e-services/digital-services-businesses - 3]
      [gst-hst-filing-remitting - 2]
      [gst-hst-internet-file-transfer - 8]
      [gst-hst-netfile - 10]
      [gst-hst-telefile - 7]
    [tax/businesses/topics - 1]
      [calculate-prepare-report - 4]
      [file-return - 5]
        [how-file - 7]
        [reporting-requirements-deadlines - 1]
      [gst-hst-businesses - 10]
        [complete-file-return-business - 6]
          [file-returns - 1]
        [digital-economy-gsthst - 1]
```

**Updated:**  2025-06-05
