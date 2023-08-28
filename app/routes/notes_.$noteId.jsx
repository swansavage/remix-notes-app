import { Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import styles from '~/styles/note-details.css';
import { getStoredNotes, storeNotes } from '../data/notes';

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
			<form class="form-actions" method="post">
				<button name="intent" type="submit" value="edit">
					Edit
				</button>
				<button name="intent" type="submit" value="delete">
					Delete
				</button>
			</form>
		</main>
	);
}

export async function action({ request, params }) {
	const form = await request.formData();
	const intent = form.get('intent');

	// if (intent !== 'delete') {
	// 	throw new Response(`Unknown intent "${intent}" - Not supported`, {
	// 		status: 400,
	// 	});
	// }

	const notes = await getStoredNotes();
	const noteId = params.noteId;

	if (intent === 'delete') {
		const filteredNotes = notes.filter((note) => note.id !== noteId);

		await storeNotes(filteredNotes);

		console.log('deleting!');
		return redirect('/notes');
	}

	if (intent === 'edit') {
		console.log('editing!');
		return redirect('/notes');
	}
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
