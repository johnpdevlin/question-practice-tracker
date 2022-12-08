/** @format */

import { ResultsChart } from './ResultsChart';
import { RawRecord } from '../models/Record';

import { Tag } from '../models/Tag';
import { Card, Button } from 'react-bootstrap';

type sidebarProps = {
	records: RawRecord[];
	answeredToday: RawRecord[];
};

export function SideBar({ records, answeredToday }: sidebarProps) {
	return (
		<>
			<ResultsChart records={records} answeredToday={answeredToday} />
		</>
	);
}
