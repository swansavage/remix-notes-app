import styles from './NewNote.css';
import { useEffect, useRef } from 'react';
import { Form, useActionData, useNavigation } from '@remix-run/react';

function NewNote() {
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
				<input type="text" id="title" name="title" required />
			</p>
			<p>
				<label htmlFor="content">Content</label>
				<textarea id="content" name="content" rows="5" required />
			</p>
			<div className="form-actions">
				<button disabled={isSubmitting}>
					{isSubmitting ? 'Adding...' : 'Add Note'}
				</button>
			</div>
		</Form>
	);
}

export default NewNote;

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}
