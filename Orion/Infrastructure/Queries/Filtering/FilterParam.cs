using System;
using System.ComponentModel;
using System.Linq;

namespace Orion.Infrastructure.Queries.Filtering
{
    public abstract class FilterParam
    {
        public FilterOperator Operator { get; set; }
    }

    [TypeDescriptionProvider(typeof(FilterParamTypeDescriptionProvider))]
    public class FilterParam<T> : FilterParam
    {
        public T Value { get; set; }

        public static bool TryParse(string s, out FilterParam<T> result)
        {
            result = default(FilterParam<T>);
            var filterOperators = Enum.GetValues(typeof(FilterOperator)).Cast<FilterOperator>();
            foreach (var filterOperatorString in filterOperators.Select<FilterOperator, string>(x => x.ToFilterOperatorString()).OrderByDescending(x => x.Length))
            {
                if (s.StartsWith(filterOperatorString))
                {
                    if (s.TryParse(filterOperatorString, out result))
                    {
                        return true;
                    }

                    return false;
                }
            }

            return false;
        }
    }
}
