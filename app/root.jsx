import { cssBundleHref } from '@remix-run/css-bundle';

import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
	isRouteErrorResponse,
} from '@remix-run/react';

import styles from '~/styles/main.css';

import MainNavigation from './components/MainNavigation';

export const links = () => [
	...(cssBundleHref
		? [{ rel: 'stylesheet', href: cssBundleHref }]
		: [
				{
					rel: 'stylesheet',
					href: styles,
				},
		  ]),
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<header>
					<MainNavigation />
				</header>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	console.log(error);

	if (isRouteErrorResponse(error)) {
		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width,initial-scale=1" />
					<Meta />
					<Links />

					<title>An error occured!</title>
				</head>
				<body>
					<header>
						<MainNavigation />
					</header>
					<main className="error">
						<div>
							<h2>
								{error.status} {error.statusText}
							</h2>

							<p>{error.data?.message || 'Something went wrong!'}</p>
							<p>
								Back to <Link to="/">safety</Link>!
							</p>
						</div>
					</main>
				</body>
			</html>
		);
	} else if (error instanceof Error) {
		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width,initial-scale=1" />
					<Meta />
					<Links />
					<title>An error occured!</title>
				</head>
				<body>
					<header>
						<MainNavigation />
					</header>

					<main className="error">
						<h1>Error</h1>
						<p>
							Back to <Link to="/">safety</Link>!
						</p>

						<p>{error.message}</p>
						<p>The stack trace is:</p>
						<p>{error.stack}</p>
					</main>
				</body>
			</html>
		);
	} else {
		return <h1>Unknown Error</h1>;
	}
}
