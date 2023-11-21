using CoffeeShopScheduler.Data;
using CoffeeShopScheduler.Data.IRepository;
using CoffeeShopScheduler.Data.Repositories;
using CoffeeShopScheduler.Infrastructure;
using CoffeeShopScheduler.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(connectionString)
);
//Add Cors
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(
        "CorsPolicy",
        policy =>
        {
            //policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:5173");
            policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Content-Disposition");
        }
    );
});
builder.Services.AddControllers();
//Automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(typeof(LocationProfile));
//Location wiring
builder.Services.AddScoped<ILocation, LocationRepository>();
builder.Services.AddScoped<ILocationService, LocationService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddTransient<IClaimsTransformation, MyClaimsTransformation>();

var app = builder.Build();

app.UseCors("CorsPolicy");
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGroup("/api/identity").MapIdentityApi<IdentityUser>();
app.MapControllerRoute(name: "default", pattern: "/api/{controller}/{action=Index}/{id?}");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
