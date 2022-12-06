/** @format */

import { QuestionForm } from './QuestionForm';
import { QuestionData } from '../models/Question';
import { Tag } from '../models/Tag';

type NewQuestionProps = {
	onSubmit: (data: QuestionData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export function NewQuestion({
	onSubmit,
	onAddTag,
	availableTags,
}: NewQuestionProps) {
	return (
		<>
			<h1 className='mb-4'>New Question</h1>
			<QuestionForm
				onSubmit={onSubmit}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
}
