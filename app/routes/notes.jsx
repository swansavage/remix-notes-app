import React from 'react';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getStoredNotes, storeNotes } from '../data/notes';
import { v4 as uuidv4 } from 'uuid';

//setup Day.js
const dayjs = require('dayjs');

export default function NotesPage() {
	const notes = useLoaderData();
	return (
		<main>
			<NewNote />
			<NoteList notes={notes} />
		</main>
	);
}

// Remix uses loader to get from db - executed on server, never reaches client
export async function loader() {
	const notes = await getStoredNotes();
	return notes;
}

// Remix uses form submission to add a note, we use an action here
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
	noteData.date = dayjs();

	console.log(noteData.date);

	updatedNotes = existingNotes.concat(noteData);
	await storeNotes(updatedNotes);
	return redirect('/notes');
}

export function links() {
	return [...newNoteLinks(), ...noteListLinks()];
}
