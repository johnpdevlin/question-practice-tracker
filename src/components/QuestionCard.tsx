/** @format */

import { Accordion, Badge, Button, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { Question } from '../models/Question';

type QuestionCardProps = {
	q: Question;
	onDelete: (id: string) => void;
	onAnswer: (isCorrect: boolean, questionId: string) => void;
};

export function QuestionCard({ q, onDelete, onAnswer }: QuestionCardProps) {
	const { id, question, answer, tags } = q;
	const navigate = useNavigate();

	return (
		<>
			<Accordion.Item eventKey={id} className='mb-4'>
				<Accordion.Header>{question}</Accordion.Header>
				<Accordion.Body>
					<p className='text-justify'>{answer}</p>

					<Stack gap={3} direction='horizontal'>
						{tags.length > 0 && (
							<Stack
								gap={1}
								direction='horizontal'
								className='align-items-left flex-wrap'>
								{tags.map((tag) => (
									<Badge key={tag.id} className='text-truncate'>
										{tag.label}
									</Badge>
								))}{' '}
							</Stack>
						)}

						<span className='align-items-right ms-auto'>
							<Stack gap={3} direction='horizontal'>
								Answered:
								<Button
									variant='outline-danger'
									onClick={() => onAnswer(false, id)}>
									<span>
										&#10060; <i>Wrong</i>
									</span>
								</Button>
								<Button
									variant='outline-success'
									onClick={() => onAnswer(true, id)}>
									<span>
										&#9989; <i> Right </i>
									</span>
								</Button>
							</Stack>
						</span>
						<span className='align-items-right ms-auto'>
							<Stack gap={2} direction='horizontal'>
								<Link to={`/${id}/edit`}>
									<Button variant='outline-secondary'>Edit</Button>
								</Link>
								<Button
									variant='outline-danger'
									onClick={() => {
										onDelete(id);
										navigate('/');
									}}>
									Delete
								</Button>
							</Stack>
						</span>
					</Stack>
				</Accordion.Body>
			</Accordion.Item>

			{/* <Card
				as={Link}
				to={`/${id}`}
				className={`h-100 text-reset text-decoration-none ${styles.card}`}>
				<Card.Body>
					<Stack
						gap={2}
						className='align-items-center justify-content-center h-100'>
						<span className='fs-5'>{question}</span>
						{tags.length > 0 && (
							<Stack
								gap={1}
								direction='horizontal'
								className='align-items-center flex-wrap'>
								{tags.map((tag) => (
									<Badge key={tag.id} className='text-truncate'>
										{tag.label}
									</Badge>
								))}{' '}
							</Stack>
						)}
					</Stack>
				</Card.Body>
			</Card> */}
		</>
	);
}
