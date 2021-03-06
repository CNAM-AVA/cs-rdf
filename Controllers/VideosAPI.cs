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

using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;


namespace cs_rdf.Controllers

{
    [ApiController]
	[Route("[controller]")]

    public class VideosAPIController: ControllerBase {
        [HttpGet]
        public string Get() {

            string game = HttpContext.Request.Query["q"].ToString();

            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    ApiKey = System.Environment.GetEnvironmentVariable("YOUTUBE_API_KEY"),
                    ApplicationName = this.GetType().ToString()
                });

            var searchListRequest = youtubeService.Search.List("snippet");
            searchListRequest.Q = game; // Replace with your search term.
            searchListRequest.MaxResults = 4;
            searchListRequest.Type = "video";

            var searchListResponse = searchListRequest.Execute();

            List<string> videos = new List<string>();

            foreach (var searchResult in searchListResponse.Items)
            {
                videos.Add(String.Format("{0} [|{1}|]", searchResult.Snippet.Title, searchResult.Id.VideoId));
            }

            return JsonConvert.SerializeObject(videos, Formatting.Indented);
        }
    }
}