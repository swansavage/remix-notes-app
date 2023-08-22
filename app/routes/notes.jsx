import React from 'react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import AnotherComponent, {
	links as anotherComponentLinks,
} from '~/components/AnotherComponent';

export default function NotesPage() {
	return (
		<main>
			<NewNote />
			<AnotherComponent />
		</main>
	);
}

export function links() {
	return [...newNoteLinks(), ...anotherComponentLinks()];
}
