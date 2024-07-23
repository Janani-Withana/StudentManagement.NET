using Microsoft.EntityFrameworkCore;
using StudentWebAPI.Model;

namespace ReactAspCrud.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)
        {
        }
        public DbSet<Student> Student { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Data Source=.; Initial Catalog=lbs; User Id=sa; password=1qaz2wsx; TrustServerCertificate= True");
        //}
    }
}