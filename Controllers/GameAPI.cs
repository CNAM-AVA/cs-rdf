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
using VDS.RDF.Parsing;

namespace cs_rdf.Controllers
{
		[ApiController]
		[Route("[controller]")]
		
		public class GameAPIController : ControllerBase
		{
				[HttpGet]
				public string Get()
				{
					string game = HttpContext.Request.Query["game"].ToString();

					return getDataFromEndpoint(game);
					// return Enumerable.Range(1, 1).Select(index => new String("Hello world !!")).ToArray();
				}

				// [HttpGet]
				// public IActionResult Get([FromQuery(Name = "q")] string q)
				// {
				// }

				private string getDataFromEndpoint(string game){
					TripleStore store = new TripleStore();

					SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");
					
					//First we need an instance of the SparqlQueryParser
					SparqlQueryParser parser = new SparqlQueryParser();

					//Then we build the query string

					//Then we can parse a SPARQL string into a query
					SparqlQuery query = parser.ParseFromString("SELECT * WHERE { ?s a ?type }");

					string queryString = @"SELECT DISTINCT *
					WHERE {
						dbr:"+game+@" rdfs:label ?Jeu
						OPTIONAL { dbr:"+game+@" dbo:thumbnail ?Photo }
						OPTIONAL { dbr:"+game+@" dbo:genre ?Genre }
						OPTIONAL { dbr:"+game+@" dbo:developer ?Developpeur }
						OPTIONAL { dbr:"+game+@" dbo:series ?Series }
						OPTIONAL { dbr:"+game+@" dbo:producer ?Producteur }
						OPTIONAL { dbr:"+game+@" dbo:computingPlatform ?Plateforme }
						OPTIONAL { dbr:"+game+@" dbo:releaseDate ?Date_de_sortie }
						OPTIONAL { dbr:"+game+@" dbo:director ?Realisateur }
						OPTIONAL { dbr:"+game+@" dbp:modes ?Modes_de_jeu }
						OPTIONAL { dbr:"+game+@" dbo:abstract ?Resume }
						OPTIONAL { dbr:"+game+@" foaf:isPrimaryTopicOf ?Wiki }
						FILTER langMatches(lang(?Resume), 'fr')
						FILTER langMatches(lang(?Jeu), 'fr')
					} LIMIT 100";

					SparqlResultSet results = endpoint.QueryWithResultSet(queryString);
					// SparqlResultSet results = endpoint.QueryWithResultSet("SELECT * WHERE { ?logiciel a dbo:Software } LIMIT 20");
					// string stringRes = "";
					List<Dictionary<string, INode>> listResult = new List<Dictionary<string, INode>>();
					if(results is SparqlResultSet && results.Any())
					{
						SparqlResultSet rset = (SparqlResultSet) results;
						int nbRes = 0;
						IEnumerator<KeyValuePair<string, INode>> columns;
						KeyValuePair<string, INode> col;
						nbRes = rset.Count();
						Console.WriteLine(nbRes+" entries found");
						foreach(SparqlResult line in rset)
						{
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
						string json = JsonConvert.SerializeObject(listResult, Formatting.Indented);
						return json;
					}
					// listResult.Get();
					Console.WriteLine("Invalid entry ! Please enter a correct game");
					return "Invalid entry ! Please enter a correct game";
				}
		}
}

/*
SELECT DISTINCT *
WHERE {
dbr:Warcraft rdfs:label ?Jeu
OPTIONAL { dbr:Warcraft dbo:thumbnail ?Photo }
OPTIONAL { dbr:Warcraft dbo:genre ?Genre }
OPTIONAL { dbr:Warcraft dbo:developer ?Developpeur }
OPTIONAL { dbr:Warcraft dbo:series ?Series }
OPTIONAL { dbr:Warcraft dbo:producer ?Producteur }
OPTIONAL { dbr:Warcraft dbo:computingPlatform ?Plateforme }
OPTIONAL { dbr:Warcraft dbo:releaseDate ?Date_de_sortie }
OPTIONAL { dbr:Warcraft dbo:director ?Realisateur }
OPTIONAL { dbr:Warcraft dbp:modes ?Modes_de_jeu }
OPTIONAL { dbr:Warcraft dbo:abstract ?Resume }
OPTIONAL { dbr:Warcraft foaf:isPrimaryTopicOf ?Wiki }
FILTER langMatches(lang(?Resume), 'fr')
FILTER langMatches(lang(?Jeu), 'fr')
} LIMIT 100
*/