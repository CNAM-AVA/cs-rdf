import React, { useState, useEffect } from 'react';

const FetchData = (props) => {

	const [data, setData] = useState();

	useEffect(() => {

		const fetchString = async () => {
			const req = await fetch('sampleAPI');
			const localdata = await req.json();

			setData(localdata);
		}

		fetchString();

		return function cleanup() {
			setData('');
		}
	}, []);

	return (
		<React.Fragment>
			<p>Hello</p>
			<p>Fetched Data from c# backend: {data}</p>
		</React.Fragment>
	)
}

export default FetchData;