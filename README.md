# Netlify CMS / YoastSEO.js

YoastSEO content assessments for Netlify CMS.

* * *

## Demo

You can find a working demo in the [demo](/demo) directory.

You can also check out a standalone demo (without Netlify CMS) here: [https://content-score.indigotree.co.uk](https://content-score.indigotree.co.uk)

## Usage

Currently, assessment results are rendered within a CMS preview template. This means you will need custom preview templates for each of the collections you would like assessments on.

You will need to include the following 4 fields in each of your collections:

1. Title
2. Content
3. Focus Keyword
4. Meta Description

You can then use a custom preview template to render the assessment results as shown below:

```
CMS.registerPreviewStyle('../dist/main.css');

CMS.registerPreviewTemplate('page', createClass({
    render: function () {
        const entry = this.props.entry
        const title = entry.getIn(['data', 'title']) || ''

        YOAST.setContent({
            title: title,
            description: entry.getIn(['data', 'description']) || '',
            keyword: entry.getIn(['data', 'yoast_keyword']) || '',
            text: entry.getIn(['data', 'body']) || '',
            titleWidth: title.split('').length * 5 // 5px is an average width of each character ;)
        })

        return h('div', {},
            this.props.widgetFor('body'),
            YOAST.getScoresAsHTML(h)
        );
    }
}));
```

You can find a full working example within the [demo](/demo) directory.

## License

GPL-3.0
