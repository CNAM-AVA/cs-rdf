using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cs_rdf.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SampleAPIController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<String> Get()
        {
            return Enumerable.Range(1, 1).Select(index => new String("Hello world !!")).ToArray();
        }
    }
}

/*
SELECT ?logiciel ?nom ?wiki ?photo ?resume 
WHERE {
  ?logiciel a dbo:Software ;
    dbo:abstract ?resume ;
    rdfs:label ?nom ;
    foaf:isPrimaryTopicOf ?wiki ;
    dbo:thumbnail ?photo
  FILTER langMatches(lang(?resume), 'fr')
  FILTER langMatches(lang(?nom), 'fr')
}
LIMIT 20
*/