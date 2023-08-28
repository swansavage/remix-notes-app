import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import styles from '~/styles/note-details.css';
import { getStoredNotes } from '../data/notes';

export async function getNoteForMe() {
	const bingo = await useLoaderData();
	console.log(bingo);
	return bingo;
}

export default function NoteDetialsPage() {
	const note = useLoaderData();

	return (
		<main id="note-details">
			<header>
				<nav>
					<Link to="/notes">Back to all notes</Link>
				</nav>
				<h1>{note.title}</h1>
			</header>
			<p id="note-details-content">{note.content}</p>
		</main>
	);
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
	return [
		{
			rel: 'stylesheet',
			href: styles,
		},
	];
}

export function meta({ data }) {
	return [{ title: data.title }];
}
