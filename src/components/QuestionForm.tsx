/** @format */

import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from 'uuid';

import { QuestionData } from '../models/Question';
import { Tag } from '../models/Tag';

type QuestionFormProps = {
	onSubmit: (data: QuestionData) => void;
	onAddTag: (tag: Tag) => void;
	addMultiple: Boolean;
	availableTags: Tag[];
} & Partial<QuestionData>;

export function QuestionForm({
	onSubmit,
	onAddTag,
	availableTags,
	addMultiple,
	question = '',
	answer = '',
	tags = [],
}: QuestionFormProps) {
	const questionRef = useRef<HTMLInputElement>(null);
	const answerRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

	const navigate = useNavigate();

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		onSubmit({
			question: questionRef.current!.value,
			answer: answerRef.current!.value,
			tags: selectedTags,
		});

		// navigates back after submitting
		if (!addMultiple) {
			navigate('..');

			// resets form after submitting
		} else if (addMultiple!) {
			questionRef.current!.value = '';
			answerRef.current!.value = '';
			setSelectedTags([]);
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4} className='mb-3'>
				<Row>
					<Col>
						<Form.Group controlId='question'>
							<Form.Label>Question:</Form.Label>
							<Form.Control
								ref={questionRef}
								required
								defaultValue={question}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='tags'>
							<Form.Label>Tags:</Form.Label>
							<CreatableReactSelect
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label };
									onAddTag(newTag);
									setSelectedTags((prev) => [...prev, newTag]);
								}}
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { label: tag.label, id: tag.value };
										})
									);
								}}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId='answer'>
					<Form.Label>Answer:</Form.Label>
					<Form.Control
						defaultValue={answer}
						required
						ref={answerRef}
						as='textarea'
						rows={10}
					/>
				</Form.Group>
			</Stack>
			<Stack direction='horizontal' gap={2} className='justify-content-end'>
				<Link to='..'>
					<Button variant='outline-secondary' type='button'>
						Cancel
					</Button>
				</Link>
				<Button variant='primary' type='submit'>
					Save
				</Button>
			</Stack>
		</Form>
	);
}
