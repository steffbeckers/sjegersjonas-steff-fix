using System.Text.RegularExpressions;

namespace Orion.Helpers
{
    public class StringHelper
    {
        public static string? TrimOrSetNull(string? str)
        {
            if(string.IsNullOrWhiteSpace(str))
            {
                return null;
            }
            return str.Trim();
        }

        public static string SanitizeAlias(string alias) // Dapper Params
        {
            return Regex.Replace(alias, "[^a-zA-Z0-9]", String.Empty);
        }

    }
}
