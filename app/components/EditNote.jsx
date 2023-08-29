import styles from './NewNote.css';
import { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useNavigation } from '@remix-run/react';

function EditNote({ note }) {
	const [noteTitle, setNoteTitle] = useState(note.title);
	const [noteContent, setNoteContent] = useState(note.content);
	const data = useActionData();
	const navigation = useNavigation();
	//prettier-ignore
	let formRef = useRef();

	const isSubmitting = navigation.state === 'submitting';

	useEffect(() => {
		if (!isSubmitting) {
			formRef.current?.reset();
		}
	}, [isSubmitting]);

	return (
		<Form ref={formRef} method="post" id="note-form">
			{/* conditonally render the validation error message */}
			{data?.message && <p>{data.message}</p>}
			<p>
				<label htmlFor="title">Title</label>
				<input type="hidden" name="id" value={note.id}></input>
				<input
					type="text"
					id="title"
					name="title"
					value={noteTitle}
					onChange={(e) => setNoteTitle(e.target.value)}
					required
				/>
			</p>
			<p>
				<label htmlFor="content">Content</label>
				<textarea
					id="content"
					name="content"
					rows="5"
					value={noteContent}
					onChange={(e) => setNoteContent(e.target.value)}
					required
				/>
			</p>
			<div className="form-actions">
				<button disabled={isSubmitting}>
					{isSubmitting ? 'Saving...' : 'Save Note'}
				</button>
			</div>
		</Form>
	);
}

export default EditNote;

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}
