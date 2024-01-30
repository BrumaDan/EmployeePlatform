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
        
       
        public AccountController(ITokenService service, IMapper mapper, UserManager<AppUser> userManager )
        {
            _tokenService = service;
            this.mapper = mapper;
            _userManager = userManager;
           
        }

        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
            var user = mapper.Map<AppUser>(registerDto);
            user.UserName = registerDto.Username.ToLower();
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            var roleResult = await _userManager.AddToRoleAsync(user, registerDto.Role);
            if (!roleResult.Succeeded) return BadRequest(result.Errors);
                return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
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
