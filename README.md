# SurveyJS Analytics Package

The purpose of this package is to enable the aggregation of SurveyJS surveys along with SurveyJS responses.

Say we have a very simple survey:

```json
{
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "checkbox",
                    "name": "question1",
                    "choices": [
                        "item1",
                        "item2",
                        "item3"
                    ]
                }
            ]
        }
    ]
}
```

Along with a few simple responses in the following format:

```json
[
    {
        "response": {
            "question1": [
                "item1",
                "item2"
            ]
        }
    },
    {
        "response": {
            "question1": [
                "item1",
                "item2",
                "item3"
            ]
        }
    },
]
```

We would be able to get the following aggregate:

```json
{
    "question1": {
        "type": "checkbox",
        "name": "question1",
        "description": null,
        "title": "question1",
        "pageName": "page1",
        "pageTitle": "page1",
        "pageIndex": 0,
        "pageDescription": null,
        "isQuestion": true,
        "aggregateTotal": 2,
        "hasOther": false,
        "hasNone": false,
        "otherText": null,
        "noneText": null,
        "values": {
            "item1": {
                "text": "item1",
                "value": "item1",
                "raw": 2,
                "rank": 1
            },
            "item2": {
                "text": "item2",
                "value": "item2",
                "raw": 2,
                "rank": 2
            },
            "item3": {
                "text": "item3",
                "value": "item3",
                "raw": 1,
                "rank": 3
            }
        }
    }
}
```