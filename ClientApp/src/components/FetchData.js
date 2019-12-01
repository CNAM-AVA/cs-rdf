import React, { useState, useEffect } from 'react';

const FetchData = (props) => {

	const [data, setData] = useState([]);

	useEffect(() => {

		const fetchString = async () => {
			const req = await fetch('GamesAPI');
			const localdata = await req.json();
			setData(localdata);
		}

		fetchString();

		return function cleanup() {
			setData('');
		}
	}, []);

	console.log(data);
	if(data.length > 0)
	{
		console.log(Object.keys(data[1]));
	}

	function showDataTable(data){
		if(data.length > 0){
			const keys = Object.keys(data[0]);
			return (
				<table class="table table-striped" styles={{width: 100}}>
					<thead>
						<tr>
						{
							keys.map((col, key) => <th key={key}>{col}</th>)
						}
						</tr>
					</thead>
					<tbody>
					{
						data.map((row, key) => {
							return (
							<tr key={key}>
								<td>{row.logiciel.uri}</td>
								<td>{row.nom.value}</td>
								<td>{row.wiki.uri}</td>
								{/* <td>{row.photo ? row.photo.uri : ''}</td> */}
								<td>{row.resume.value}</td>
							</tr>
							)
						})
					}
					</tbody>
				</table>
			)
			
		}
	}

	return (
		<React.Fragment>
			<p>Hello</p>
			<p>Fetched Data from c# backend: </p>
			{showDataTable(data)}
		</React.Fragment>
	)
}

export default FetchData;