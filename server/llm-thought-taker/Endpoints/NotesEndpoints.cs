using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;
using GenerativeAI;
using llm_thought_taker.Data;
using llm_thought_taker.DTOs;
using llm_thought_taker.Models;

namespace llm_thought_taker.Endpoints;

public static class NotesEndpoints
{
    public static void MapNotesEndpoints(this WebApplication app)
    {
        var notesGroup = app.MapGroup("/notes")
            .RequireAuthorization();

        // GET /notes/{noteId}
        notesGroup.MapGet("/{noteId}", GetNoteById);

        // POST /notes
        notesGroup.MapPost("/", CreateNote);

        // DELETE /notes/{noteId}
        notesGroup.MapDelete("/{noteId}", DeleteNote);

        // GET /notes/users
        notesGroup.MapGet("/users", GetAllNotesForUser);

        // POST /generate_chat
        app.MapPost("/generate_chat", GenerateChatResponse).RequireAuthorization();
    }

    private static async Task<IResult> GetNoteById(
        string noteId,
        ClaimsPrincipal user,
        AppDbContext db)
    {
        try
        {
            var externalUserId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var dbUser = await db.Users
                .Where(u => u.ExternalId == externalUserId)
                .SingleOrDefaultAsync();
            
            if (dbUser == null)
            {
                return Results.NotFound(new { message = "User not found" });
            }

            var note = await db.Notes
                .Where(n => n.Id == Guid.Parse(noteId))
                .FirstOrDefaultAsync(u => u.User.ExternalId == externalUserId);

            if (note == null)
            {
                return Results.NotFound(new { message = "Note not found" });
            }

            return Results.Ok(new { message = "Note Retrieved Successfully", note });
        }
        catch (Exception e)
        {
            return Results.Problem(
                detail: $"Error retrieving notes: {e.Message}",
                statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> CreateNote(
        [FromBody] NoteRequest noteRequest,
        AppDbContext db)
    {
        if (noteRequest == null)
        {
            return Results.BadRequest(new { message = "Invalid Note" });
        }

        var user = await db.Users
            .Where(u => u.ExternalId == noteRequest.ExternalUserId)
            .SingleOrDefaultAsync();
        
        if (user == null)
        {
            return Results.BadRequest(new { message = "User not found" });
        }

        var note = new Note
        {
            UserId = user.Id,
            Title = noteRequest.Title ?? string.Empty,
            Content = noteRequest.Content ?? string.Empty,
            Prompt = noteRequest.Prompt ?? string.Empty,
        };

        db.Notes.Add(note);
        await db.SaveChangesAsync();

        return Results.Ok(new { message = "Note Created Successfully", note });
    }

    private static async Task<IResult> DeleteNote(
        string noteId,
        AppDbContext db)
    {
        var note = await db.Notes
            .Where(n => n.Id == Guid.Parse(noteId))
            .SingleOrDefaultAsync();
        
        if (note == null)
        {
            return Results.NotFound(new { message = "Note not found" });
        }

        db.Notes.Remove(note);
        await db.SaveChangesAsync();

        return Results.Ok(new { message = "Note Deleted Successfully", note });
    }

    private static async Task<IResult> GetAllNotesForUser(
        ClaimsPrincipal user,
        AppDbContext db)
    {
        try
        {
            var externalUserId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var dbUserId = await db.Users.Where(u => u.ExternalId == externalUserId).Select(u => u.Id).FirstOrDefaultAsync();
            if (dbUserId == null)
            {
                return Results.NotFound(new { message = "User not found" });
            }

            var notes = await db.Notes
                .Where(n => n.UserId == dbUserId)
                .OrderByDescending(note => note.Created)
                .ToListAsync();

            if (notes.Count == 0)
            {
                return Results.NotFound(new { message = "No notes found for user" });
            }

            return Results.Ok(new { message = "Notes Retrieved Successfully", notes });
        }
        catch (Exception e)
        {
            return Results.Problem(
                detail: $"Error retrieving notes: {e.Message}",
                statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GenerateChatResponse(
        [FromBody] PromptRequest prompt,
        ClaimsPrincipal user,
        HttpContext context)
    {
        if (prompt?.Prompt == null)
        {
            return Results.BadRequest(new { message = "Invalid prompt" });
        }

        var model = context.RequestServices.GetService<GenerativeModel>();
        if (model == null)
        {
            return Results.Problem(
                detail: "AI service is not configured. Set GEMINI_API_KEY environment variable.",
                statusCode: StatusCodes.Status503ServiceUnavailable);
        }

        var modelResponse = await model.GenerateContentAsync(prompt.Prompt);

        return Results.Ok(new { message = "Chat Generated Successfully", chat = modelResponse.Text() });
    } 
}
