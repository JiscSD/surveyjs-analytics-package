import _ from 'lodash';

interface Response {
    [key: string]: any;
};

interface ResponseParams {
    [key: string]: any;
}

interface ResponseObject {
    id?: string;
    response: Response;
    dateSubmitted?: string;
    params?: ResponseParams;
};

interface AggregateOptions {
    survey: any;
    responses: Array<ResponseObject>;
    calculateStatistics?: boolean;
    excludedFields?: Array<string>;
    includeText?: boolean;
    limitText?: number;
};

// interface QuestionObject {
//     type: string;
//     name: string;
//     description: string | null;
//     title: string | null;
//     pageName: string;
//     pageTitle: string;
//     pageIndex: number;
//     pageDescription: string | null;
//     isQuestion: boolean;
//     aggregateTotal: number;
//     hasOther?: boolean;
//     hasNone?: boolean;
//     otherText?: string | null;
//     noneText?: string | null;
//     values: any;
// };

// interface SurveyObject {
//     [questionName: string]: QuestionObject;
// };

enum QuestionType {
    SingleInput = 'text',
    Comment = 'comment',
    Checkbox = 'checkbox',
    RadioGroup = 'radiogroup',
    Rating = 'rating',
    MatrixSingleChoice = 'matrix'
};

export const generateAggregateSurveyObject = (options: AggregateOptions): any => {
    const surveyObject = {};

    options.survey.pages.forEach((surveyPage, surveyPageIndex) => {
        surveyPage.elements.forEach((surveyQuestion) => {
            surveyObject[surveyQuestion.name] = {
                type: surveyQuestion.type,
                name: surveyQuestion.name,
                description: surveyQuestion.description || null,
                title: surveyQuestion.title || surveyQuestion.name,
                pageName: surveyPage.name,
                pageTitle: surveyPage.title || surveyPage.name,
                pageIndex: surveyPageIndex,
                pageDescription: surveyPage.description || null,
                isQuestion: true,
                aggregateTotal: 0
            };

            switch (surveyQuestion.type) {
                case QuestionType.SingleInput:
                case QuestionType.Comment:
                    surveyObject[surveyQuestion.name].inputMask = surveyQuestion.inputMask || null;
                    surveyObject[surveyQuestion.name].inputType = surveyQuestion.inputType || null;
                    surveyObject[surveyQuestion.name].values = [];
                    break;
                case QuestionType.Checkbox:
                case QuestionType.RadioGroup:
                    const hasOther = surveyQuestion.hasOther || false;
                    const hasNone = surveyQuestion.hasNone || false;
                    const otherText = surveyQuestion.otherText || null;
                    const noneText = surveyQuestion.noneText || null;

                    surveyObject[surveyQuestion.name].hasOther = hasOther;
                    surveyObject[surveyQuestion.name].hasNone = hasNone;
                    surveyObject[surveyQuestion.name].otherText = otherText;
                    surveyObject[surveyQuestion.name].noneText = noneText;
                    surveyObject[surveyQuestion.name].values = {};

                    surveyQuestion.choices.forEach((choice, choiceIndex) => {
                        const choiceValue = typeof choice === 'string' ? choice : choice.value;
                        const choiceText = typeof choice === 'string' ? choice : choice.text;

                        surveyObject[surveyQuestion.name].values[choiceValue] = {
                            text: choiceText,
                            value: choiceValue,
                            raw: 0,
                            rank: choiceIndex + 1
                        };
                    });

                    if (hasNone) {
                        surveyObject[surveyQuestion.name].values.none = {
                            text: noneText || 'none',
                            value: 'none',
                            raw: 0,
                            rank: Object.keys(surveyObject[surveyQuestion.name].values).length + 1
                        };
                    }

                    if (hasOther) {
                        surveyObject[surveyQuestion.name].values.other = {
                            text: otherText || 'other',
                            value: 'other',
                            raw: 0,
                            rank: Object.keys(surveyObject[surveyQuestion.name].values).length + 1,
                            responses: []
                        };
                    }

                    break;
                case QuestionType.Rating:
                    const rateValues = surveyQuestion.rateValues || false;

                    const rateStep = !rateValues ? surveyQuestion.rateStep || 1 : null;
                    const rateMax = !rateValues ? surveyQuestion.rateMax || 5 : null;
                    const rateMin = !rateValues ? surveyQuestion.rateMin || 1 : null;

                    surveyObject[surveyQuestion.name].maxRateDescription = surveyQuestion.maxRateDescription || null;
                    surveyObject[surveyQuestion.name].minRateDescription = surveyQuestion.minRateDescription || null;
                    surveyObject[surveyQuestion.name].rateStep = rateStep;
                    surveyObject[surveyQuestion.name].rateMax = rateMax;
                    surveyObject[surveyQuestion.name].rateMin = rateMin;

                    surveyObject[surveyQuestion.name].values = {};

                    if (rateValues) {
                        rateValues.forEach((rate, rateIndex) => {
                            const rateValue = typeof rate === 'string' ? rate : rate.value;
                            const rateText = typeof rate === 'string' ? rate : rate.text;

                            surveyObject[surveyQuestion.name].values[rateValue] = {
                                text: rateText,
                                value: rateValue,
                                raw: 0,
                                rank: rateIndex + 1
                            };
                        })
                        break;
                    }

                    for (let i = rateMin, index = 1; i <= rateMax; i += rateStep, index++) {
                        surveyObject[surveyQuestion.name].values[i] = {
                            text: i,
                            value: i,
                            raw: 0,
                            rank: index + 1
                        }
                    }
                    break;
                case QuestionType.MatrixSingleChoice:
                    surveyObject[surveyQuestion.name].rows = {};
                    surveyQuestion.rows.forEach((row) => {
                        const rowValue = typeof row === 'string' ? row : row.value;
                        const rowText = typeof row === 'string' ? row : row.text;
                        surveyObject[surveyQuestion.name].rows[rowValue] = {
                            text: rowText,
                            value: rowValue,
                            aggregateTotals: 0,
                            columns: {}
                        };
                        surveyQuestion.columns.forEach((column, columnIndex) => {
                            const columnValue = typeof column === 'string' ? column : column.value;
                            const columnText = typeof column === 'string' ? column : column.text;
                            surveyObject[surveyQuestion.name].rows[rowValue].columns[columnValue] = {
                                text: columnText,
                                value: columnValue,
                                raw: 0,
                                rank: columnIndex + 1
                            };
                        });
                    })
                    break;
            }
        });
    });

    return surveyObject;
};

export const populateAggregateSurveyObject = (aggregateSurveyObject: any, options: AggregateOptions) => {
    const aggregateSurveyObjectClone = _.cloneDeep(aggregateSurveyObject);

    options.responses.forEach((responseObject) => {
        Object.entries(aggregateSurveyObjectClone).forEach(([questionName, questionProperties]: any) => {
            const response = responseObject.response[questionName];
            if (!response) {
                return;
            }
            switch (questionProperties.type) {
                case QuestionType.SingleInput:
                case QuestionType.Comment:
                    aggregateSurveyObjectClone[questionName].aggregateTotal++;
                    if (options.includeText) {
                        if (options.limitText && aggregateSurveyObjectClone[questionName].values.length >= options.limitText) {
                            break;
                        }
                        aggregateSurveyObjectClone[questionName].values.push(response);
                    }
                    break;
                case QuestionType.Checkbox:
                    response.forEach((value) => {
                        aggregateSurveyObjectClone[questionName].values[value].raw++;
                        if (value === 'other' && options.includeText) {
                            if (options.limitText && aggregateSurveyObjectClone[questionName].values[value].responses.length <= options.limitText) {
                                aggregateSurveyObjectClone[questionName].values[value].responses.push(responseObject.response[`${questionName}-Comment`]);
                            }
                        }
                    });
                    break;
                case QuestionType.RadioGroup:
                    aggregateSurveyObjectClone[questionName].aggregateTotal++;
                    aggregateSurveyObjectClone[questionName].values[response].raw++;
                    if (response === 'other' && options.includeText) {
                        if (!options.limitText || aggregateSurveyObjectClone[questionName].values[response].responses.length <= options.limitText - 1) {
                            aggregateSurveyObjectClone[questionName].values[response].responses.push(responseObject.response[`${questionName}-Comment`]);
                        }
                    }
                    break;
                case QuestionType.Rating:
                    aggregateSurveyObjectClone[questionName].aggregateTotal++;
                    aggregateSurveyObjectClone[questionName].values[response].raw++;
                    break;
                case QuestionType.MatrixSingleChoice:
                    Object.entries(response).forEach(([row, column]: any) => {
                        aggregateSurveyObjectClone[questionName].rows[row].aggregateTotals++;
                        aggregateSurveyObjectClone[questionName].rows[row].column[column].raw++;
                    });
                    break;
            }
        });
    });

    return aggregateSurveyObjectClone;
};

// export const run = (options: AggregateOptions) => {
//     const surveyObject = generateAggregateSurveyObject(options);
//     const aggregateObject = populateAggregateSurveyObject(surveyObject, options);
// };
