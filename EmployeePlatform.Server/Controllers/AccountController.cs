using AutoMapper;
using EmployeePlatform.Server.Data;
using EmployeePlatform.Server.DomainModel;
using EmployeePlatform.Server.DTOs;
using EmployeePlatform.Server.Interfaces;
using EmployeePlatform.Server.Models;
using EmployeePlatform.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text.Json;

namespace EmployeePlatform.Server.Controllers
{
    public class AccountController : BaseApiController
    {        
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper mapper;
        private readonly ApplicationDbContext dbContext;

        public AccountController(ITokenService service, IMapper mapper, UserManager<AppUser> userManager , ApplicationDbContext dbContext)
        {
            _tokenService = service;
            this.mapper = mapper;
            this.dbContext = dbContext;
            _userManager = userManager;
           
        }


        [HttpPut("update")]
        public async Task<ActionResult<AppUser>> Update(UpdateUserDto updateUserDto) {
            try
            {
                var user = mapper.Map<AppUser>(updateUserDto);
                var dbUser = await _userManager.FindByNameAsync(updateUserDto.Username);
                dbUser.FirstName = user.FirstName;
                dbUser.LastName = user.LastName;
                dbUser.UserName = user.UserName;
                var updatedUser = await _userManager.UpdateAsync(dbUser);
                //var roleResult = await _userManager.AddToRoleAsync(user, updateUserDto.Role);
                if (updateUserDto.Location != null) {
                    var userLocationAssign = await dbContext.AppUserLocation.AddAsync(new AppUserLocation { UserId = dbUser.Id, LocationId = (Guid)updateUserDto.Location });
                }                
                await dbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
      
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {                     
            try
            {
                if (await UserExists(registerDto.Username))
                    return BadRequest("Username is taken");

                var user = mapper.Map<AppUser>(registerDto);
                user.UserName = registerDto.Username.ToLower();

                var result = await _userManager.CreateAsync(user, registerDto.Password);
                if (!result.Succeeded)
                {                 
                    return BadRequest(result.Errors);
                }

                var roleResult = await _userManager.AddToRoleAsync(user, registerDto.Role);
                if (!roleResult.Succeeded)
                {                 
                    return BadRequest(roleResult.Errors);
                }

                var userLocationAssign = await dbContext.AppUserLocation.AddAsync(new AppUserLocation {UserId= user.Id, LocationId = registerDto.Location });                                
                await dbContext.SaveChangesAsync();

                return new UserDto
                {
                    Username = user.UserName,
                    Token = await _tokenService.CreateToken(user)
                };
            }
            catch (Exception ex)
            {                
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);           
            if (user == null) return Unauthorized("invalid username");
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!result) return Unauthorized("invalid password");
            var roles = await _userManager.GetRolesAsync(user);
            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Role = roles
            };
        }
        [HttpGet("users")]
        public async Task<ActionResult<List<AppUser>>> GetEmployees()
        {
            var users = await _userManager.Users.Include(user=> user.UserRoles).ThenInclude(user => user.Role)
                .Include(user=> user.UserLocations).ThenInclude(ul=>ul.Location).ToListAsync();
            var employees = users.Where(x => x.UserRoles.Any(x => x.Role.Name == "Employee")).Select(x => new
            {
                Id= x.Id,
                UserName = x.UserName,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Location = x.UserLocations.Select(x=> new {Name= x.Location.Name, Id= x.Location.Id, City= x.Location.City }),                
                Role = x.UserRoles.Select(x => x.Role.Name)
            });           
            return Ok(employees);
        }        
        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
        
    }
}
