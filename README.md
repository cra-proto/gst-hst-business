# GST/HST for Small Business [COP FY2024]

Project to optimize the content related to filing GST/HST returns.

**COP Timeframe:** [July 31, 2024 - February 2025]

## Important links

- [\[GST COP\] Scoped inventory page \(github\)](https://cra-design.github.io/gst-hst-business/index.html)
- [Github.dev](https://github.dev/cra-proto/gst-hst-business/blob/main/)
- [Github Canada.ca page template \(Jekyll\)](https://github.com/cra-proto/gst-hst-business/blob/main/templates/page_template_jekyll-en.html)
- [Github Canada.ca page template \(CDTS\)](https://github.com/cra-proto/gst-hst-business/blob/main/templates/page_template-e.html)

## Update procedures:

- Test development files will have `_proto#` appended to the end of the file name
- Changes will be committed by selecting `create a new branch` and then performing a `pull request` to merge the updated content
- Updates should have comments identifying what has been updated
- Any repository path structure changes should be communicated to all indivduals who directly update the repository

---

## Deleted files list

- None

## Design phase roadmap:

- [ ] Prototype: co-design navigation and content
- [ ] SME review and accuracy check
- [ ] Validation usability testing (including accessibility review)
- [ ] Refine prototype (if required)
- [ ] Spot check usability (if required)

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
    User testing and notetaking :done, b1, 2024-09-26, 19d
    Import scoped files to repo :done, a2, 2024-10-10, 9d
    Evaluation of user testing :active, b2, after b1, 14d
    Content and design updates and prototyping :after b2, 60d

```

\* future dates may be placeholders.

## Canada.ca path structure of scoped files

[https://www.canada.ca/en/revenue-agency/services/](https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/) \[50 pages\]

```mermaid
mindmap
  root((services))
    [e-services/digital-services-businesses - 3]
      [gst-hst-filing-remitting - 2]
      [gst-hst-internet-file-transfer - 8]
      [gst-hst-netfile - 10]
      [gst-hst-telefile - 7]
    [tax/businesses/topics - 1]
      [gst-hst-businesses - 10]
        [complete-file-return-business - 7]
          [file-returns - 1]
        [digital-economy-gsthst - 1]
```

**Updated:**  2024-11-06
