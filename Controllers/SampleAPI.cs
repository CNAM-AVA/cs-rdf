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
            return Enumerable.Range(1, 1).Select(index => new String("Hello")).ToArray();
        }
    }
}
