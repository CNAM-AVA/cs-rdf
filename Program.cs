using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using VDS.RDF.Query;
using VDS.RDF.Parsing;

namespace cs_rdf
{
    public class Program
    {
        public static void Main(string[] args)
        {
            SparqlQueryParser parser = new SparqlQueryParser();
            SparqlQuery q = parser.ParseFromString("SELECT ?logiciel ?nom ?wiki ?photo ?resume WHERE { ?logiciel a dbo:Software ; dbo:abstract ?resume ; rdfs:label ?nom ; foaf:isPrimaryTopicOf ?wiki ; dbo:thumbnail ?photo FILTER langMatches(lang(?resume), 'fr') FILTER langMatches(lang(?nom), 'fr') FILTER regex(?nom, \"^Dark\") } LIMIT 20");
            // Console.WriteLine(q.ToString());
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
