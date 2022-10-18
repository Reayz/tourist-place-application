using Microsoft.EntityFrameworkCore;
using APIGrpcService.Models;

namespace APIGrpcService.Contexts
{
    public class PlacesContext : DbContext
    {
        public PlacesContext()
        {

        }

        public PlacesContext(DbContextOptions<PlacesContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        public virtual DbSet<Place> Places { get; set; } = null!;
    }
}
