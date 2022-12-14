/** @format */

import { QuestionData } from '../models/Question';
import { Tag } from '../models/Tag';
import { QuestionForm } from './QuestionForm';
import { useQuestion } from './QuestionLayout';

type EditQuestionProps = {
	onSubmit: (id: string, data: QuestionData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<QuestionData>;

export function EditQuestion({
	onSubmit,
	onAddTag,
	availableTags,
}: EditQuestionProps) {
	const question = useQuestion();
	return (
		<>
			<h1 className='mb-4'>Edit Question</h1>
			<QuestionForm
				question={question.question}
				answer={question.answer}
				onSubmit={(data) => onSubmit(question.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
				addMultiple={false}
			/>
		</>
	);
}
