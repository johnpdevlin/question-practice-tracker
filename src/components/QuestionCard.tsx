/** @format */

import { Badge, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SimplifiedQuestion } from '../models/Question';
import { Tag } from '../models/Tag';
import styles from '../QuestionList.module.css';

export function QuestionCard({ id, question, tags }: SimplifiedQuestion) {
	return (
		<>
			<Card
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
			</Card>
		</>
	);
}
