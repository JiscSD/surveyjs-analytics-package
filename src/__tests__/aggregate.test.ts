import * as aggregateAnalaytics from '../aggregate';

import ratingSurvey from './surveys/rating.json';
import ratingSurveyObject from './surveys/ratingSurveyObject.json';

import SingleInputSurvey from './surveys/singleinput/singleInput.json';
import SingleInputResponses from './surveys/singleinput/singleInputResponses.json';
import SingleInputSurveyObjectPlain from './surveys/singleinput/singleInputSurveyObjectPlain.json';
import SingleInputSurveyObjectWithResponses from './surveys/singleinput/singleInputSurveyObjectWithResponses.json';
import SingleInputSurveyObjectWithResponsesIncludeText from './surveys/singleinput/singleInputSurveyObjectWithResponsesIncludeText.json';
import SingleInputSurveyObjectWithResponsesIncludeTextAndLimitText from './surveys/singleinput/singleInputSurveyObjectWithResponsesIncludeTextAndLimitText.json';

import MultilineInputSurvey from './surveys/multilineinput/multilineInput.json';
import MultilineInputResponses from './surveys/multilineinput/multiLineInputResponses.json';
import MultilineInputSurveyObjectPlain from './surveys/multilineinput/multilineInputSurveyObjectPlain.json';
import MultilineInputSurveyObjectWithResponses from './surveys/multilineinput/multilineInputSurveyObjectPlainWithResponses.json';
import MultilineInputSurveyObjectWithResponsesIncludeText from './surveys/multilineinput/multilineInputSurveyObjectPlainWithResponsesIncludeText.json';
import MultilineInputSurveyObjectWithResponsesIncludeTextAndLimitText from './surveys/multilineinput/multilineInputSurveyObjectPlainWithResponsesIncludeTextAndLimitText.json';

import RadiogroupSurvey from './surveys/radiogroup/radiogroup.json';
import RadioGroupResponses from './surveys/radiogroup/radiogroupResponses.json';
import RadiogroupSurveyObjectPlain from './surveys/radiogroup/radiogroupSurveyObjectPlain.json';
import RadiogroupSurveyObjectWithResponses from './surveys/radiogroup/radiogroupSurveyObjectWithResponses.json';
import RadiogroupSurveyObjectWithResponsesIncludeText from './surveys/radiogroup/radiogroupSurveyObjectWithResponsesIncludeText.json';
import RadiogroupSurveyObjectWithResponsesIncludeTextAndLimitText from './surveys/radiogroup/radiogroupSurveyObjectWithResponsesIncludeTextAndLimitText.json';

import CheckboxSurvey from './surveys/checkbox.json';
import CheckboxSurveyObject from './surveys/checkboxSurveyObject.json';

import MatrixSingleChoiceSurvey from './surveys/matrixSingleChoice.json';
import MatrixSingleChoiceSurveyObject from './surveys/matrixSingleChoiceSurveyObject.json';


describe('generateAggregateSurveyObject', () => {
    test('Rating Survey', () => {
        const surveyObject = aggregateAnalaytics.generateAggregateSurveyObject({
            survey: ratingSurvey,
            responses: []
        });

        expect(surveyObject).toEqual(ratingSurveyObject);
    });
    test('SingleInput Survey', () => {
        const surveyObject = aggregateAnalaytics.generateAggregateSurveyObject({
            survey: SingleInputSurvey,
            responses: []
        });

        expect(surveyObject).toEqual(SingleInputSurveyObjectPlain);
    });
    test('MultilineInput Survey', () => {
        const surveyObject = aggregateAnalaytics.generateAggregateSurveyObject({
            survey: MultilineInputSurvey,
            responses: []
        });

        expect(surveyObject).toEqual(MultilineInputSurveyObjectPlain);
    });
    test('Radiogroup Survey', () => {
        const surveyObject = aggregateAnalaytics.generateAggregateSurveyObject({
            survey: RadiogroupSurvey,
            responses: []
        });

        expect(surveyObject).toEqual(RadiogroupSurveyObjectPlain);
    });
    test('Checkbox Survey', () => {
        const surveyObject = aggregateAnalaytics.generateAggregateSurveyObject({
            survey: CheckboxSurvey,
            responses: []
        });

        expect(surveyObject).toEqual(CheckboxSurveyObject);
    });
    test('MatrixSingleChoice Survey', () => {
        const surveyObject = aggregateAnalaytics.generateAggregateSurveyObject({
            survey: MatrixSingleChoiceSurvey,
            responses: []
        });

        expect(surveyObject).toEqual(MatrixSingleChoiceSurveyObject);
    });
});

describe('populateAggregateSurveyObject', () => {
    describe('Single Input', () => {
        test('No extra options', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(SingleInputSurveyObjectPlain, {
                survey: SingleInputSurvey,
                responses: SingleInputResponses
            });
            expect(surveyObject).toEqual(SingleInputSurveyObjectWithResponses);
        });
        test('options.includeText = true', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(SingleInputSurveyObjectPlain, {
                survey: SingleInputSurvey,
                responses: SingleInputResponses,
                includeText: true
            });
            expect(surveyObject).toEqual(SingleInputSurveyObjectWithResponsesIncludeText);
        });
        test('options.includeText = true && options.limitText = 1', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(SingleInputSurveyObjectPlain, {
                survey: SingleInputSurvey,
                responses: SingleInputResponses,
                includeText: true,
                limitText: 1
            });

            expect(surveyObject).toEqual(SingleInputSurveyObjectWithResponsesIncludeTextAndLimitText);
        });
    });
    describe('Multiline Input', () => {
        test('No extra options', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(MultilineInputSurveyObjectPlain, {
                survey: MultilineInputSurvey,
                responses: MultilineInputResponses
            });
            expect(surveyObject).toEqual(MultilineInputSurveyObjectWithResponses);
        });
        test('options.includeText = true', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(MultilineInputSurveyObjectPlain, {
                survey: MultilineInputSurvey,
                responses: MultilineInputResponses,
                includeText: true
            });
            expect(surveyObject).toEqual(MultilineInputSurveyObjectWithResponsesIncludeText);
        });
        test('options.includeText = true && options.limitText = 1', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(MultilineInputSurveyObjectPlain, {
                survey: MultilineInputSurvey,
                responses: MultilineInputResponses,
                includeText: true,
                limitText: 1
            });

            expect(surveyObject).toEqual(MultilineInputSurveyObjectWithResponsesIncludeTextAndLimitText);
        });
    });
    describe('Radiogroup', () => {
        test('No extra options', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(RadiogroupSurveyObjectPlain, {
                survey: RadiogroupSurvey,
                responses: RadioGroupResponses
            });
            expect(surveyObject).toEqual(RadiogroupSurveyObjectWithResponses);
        });
        test('options.includeText = true', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(RadiogroupSurveyObjectPlain, {
                survey: RadiogroupSurvey,
                responses: RadioGroupResponses,
                includeText: true
            });
            expect(surveyObject).toEqual(RadiogroupSurveyObjectWithResponsesIncludeText);
        });
        test('options.includeText = true && options.limitText = 1', () => {
            const surveyObject = aggregateAnalaytics.populateAggregateSurveyObject(RadiogroupSurveyObjectPlain, {
                survey: RadiogroupSurvey,
                responses: RadioGroupResponses,
                includeText: true,
                limitText: 1
            });

            expect(surveyObject).toEqual(RadiogroupSurveyObjectWithResponsesIncludeTextAndLimitText);
        });
    });
});
