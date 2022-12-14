/** @format */

import { toggleClass } from 'cheerio/lib/api/attributes';
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import { useQuestion } from './QuestionLayout';

type QuestionProps = {
	onDelete: (id: string) => void;
};

export function Question({ onDelete }: QuestionProps) {
	const question = useQuestion();
	const navigate = useNavigate();

	return (
		<>
			<Row className='align-items-center mb-4'>
				<Col>
					<h1>{question.question}</h1>
					{question.tags.length > 0 && (
						<Stack
							gap={1}
							direction='horizontal'
							className='justify-content-center flex-wrap'>
							{question.tags.map((tag) => (
								<Badge className='text-truncate' key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>
				<Col xs='auto'>
					<Col xs='auto'>
						<Stack gap={2} direction='horizontal'>
							<Link to={`/${question.id}/edit`}>
								<Button variant='primary'>Edit</Button>
							</Link>
							<Button
								variant='outline-danger'
								onClick={() => {
									onDelete(question.id);
									navigate('/');
								}}>
								Delete
							</Button>
							<Link to='..'>
								<Button variant='outline-secondary'>Back</Button>
							</Link>
						</Stack>
					</Col>
				</Col>
			</Row>
			<ReactMarkdown>{question.answer}</ReactMarkdown>
		</>
	);
}
