import React from 'react';
import { redirect, json } from '@remix-run/node';
import {
	useLoaderData,
	useRouteError,
	isRouteErrorResponse,
	Link,
} from '@remix-run/react';
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
// ?this like a GET route?
export async function loader() {
	const notes = await getStoredNotes();

	if (!notes || notes.length === 0) {
		throw json(
			{ message: 'Could not find any notes.' },
			{
				status: 404,
				statusText: 'Not Found',
			}
		);
	}

	return notes;
}

// Remix uses form submission to add a note, we use an action here
// ?this is like a POST route?
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

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<>
				<NewNote />
				<p className="info-message">{error.data.message}</p>
			</>
		);
	} else if (error instanceof Error) {
		return (
			<main className="error">
				<h1>Oops, something went wrong!</h1>
				<p>
					Back to <Link to="/">safety</Link>!
				</p>

				<p>The stack trace is:</p>
				<p>{error.stack}</p>
			</main>
		);
	}
}
