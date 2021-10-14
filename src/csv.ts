const y = {
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "text",
                    name: "question1"
                },
                {
                    type: "comment",
                    name: "question3"
                },
                {
                    type: "checkbox",
                    name: "question2",
                    choices: ["item1", "item2", "item3"]
                }
            ]
        },
        {
            name: "page2",
            elements: [
                {
                    type: "radiogroup",
                    name: "question4",
                    choices: ["item1", "item2", "item3"]
                },
                {
                    type: "matrix",
                    name: "question5",
                    columns: ["Column 1", "Column 2", "Column 3"],
                    rows: ["Row 1", "Row 2"]
                }
            ]
        }
    ]
};
const z = {
    question1: "q1",
    question3: "q2",
    question2: ["item1", "item2"],
    question4: "item2",
    question5: {
        "Row 1": "Column 1",
        "Row 2": "Column 1"
    }
};
const z1 = {
    question5: {
        "Row 1": "Column 1"
    }
};

const generateHeaders = (flatQuestions) => {
    const headers = [];
    flatQuestions.forEach((question, questionIndex) => {
        const title = question.title || question.name;
        if (question.type === "matrix") {
            headers.push(`Q${questionIndex + 1}. ${title}`);
            question.rows.forEach((row, rowIndex) => {
                const rowTitle = row.title || row;
                headers.push(
                    `Q${questionIndex + 1}.${rowIndex + 1} ${rowTitle}`
                );
            });
        } else {
            headers.push(`Q${questionIndex + 1}. ${title}`);
        }
    });
    console.log(headers);
    return headers;
};

const generateRow = (flatQuestions, response, na) => {
    const rowArr = [];
    flatQuestions.forEach((question) => {
        switch (question.type) {
            case "matrix":
                // default question
                row.push(na);
                question.rows.forEach((row) => {
                   const rowName = row.name || row;
                    if (!response[question.name][rowName]) {
                        row.push(na);
                    } else {
                        const col = response[question.name][rowName];
                    }
                });
                break;
            case "checkbox":
                break;
            default:
        }
        if (!response[question.name]) {
            rowArr.push(na);
            if (question.type === "matrix") {
                question.rows.forEach((row, rowIndex) => {
                    rowArr.push(na);
                    if
                });
            }
            return;
        }
        if (question.type === "matrix") {
            rowArr.push(na);
            question.rows.forEach((row, rowIndex) => {
                const rowName = row.name || row;
                rowArr.push(response[question.name][rowName] || na);
            });
            return;
        } else {
            if (Array.isArray(response[question.name])) {
                rowArr.push(response[question.name].join(","));
            } else {
                rowArr.push(response[question.name]);
            }
        }
    });
    return rowArr;
};

const generateRow = (flatQuestions, response, na) => {
    const rowArr = [];
    flatQuestions.forEach((question) => {
        if (!response[question.name]) {
            rowArr.push(na);
            if (question.type === "matrix") {
                question.rows.forEach((row, rowIndex) => {
                    rowArr.push(na);
                });
            }
            return;
        }
        if (question.type === "matrix") {
            rowArr.push(na);
            question.rows.forEach((row, rowIndex) => {
                const rowName = row.name || row;
                rowArr.push(response[question.name][rowName] || na);
            });
            return;
        } else {
            if (Array.isArray(response[question.name])) {
                rowArr.push(response[question.name].join(","));
            } else {
                rowArr.push(response[question.name]);
            }
        }
    });
    return rowArr;
};

const stuff = (survey) => {
    const flatQuestions = survey.pages.map((page) => page.elements).flat();
    console.log(flatQuestions);
    const headers = generateHeaders(flatQuestions);
    const row1 = generateRow(flatQuestions, z, "");
    const row2 = generateRow(flatQuestions, z1, "");
    console.log(headers);
    console.log(row1);
    console.log(row2);
};

stuff(y);
