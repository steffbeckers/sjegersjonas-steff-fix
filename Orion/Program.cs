using MediatR;
using Microsoft.EntityFrameworkCore;
using Orion.Data;
using Orion.Infrastructure.DependencyInjection;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Dapper;
using Orion.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("ApplicationConnection");
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlite(connectionString));

// Convert database string to Guid
SqlMapper.AddTypeHandler(new SQLiteGuidTypeHandler());
SqlMapper.RemoveTypeMap(typeof(Guid));
SqlMapper.RemoveTypeMap(typeof(Guid?));

builder.Services.AddFluentValidation(f => {
    f.ValidatorOptions.CascadeMode = CascadeMode.Stop;
    f.RegisterValidatorsFromAssemblyContaining(typeof(Program));
});

builder.Services.AddMediatR(typeof(Program));
builder.Services.AddAutoMapper(typeof(Program));
RepositoryConfigurator.Configure(builder.Services);
ConnectionConfigurator.Configure(builder.Services, connectionString);


builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Sign in
    options.SignIn.RequireConfirmedEmail = false;

    // Password
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 10;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequiredUniqueChars = 6;

    // Lockout
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
    options.Lockout.MaxFailedAccessAttempts = 10;
    options.Lockout.AllowedForNewUsers = true;

    // User
    options.User.RequireUniqueEmail = true;
});

// JWT's
var key = Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Authentication").GetValue<string>("Secret"));
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero,
        ValidateLifetime = true
    };
});

// Authorization
builder.Services.AddAuthorization();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Authentication
app.UseAuthentication();

// Authorization
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
