using System;
using System.ComponentModel;

namespace Orion.Infrastructure.Queries
{
    [TypeConverter(typeof(SortingParamConverter))]
    public class SortingParam
    {
        public string PropertyName { get; set; }
        public SortOrder Order { get; set; }

        public static bool TryParse(string s, out SortingParam result)
        {
            result = null;

            var parts = s.Split(',');
            if (parts.Length != 2)
            {
                return false;
            }

            if (Enum.TryParse(typeof(SortOrder), parts[1], true, out var order))
            {
                result = new SortingParam { PropertyName = parts[0], Order = (SortOrder)order };
                return true;
            }

            return false;
        }
    }
}
