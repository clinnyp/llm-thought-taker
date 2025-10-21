using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using llm_thought_taker.Data;
using llm_thought_taker.Models;
using llm_thought_taker.Filters;
using System.Security.Claims;

namespace llm_thought_taker.Endpoints;

public static class UsersEndpoints
{
    public static void MapUsersEndpoints(this WebApplication app)
    {
        var usersGroup = app.MapGroup("/user").RequireAuthorization();

        // POST /users
        usersGroup.MapPost("/", CreateUser).AllowAnonymous().AddEndpointFilter<ApiKeyAuthFilter>();

        // GET /users
        usersGroup.MapGet("/", GetAllUsers);

        // DELETE /users
        usersGroup.MapDelete("/{externalUserId}", DeleteUser).AllowAnonymous().AddEndpointFilter<ApiKeyAuthFilter>();
    }

    private static async Task<IResult> CreateUser(
        [FromBody] User user,
        AppDbContext db)
    {
        if (user == null)
        {
            return Results.BadRequest(new { message = "Invalid user" });
        }

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return Results.Ok(new { message = "User created Successfully", user });
    }

    private static async Task<IResult> GetAllUsers(AppDbContext db)
    {
        var users = await db.Users.ToListAsync();
        return Results.Ok(users);
    }

    private static async Task<IResult> DeleteUser(
        string externalUserId,
        AppDbContext db)
    {
        if (string.IsNullOrEmpty(externalUserId))
        {
            return Results.BadRequest(new { message = "Invalid user" });
        }
        var dbUser = await db.Users
            .Where(u => u.ExternalId == externalUserId)
            .SingleOrDefaultAsync();

        if (dbUser == null)
        {
            return Results.NotFound(new { message = "User not found" });
        }

        db.Users.Remove(dbUser);
        await db.SaveChangesAsync();

        return Results.Ok(new { message = "User Deleted Successfully", user = dbUser });
    }
}

