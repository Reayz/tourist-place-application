using APIGrpcServer;
using APIGrpcService.Repository;
using Grpc.Core;

namespace APIGrpcService.Services
{
    public class PlacesService : Places.PlacesBase
    {
        private readonly ILogger<PlacesService> _logger;
        private readonly IPlacesRepository _repository;
        public PlacesService(ILogger<PlacesService> logger, IPlacesRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        public override async Task<PlaceResponse> GetAllPlaces(Empty request, ServerCallContext context)
        {
            var places = await _repository.GetAllPlaces();
            return places;
        }

        public override async Task<SinglePlace> GetDetails(PlaceIDRequest request, ServerCallContext context)
        {
            var places = await _repository.GetDetails(request.PlaceID);
            return places;
        }

        public override async Task<SinglePlace> AddPlace(SinglePlace request, ServerCallContext context)
        {
            var places = await _repository.AddPlace(request);
            return places;
        }

        public override async Task<Empty> DeletePlace(PlaceIDRequest request, ServerCallContext context)
        {
            await Task.Run(() => _repository.DeletePlace(request.PlaceID));
            var res = new Empty() { };
            return res;
        }

        public override async Task<Empty> UpdatePlace(SinglePlace request, ServerCallContext context)
        {
            await Task.Run(() =>  _repository.UpdatePlace(request));
            var res = new Empty() { };
            return res;
        }
    }
}