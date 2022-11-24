/** @format */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';

import {
	QuestionData,
	RawQuestion,
	SimplifiedQuestion,
} from './models/Question';
import { Tag } from './models/Tag';
import { NewQuestion } from './page-components/NewQuestion';
import { QuestionList } from './components/QuestionList';
import { QuestionLayout } from './components/QuestionLayout';
import { Question } from './components/Question';
import { EditQuestion } from './page-components/EditQuestion';

function App() {
	const [questions, setQuestions] = useLocalStorage<RawQuestion[]>(
		'QUESTIONS',
		[]
	);

	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

	const questionsWithTags = useMemo(() => {
		return questions.map((question) => {
			return {
				...question,
				tags: tags.filter((tag) => {
					question.tagIds.includes(tag.id);
				}),
			};
		});
	}, [questions]);

	function onCreateQuestion({ tags, ...data }: QuestionData) {
		setQuestions((prevQuestions) => {
			return [
				...prevQuestions,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			];
		});
	}

	function onUpdateQuestion(id: string, { tags, ...data }: QuestionData) {
		setQuestions((prevQuestions) => {
			return prevQuestions.map((question) => {
				if (question.id === id) {
					return { ...data, id, tagIds: tags.map((tag) => tag.id) };
				} else {
					return question;
				}
			});
		});
	}

	function onDeleteQuestion(id: string) {
		setQuestions((prevQuestions) => {
			return prevQuestions.filter((question) => question.id !== id);
		});

		function addTag(tag: Tag) {
			setTags((prev) => [...prev, tag]);
		}

		return (
			<Container className='my-'>
				<Routes>
					<Route
						path='/'
						element={
							<QuestionList
								questions={questionsWithTags}
								availableTags={tags}
							/>
						}
					/>
					<Route
						path='/new'
						element={
							<NewQuestion
								onSubmit={onCreateQuestion}
								onAddTag={addTag}
								availableTags={tags}
							/>
						}
					/>
					<Route
						path='/:id'
						element={<QuestionLayout questions={questionsWithTags} />}>
						<Route index element={<Question onDelete={onDeleteQuestion} />} />
						<Route
							path='edit'
							element={
								<EditQuestion
									onSubmit={onUpdateQuestion}
									onAddTag={addTag}
									availableTags={tags}
								/>
							}
						/>
					</Route>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Container>
		);
	}
}

export default App;
