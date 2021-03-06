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
    public class GenreAPIController : ControllerBase
    {
        [HttpGet]
        public string Get() {
            string genre = HttpContext.Request.Query["genre"].ToString();

            return getDataFromEndpoint(genre);
        }

        private string getDataFromEndpoint(string genre) {
            TripleStore store = new TripleStore();
            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");
            SparqlQueryParser parser = new SparqlQueryParser();

            string queryString = @"SELECT DISTINCT * WHERE {
                    ?Jeu a dbo:Software ;
                    dbo:genre dbr:"+genre+@" 
                    values ?Genre {dbr:"+genre+@"}
                    OPTIONAL { ?Jeu rdfs:label ?Nom }
                    OPTIONAL { ?Jeu dbo:thumbnail ?Photo }
                    OPTIONAL { ?Jeu dbo:genre ?Genre }
                    OPTIONAL { ?Jeu dbo:developer ?Developpeur }
                    OPTIONAL { ?Jeu dbo:series ?Series }
                    OPTIONAL { ?Jeu dbo:producer ?Producteur }
					OPTIONAL { ?Jeu foaf:isPrimaryTopicOf ?Wiki }
                    OPTIONAL { ?Jeu dbo:abstract ?Resume }
                    FILTER langMatches(lang(?Resume), 'fr')
                    FILTER langMatches(lang(?Nom), 'fr')
                } GROUP BY ?Jeu LIMIT 30
            ";

            SparqlResultSet results = endpoint.QueryWithResultSet(queryString);

            List<Dictionary<string, INode>> listResult = new List<Dictionary<string, INode>>();
					if(results is SparqlResultSet && results.Any())
					{
						SparqlResultSet rset = (SparqlResultSet) results;
						IEnumerator<KeyValuePair<string, INode>> columns;
						KeyValuePair<string, INode> col;
						foreach(SparqlResult line in rset)
						{
							columns = line.GetEnumerator();
							Dictionary<string, INode> arrayLine = new Dictionary<string, INode>();
							while(columns.MoveNext()) {
								col = columns.Current;
								if(col.Key != null && col.Value != null){
									arrayLine.Add(col.Key, col.Value);
								}
							}
							listResult.Add(arrayLine);

						}
						string json = JsonConvert.SerializeObject(listResult, Formatting.Indented);
						return json;
                }        
                return "Invalid entry ! Please enter a correct game";
            }
    }
}