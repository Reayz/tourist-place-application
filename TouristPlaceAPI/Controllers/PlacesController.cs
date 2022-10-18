using Microsoft.AspNetCore.Mvc;
using TouristPlaceAPI.Models;
using TouristPlaceAPI.Services;

namespace TouristPlaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly IPlacesService _service;

        public PlacesController(IPlacesService service)
        {
            _service = service;
        }

        // GET: api/Places
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlaces()
        {
            var result = await _service.CallGrpcForGetAllPlaces();
            return Ok(result);
        }

        // GET: api/Places/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Place>> GetPlace(int id)
        {
            var place = await _service.CallGrpcForGetPlaceDetails(id);

            if (place == null)
            {
                return NotFound();
            }

            return place;
        }

        // PUT: api/Places/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlace(int id, Place place)
        {
            if (id != place.PlaceID)
            {
                return BadRequest();
            }

            await Task.Run(() => _service.CallGrpcForUpdatePlace(place));
            return NoContent();
        }

        // POST: api/Places
        [HttpPost]
        public async Task<ActionResult<Place>> PostPlace(Place place)
        {
            place = await _service.CallGrpcForAddPlace(place);
            return CreatedAtAction("GetPlace", new { id = place.PlaceID }, place);
        }

        // DELETE: api/Places/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            await Task.Run(() => _service.CallGrpcForDeletePlace(id));
            return NoContent();
        }
    }
}
