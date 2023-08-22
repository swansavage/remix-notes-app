import React from 'react';
import { redirect } from '@remix-run/node';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '../data/notes';
import { v4 as uuidv4 } from 'uuid';

export default function NotesPage() {
	return (
		<main>
			<NewNote />
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

	const existingNotes = await getStoredNotes();
	noteData.id = uuidv4();

	updatedNotes = existingNotes.concat(noteData);
	await storeNotes(updatedNotes);
	return redirect('/notes');
}

export function links() {
	return [...newNoteLinks()];
}
