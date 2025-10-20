using Microsoft.AspNetCore.Http;
using System.Linq;
namespace llm_thought_taker.Filters;

public class ApiKeyAuthFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var httpContext = context.HttpContext;
        var apiKey = httpContext.Request.Headers["X-INTERNAL-API-KEY"].FirstOrDefault();
        var expectedApiKey = Environment.GetEnvironmentVariable("INTERNAL_API_KEY");

        if (string.IsNullOrEmpty(expectedApiKey))
        {
          throw new InvalidOperationException("INTERNAL_API_KEY is not configured. Set INTERNAL_API_KEY environment variable.");
        }

        if (string.IsNullOrEmpty(apiKey) || apiKey != expectedApiKey)
        {
            return Results.Unauthorized();
        }

        return await next(context);
    }
}