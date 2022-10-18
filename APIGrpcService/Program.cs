using APIGrpcService.Contexts;
using APIGrpcService.Repository;
using APIGrpcService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.AddDbContext<PlacesContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Key")));
builder.Services.AddScoped<IPlacesRepository, PlacesRepository>();
var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<PlacesService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
