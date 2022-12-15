/** @format */
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { QuestionData } from '../models/Question';
import { Tag } from '../models/Tag';
import { useState } from 'react';
import { QuestionForm } from './QuestionForm';

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
	const [addMultiple, setAddMultiple] = useState<Boolean>(false);

	const handleSwitch = (): void => {
		if (addMultiple === true) {
			setAddMultiple(false);
		} else if (addMultiple === false) {
			setAddMultiple(true);
		}
	};

	return (
		<>
			<h1 className='mb-4'>
				New Question
				<FormControlLabel
					className='ms-4'
					control={<Switch onChange={handleSwitch} />}
					label='Add Multiple'
				/>
			</h1>
			<QuestionForm
				onSubmit={onSubmit}
				onAddTag={onAddTag}
				availableTags={availableTags}
				addMultiple={addMultiple}
			/>
		</>
	);
}
