/** @format */

import {
	Navigate,
	Outlet,
	useOutletContext,
	useParams,
} from 'react-router-dom';
import { Question } from '../models/Question';

type QuestionLayoutProps = {
	questions: Question[];
};

export function QuestionLayout({ questions }: QuestionLayoutProps) {
	const { id } = useParams();
	const question = questions.find((q) => q.id === id);

	if (!question) return <Navigate to='/' replace />;

	return (
		<>
			<Outlet context={question} />
		</>
	);
}

export function useQuestion() {
	return useOutletContext<Question>();
}
