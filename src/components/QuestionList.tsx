/** @format */

import { useMemo, useState } from 'react';
import { Row, Col, Stack, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';

import { Tag } from '../models/Tag';
import { SimplifiedQuestion } from '../models/Question';
import { QuestionCard } from './QuestionCard';

type QuestionListProps = {
	questions: SimplifiedQuestion[];
	availableTags: Tag[];
};

export function QuestionList({ questions, availableTags }: QuestionListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [search, setSearch] = useState<string>('');

	const filteredQuestions = useMemo(() => {
		return questions.filter((question) => {
			return (
				(search === '' ||
					question.question.toLowerCase().includes(search.toLowerCase())) &&
				// Checks if Question has all tages searched for
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						selectedTags.some((QTag) => QTag.id === tag.id)
					))
			);
		});
	}, [search, selectedTags, questions]);

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
						<Button variant='outline-secondary'>Edit Tags</Button>
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
				</Row>
			</Form>
			<Row xs={1} sm={2} md={3} lg={4} className='g-3'>
				{filteredQuestions.map((question) => (
					<Col key={question.id}>
						<QuestionCard
							id={question.id}
							question={question.question}
							tags={question.tags}
						/>
					</Col>
				))}
			</Row>
		</>
	);
}
