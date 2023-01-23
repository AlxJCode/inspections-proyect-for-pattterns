import type { AppProps } from "next/app";
import { useState } from "react";
import Router from "next/router";

import "../styles/globals.css";
import 'antd/dist/reset.css';
import { initAxiosInterceptors } from "../helpers/auth-helpers";
import { AuthProvider } from "../context";
import { Loader } from '../components/general/Loader';

initAxiosInterceptors();


function MyApp({ Component, pageProps }: AppProps) {
	const [ loading, setLoading ] = useState( false );
	Router.events.on("routeChangeStart", ( url ) => {
		setLoading( true );
	});
	Router.events.on("routeChangeComplete", ( url ) => {
		setLoading( false );
	});

	return (
		<AuthProvider>
			{ loading && <Loader /> }
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
