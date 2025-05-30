namespace Orion.Application.Errors
{
    public class ErrorCodes
    {
        public static List<KeyValuePair<int, string>> Codes = new List<KeyValuePair<int, string>>
        {
            // General
            new KeyValuePair<int, string>(1000, "Entity not found."),
            new KeyValuePair<int, string>(1001, "Name already exists."),
            new KeyValuePair<int, string>(1002, "Entity already exists."),

            // Poduct
            new KeyValuePair<int, string>(1500, "Code already exists."),

        };

        public static KeyValuePair<string, string> GetError(int key)
        {
            var error = Codes.FirstOrDefault(x => x.Key.Equals(key));
            var defaultValue = default(KeyValuePair<string, string>);
            if (error.Equals(defaultValue))
            {
                return new KeyValuePair<string, string>("E9999", $"No Error found for {key}!");
            }

            return new KeyValuePair<string, string>("E" + error.Key.ToString(), error.Value.ToString());
        }


    }
}
