using APIGrpcClient;
using Grpc.Net.Client;
using TouristPlaceAPI.Models;

namespace TouristPlaceAPI.Services
{
    public class PlacesService : IPlacesService
    {
        string grpcServiceUrl = "http://localhost:5001";
        public async Task<IEnumerable<Place>> CallGrpcForGetAllPlaces()
        {
            using var channel = GrpcChannel.ForAddress(grpcServiceUrl);
            var client = new Places.PlacesClient(channel);
            var response = await client.GetAllPlacesAsync(new Empty() { });

            List<Place> Places = new List<Place>();
            foreach(var place in response.Places)
            {
                Places.Add(new Place()
                {
                    PlaceID = place.PlaceID,
                    Name = place.Name,
                    Address = place.Address,
                    Rating = place.Rating,
                    Type = place.Type,
                    Picture = place.Picture
                });
            }

            return Places;
        }

        public async Task<Place> CallGrpcForGetPlaceDetails(int placeID)
        {
            using var channel = GrpcChannel.ForAddress(grpcServiceUrl);
            var client = new Places.PlacesClient(channel);

            var request = new PlaceIDRequest() { PlaceID = placeID };

            var response = await client.GetDetailsAsync(request);

            Place placeObj = new Place()
            {
                PlaceID = response.PlaceID,
                Name = response.Name,
                Address = response.Address,
                Rating = response.Rating,
                Type = response.Type,
                Picture = response.Picture
            };

            return placeObj;
        }

        public async Task<Place> CallGrpcForAddPlace(Place place)
        {
            using var channel = GrpcChannel.ForAddress(grpcServiceUrl);
            var client = new Places.PlacesClient(channel);

            SinglePlace singlePlace = new SinglePlace()
            {
                PlaceID = place.PlaceID,
                Name = place.Name,
                Address = place.Address,
                Rating = place.Rating,
                Type = place.Type,
                Picture = place.Picture
            };

            var response = await client.AddPlaceAsync(singlePlace);

            Place placeObj = new Place()
            {
                PlaceID = response.PlaceID,
                Name = response.Name,
                Address = response.Address,
                Rating = response.Rating,
                Type = response.Type,
                Picture = response.Picture
            };

            return placeObj;
        }

        public async Task CallGrpcForDeletePlace(int placeID)
        {
            using var channel = GrpcChannel.ForAddress(grpcServiceUrl);
            var client = new Places.PlacesClient(channel);

            var request = new PlaceIDRequest() { PlaceID = placeID };

            await Task.Run(() => client.DeletePlace(request));

            return;
        }

        public async Task CallGrpcForUpdatePlace(Place place)
        {
            using var channel = GrpcChannel.ForAddress(grpcServiceUrl);
            var client = new Places.PlacesClient(channel);

            SinglePlace singlePlace = new SinglePlace()
            {
                PlaceID = place.PlaceID,
                Name = place.Name,
                Address = place.Address,
                Rating = place.Rating,
                Type = place.Type,
                Picture = place.Picture
            };

            await Task.Run(() => client.UpdatePlace(singlePlace));

            return;
        }
    }
}
