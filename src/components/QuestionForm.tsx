/** @format */

import { useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from 'uuid';

import { QuestionData } from '../models/Question';
import { Tag } from '../models/Tag';

type QuestionFormProps = {
	onSubmit: (data: QuestionData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<QuestionData>;

export function QuestionForm({
	onSubmit,
	onAddTag,
	availableTags,
	question = '',
	answer = '',
	tags = [],
}: QuestionFormProps) {
	const questionRef = useRef<HTMLInputElement>(null);
	const answerRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		onSubmit({
			question: questionRef.current!.value,
			answer: answerRef.current!.value,
			tags: [],
		});
		navigate('..');
	}
	return (
		<Form>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId='questionTitle'>
							<Form.Label>Question:</Form.Label>
							<Form.Control ref={questionRef} required />
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
					<Form.Control ref={answerRef} required as='textarea' rows={10} />
				</Form.Group>
			</Stack>
			<Stack direction='horizontal' gap={2} className='justify-content-end'>
				<Button variant='primary' type='submit'>
					Save
				</Button>
				<Link to='..'>
					<Button variant='outline-secondary' type='button'>
						Cancel
					</Button>
				</Link>
			</Stack>
		</Form>
	);
}
