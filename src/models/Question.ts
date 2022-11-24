/** @format */

import { Tag } from './Tag';

export type Question = {
	id: string;
} & QuestionData;

export type RawQuestion = {
	id: string;
} & RawQuestionData;

export type RawQuestionData = {
	question: string;
	answer: string;
	tagIds: string[];
};

export type QuestionData = {
	question: string;
	answer: string;
	tags: Tag[];
};

export type SimplifiedQuestion = {
	tags: Tag[];
	question: string;
	id: string;
};
