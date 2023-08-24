import styles from './NoteList.css';

//setup Day.js
const dayjs = require('dayjs');
var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

function NoteList({ notes }) {
	return (
		<ul id="note-list">
			{notes.map((note, index) => (
				<li key={note.id} className="note">
					<article>
						<header>
							<ul className="note-meta">
								<li>
									<time dateTime={note.date}>
										Created: {dayjs(note.date).calendar()}
									</time>
								</li>
							</ul>
							<h2>{note.title}</h2>
						</header>
						<p>{note.content}</p>
					</article>
				</li>
			))}
		</ul>
	);
}

export default NoteList;

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}
