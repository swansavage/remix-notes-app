import EditNote, { links as EditNoteLinks } from '~/components/EditNote';
import { getStoredNotes, storeNotes } from '../data/notes';
import { useLoaderData, useActionData } from '@remix-run/react';
import { redirect } from '@remix-run/node';
//setup Day.js
const dayjs = require('dayjs');

export default function EditNotePage() {
	let note = useLoaderData();
	return (
		<main>
			<EditNote note={note}></EditNote>
		</main>
	);
}

export async function action({ request }) {
	const formData = await request.formData();

	// Short Version
	const noteData = Object.fromEntries(formData);

	// Long Version
	// const noteData = {
	// 	title: formData.get('title'),
	// 	content: formData.get('content')
	// }

	// input validation - return error message to user if title too short
	if (noteData.title.trim().length < 5) {
		return { message: 'Invalid title - must be at least 5 characters long.' };
	}

	const existingNotes = await getStoredNotes();

	console.log(existingNotes);

	for (const prop in existingNotes) {
		if (existingNotes[prop].id === noteData.id) {
			existingNotes[prop].title = noteData.title;
			existingNotes[prop].content = noteData.content;
			existingNotes[prop].editedOn = dayjs();
		}
	}

	console.log(existingNotes);
	updatedNotes = existingNotes;
	await storeNotes(updatedNotes);
	return redirect('/notes');
}

export async function loader({ params }) {
	const notes = await getStoredNotes();
	const noteId = params.noteId;
	const selectedNote = notes.find((note) => note.id === noteId);

	if (!selectedNote) {
		throw json(
			{ message: 'Could not find note matching ID ' + noteId },
			{ status: 404 }
		);
	}
	return selectedNote;
}

export function links() {
	return [...EditNoteLinks()];
}
