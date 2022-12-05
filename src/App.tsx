/** @format */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';

import { QuestionData, RawQuestion } from './models/Question';
import { Tag } from './models/Tag';
import { QuestionLayout } from './components/QuestionLayout';
import { EditQuestion } from './components/Pages/EditQuestion';
import { NewQuestion } from './components/Pages/NewQuestion';
import { Question } from './components/Question';
import { QuestionList } from './components/QuestionList';

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
				tags: tags.filter((tag) => question.tagIds.includes(tag.id)),
			};
		});
	}, [questions, tags]);

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
					return { ...question, ...data, tagIds: tags.map((tag) => tag.id) };
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
	}
	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag]);
	}

	function updateTag(id: string, label: string) {
		setTags((prevTags) => {
			return prevTags.map((tag) => {
				if (tag.id === id) {
					return { ...tag, label };
				} else {
					return tag;
				}
			});
		});
	}

	function deleteTag(id: string) {
		setTags((prevTags) => {
			return prevTags.filter((tag) => tag.id !== id);
		});
	}

	return (
		<Container className='my-4'>
			<Routes>
				<Route
					path='/'
					element={
						<QuestionList
							questions={questionsWithTags}
							availableTags={tags}
							updateTag={updateTag}
							deleteTag={deleteTag}
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

export default App;
