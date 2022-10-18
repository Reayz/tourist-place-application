using TouristPlaceAPI.Models;

namespace TouristPlaceAPI.Services
{
    public interface IPlacesService
    {
        public Task<IEnumerable<Place>> CallGrpcForGetAllPlaces();
        public Task<Place> CallGrpcForGetPlaceDetails(int placeID);
        public Task<Place> CallGrpcForAddPlace(Place place);
        public Task CallGrpcForDeletePlace(int placeID);
        public Task CallGrpcForUpdatePlace(Place place);
    }
}
