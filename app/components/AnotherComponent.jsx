import React from 'react';
import styles from '~/components/AnotherComponent.css';

export default function AnotherComponent() {
	return <div className="another-page">Another Component</div>;
}

export function links() {
	return [
		{
			rel: 'stylesheet',
			href: styles,
		},
	];
}
