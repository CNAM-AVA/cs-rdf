using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using VDS.RDF.Query;
using VDS.RDF;

namespace cs_rdf
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // SparqlParameterizedString queryString = new SparqlParameterizedString();
            // queryString.Namespaces.AddNamespace("dbo", new Uri("http://dbpedia.org/ontology/"));
            // queryString.CommandText = "SELECT * WHERE { ?logiciel a dbo:Software } LIMIT 20";
            // queryString.CommandText = "SELECT ?logiciel ?nom ?wiki ?photo ?resume WHERE { ?logiciel a dbo:Software ; dbo:abstract ?resume ; rdfs:label ?nom ; foaf:isPrimaryTopicOf ?wiki ; dbo:thumbnail ?photo FILTER langMatches(lang(?resume), 'fr') FILTER langMatches(lang(?nom), 'fr') FILTER regex(?nom, \"^Dark\") } LIMIT 20";
            // queryString.SetUri("value", new Uri(""))
            // SparqlQueryParser parser = new SparqlQueryParser();
            // SparqlQuery q = parser.ParseFromString("SELECT ?logiciel ?nom ?wiki ?photo ?resume WHERE { ?logiciel a dbo:Software ; dbo:abstract ?resume ; rdfs:label ?nom ; foaf:isPrimaryTopicOf ?wiki ; dbo:thumbnail ?photo FILTER langMatches(lang(?resume), 'fr') FILTER langMatches(lang(?nom), 'fr') FILTER regex(?nom, \"^Dark\") } LIMIT 20");

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
