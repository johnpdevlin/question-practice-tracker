/** @format */

import { RawRecord } from '../models/Record';
import { ResultsChart } from './ResultsChart';

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
