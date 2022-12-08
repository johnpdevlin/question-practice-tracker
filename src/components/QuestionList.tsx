/** @format */

import { useMemo, useState } from 'react';
import { Row, Col, Stack, Button, Form, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { Tag } from '../models/Tag';
import { SimplifiedQuestion } from '../models/Question';
import { QuestionCard } from './QuestionCard';
import { EditTagsModal } from './EditTagModal';
import { RawRecord } from '../models/Record';

type QuestionListProps = {
	questions: SimplifiedQuestion[];
	availableTags: Tag[];
	answeredToday: RawRecord[];
	updateTag: (id: string, label: string) => void;
	deleteTag: (id: string) => void;
	deleteQuestion: (id: string) => void;
	onAnswerQuestion: (isCorrect: boolean, id: string) => void;
};

export function QuestionList({
	questions,
	availableTags,
	answeredToday,
	updateTag,
	deleteTag,
	deleteQuestion,
	onAnswerQuestion,
}: QuestionListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [search, setSearch] = useState<string>('');
	const [showAnswered, setShowAnswered] = useState<boolean>(false);
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

	const handleSwitch = (): void => {
		if (showAnswered === true) {
			setShowAnswered(false);
		} else if (showAnswered === false) {
			setShowAnswered(true);
		}
	};

	const filteredQuestions = useMemo(() => {
		return questions.filter((question) => {
			if (showAnswered === true) {
				return (
					(search === '' ||
						question.question.toLowerCase().includes(search.toLowerCase())) &&
					// Checks if Question has all tags searched for
					(selectedTags.length === 0 ||
						selectedTags.every((tag) =>
							selectedTags.some((QTag) => QTag.id === tag.id)
						))
				);
			} else if (showAnswered === false) {
				return (
					(search === '' ||
						question.question.toLowerCase().includes(search.toLowerCase())) &&
					// Filters out questions that have been answered today
					answeredToday.every((at) => at.questionId !== question.id) &&
					// Checks if Question has all tags searched for
					(selectedTags.length === 0 ||
						selectedTags.every((tag) =>
							selectedTags.some((QTag) => QTag.id === tag.id)
						))
				);
			}
		});
	}, [search, selectedTags, questions, answeredToday, showAnswered]);

	return (
		<>
			<Row className='align-items-center mb-4'>
				<Col>
					<h1>Questions</h1>
				</Col>
				<Col xs='auto'>
					<Stack gap={2} direction='horizontal'>
						<Link to='/new'>
							<Button variant='primary'>Add</Button>
						</Link>
						<Button
							onClick={() => setEditTagsModalIsOpen(true)}
							variant='outline-secondary'>
							Edit Tags
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className='mb-4'>
					<Col>
						<Form.Group controlId='search'>
							<Form.Label>Search</Form.Label>
							<Form.Control
								type='text'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='tags'>
							<Form.Label>Tags:</Form.Label>
							<ReactSelect
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
					<Col>
						<FormControlLabel
							className='ms-4 mt-4'
							control={<Switch onChange={handleSwitch} />}
							label='Show Answered'
						/>
					</Col>
				</Row>
			</Form>
			<Row className=''>
				<Accordion defaultActiveKey='0'>
					{filteredQuestions.map((question, key) => (
						<div key={key}>
							<QuestionCard
								onDelete={deleteQuestion}
								q={question}
								onAnswer={onAnswerQuestion}
							/>
						</div>
					))}
				</Accordion>
			</Row>

			<EditTagsModal
				availableTags={availableTags}
				show={editTagsModalIsOpen}
				handleClose={() => setEditTagsModalIsOpen(false)}
				onUpdateTag={updateTag}
				onDeleteTag={deleteTag}
			/>
		</>
	);
}
