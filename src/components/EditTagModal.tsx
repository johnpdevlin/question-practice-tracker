/** @format */

import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { Tag } from '../models/Tag';

type EditTagsModelProps = {
	availableTags: Tag[];
	show: boolean;
	handleClose: () => void;
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};

export function EditTagsModal({
	availableTags,
	show,
	handleClose,
	onUpdateTag,
	onDeleteTag,
}: EditTagsModelProps) {
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Tags</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Stack gap={2}>
							{availableTags.map((tag) => (
								<Row key={tag.id}>
									<Col>
										<Form.Control
											type='text'
											value={tag.label}
											onChange={(e) => onUpdateTag(tag.id, e.target.value)}
										/>
									</Col>
									<Col xs='auto'>
										<Button
											onClick={() => onDeleteTag(tag.id)}
											variant='otuline-danger'>
											&times;
										</Button>
									</Col>
								</Row>
							))}
						</Stack>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
