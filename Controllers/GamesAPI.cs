using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VDS.RDF.Query;
using VDS.RDF;
using System.Data;
using Newtonsoft.Json;

namespace cs_rdf.Controllers
{
		[ApiController]
		[Route("[controller]")]
		
		public class GamesAPIController : ControllerBase
		{
				[HttpGet]
				public string Get()
				{
					string q = HttpContext.Request.Query["q"].ToString();

					return getDataFromEndpoint(q);
					// return Enumerable.Range(1, 1).Select(index => new String("Hello world !!")).ToArray();
				}

				// [HttpGet]
				// public IActionResult Get([FromQuery(Name = "q")] string q)
				// {
				// }

				private string getDataFromEndpoint(string q){
					TripleStore store = new TripleStore();

					SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"));

					string query = @"SELECT DISTINCT * 
					WHERE { 
						?Logiciel a dbo:Software;
						rdfs:label ?Nom;
						dbo:abstract ?Resume
						OPTIONAL { ?Logiciel dbo:thumbnail ?Photo }
						OPTIONAL { ?Logiciel dbo:genre ?Genre }
						OPTIONAL { ?Logiciel dbo:developer ?Developpeur }
						OPTIONAL { ?Logiciel dbo:series ?Series }
						OPTIONAL { ?Logiciel dbo:producer ?Producteur }
						OPTIONAL { ?Logiciel dbo:releaseDate ?Date_de_sortie }
						OPTIONAL { ?Logiciel dbo:director ?Realisateur }
						OPTIONAL { ?Logiciel foaf:isPrimaryTopicOf ?Wiki }
						FILTER langMatches(lang(?Resume), 'fr') 
						FILTER langMatches(lang(?Nom), 'fr') 
						FILTER regex(?Nom, """+q+@""", ""i"") 
					}
					LIMIT 40";

					SparqlResultSet results = endpoint.QueryWithResultSet(query);

					Console.Write(results);


					// SparqlResultSet results = endpoint.QueryWithResultSet("SELECT * WHERE { ?logiciel a dbo:Software } LIMIT 20");
					// string stringRes = "";
					List<Dictionary<string, INode>> listResult = new List<Dictionary<string, INode>>();
					if(results is SparqlResultSet)
					{
						SparqlResultSet rset = (SparqlResultSet) results;
						int nbRes = 0;
						IEnumerator<KeyValuePair<string, INode>> columns;
						KeyValuePair<string, INode> col;
						foreach(SparqlResult line in rset)
						{
							nbRes = line.Count();
							Console.WriteLine(nbRes);
							columns = line.GetEnumerator();
							Dictionary<string, INode> arrayLine = new Dictionary<string, INode>();
							while(columns.MoveNext()) {
								col = columns.Current;
								if(col.Key != null && col.Value != null){
									arrayLine.Add(col.Key, col.Value);
									// listResult.Add(col.Key.ToString() +" => "+ col.Value.ToString());
								}
							}
							listResult.Add(arrayLine);
							// for(int i = 0; i <= nbRes; i++)
							// {
							// 	line.Item[i];
							// }
							// IEnumerator<KeyValuePair<string, INode>> enum;
							// enum = line.AsEnumerable();
							// foreach(KeyValuePair column in enum)
							// {
							// 	Console.WriteLine(line.First().ToString());
								// listResult.Add(line.First().Key + " => " + line.First().Value);
							// }
						}
					}
					// listResult.Get();

					string json = JsonConvert.SerializeObject(listResult, Formatting.Indented);

					return json;
				}
		}
}

/*
SELECT ?logiciel ?nom ?wiki ?photo ?resume 
WHERE { 
	?logiciel a dbo:Software ; 
		dbo:abstract ?resume ; 
		rdfs:label ?nom ; 
		foaf:isPrimaryTopicOf ?wiki
	OPTIONAL {
		?logiciel dbo:thumbnail ?photo }
	FILTER langMatches(lang(?resume), 'fr') 
	FILTER langMatches(lang(?nom), 'fr') 
	FILTER regex(?nom, "^Dark") 
} 
LIMIT 20
*/