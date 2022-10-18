using APIGrpcServer;

namespace APIGrpcService.Repository
{
    public interface IPlacesRepository
    {
        public Task<PlaceResponse> GetAllPlaces();
        public Task<SinglePlace> GetDetails(int placeID);
        public Task<SinglePlace> AddPlace(SinglePlace place);
        public Task DeletePlace(int placeID);
        public Task UpdatePlace(SinglePlace place);
    }
}
