using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Orion.Data;
using Orion.Domain.Entities;

namespace Orion.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger,
            ApplicationContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("test")]
        public async Task<ActionResult<IEnumerable<Relation>>> GetClub()
        {
            var club = await _context.Relations.ToListAsync();

            if (club == null)
            {
                return NotFound();
            }

            return club;
        }
    }
}