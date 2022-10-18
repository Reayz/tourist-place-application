using APIGrpcServer;
using APIGrpcService.Contexts;
using APIGrpcService.Models;
using Microsoft.EntityFrameworkCore;

namespace APIGrpcService.Repository
{
    public class PlacesRepository : IPlacesRepository
    {

        private readonly ILogger<PlacesRepository> _logger;
        private readonly PlacesContext _context;
        public PlacesRepository(ILogger<PlacesRepository> logger, PlacesContext context)
        {
            _logger = logger;
            _context = context;
        }
        public async Task<PlaceResponse> GetAllPlaces()
        {
            var result = await _context.Places.ToListAsync();

            PlaceResponse places = new PlaceResponse();

            foreach(Place item in result)
            {
                SinglePlace place = new SinglePlace();

                place.PlaceID = item.PlaceID;
                place.Name = item.Name;
                place.Address = item.Address;
                place.Rating = item.Rating;
                place.Type = item.Type;
                place.Picture = item.Picture;

                places.Places.Add(place);
            }

            return places;
        }
        public async Task<SinglePlace> GetDetails(int placeID)
        {
            var place = await _context.Places.FindAsync(placeID);
            if (place == null) return null;

            SinglePlace placeRes = new SinglePlace();
            placeRes.PlaceID = place.PlaceID;
            placeRes.Name = place.Name;
            placeRes.Address = place.Address;
            placeRes.Rating = place.Rating;
            placeRes.Type = place.Type;
            placeRes.Picture = place.Picture;

            return placeRes;
        }
        public async Task<SinglePlace> AddPlace(SinglePlace place)
        {
            Place placeObj = new Place()
                            {
                                PlaceID = place.PlaceID,
                                Name = place.Name,
                                Address = place.Address,
                                Rating = place.Rating,
                                Type = place.Type,
                                Picture = place.Picture
                            };

            _context.Places.Add(placeObj);
            await _context.SaveChangesAsync();


            SinglePlace placeRes = new SinglePlace();
            placeRes.PlaceID = placeObj.PlaceID;
            placeRes.Name = placeObj.Name;
            placeRes.Address = placeObj.Address;
            placeRes.Rating = placeObj.Rating;
            placeRes.Type = placeObj.Type;
            placeRes.Picture = placeObj.Picture;

            return placeRes;
        }

        public async Task DeletePlace(int placeID)
        {
            var place = await _context.Places.FindAsync(placeID);
            if (place == null) return;

            _context.Places.Remove(place);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task UpdatePlace(SinglePlace place)
        {
            Place placeObj = new Place()
            {
                PlaceID = place.PlaceID,
                Name = place.Name,
                Address = place.Address,
                Rating = place.Rating,
                Type = place.Type,
                Picture = place.Picture
            };

            _context.Entry(placeObj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(placeObj.PlaceID))
                {
                    return;
                }
                else
                {
                    throw;
                }
            }

            return;
        }

        private bool PlaceExists(int id)
        {
            return _context.Places.Any(e => e.PlaceID == id);
        }
    }
}
