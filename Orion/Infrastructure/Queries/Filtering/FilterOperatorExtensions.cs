using System;
using System.ComponentModel;
using System.Globalization;

namespace Orion.Infrastructure.Queries.Filtering
{
    public static class FilterOperatorExtensions
    {
        public static FilterOperator ToFilterOperator(this string filterOperatorString)
        {
            switch (filterOperatorString)
            {
                case "":
                    return FilterOperator.Equal;
                case "!":
                    return FilterOperator.Unequal;
                case "<":
                    return FilterOperator.LessThan;
                case "<=":
                    return FilterOperator.LessThanOrEqualTo;
                case ">":
                    return FilterOperator.GreaterThan;
                case ">=":
                    return FilterOperator.GreaterThanOrEqualTo;
                case "~":
                    return FilterOperator.Contains;
                default:
                    return FilterOperator.Equal;
            }
        }

        public static string ToFilterOperatorString(this FilterOperator filterOperator)
        {
            switch (filterOperator)
            {
                case FilterOperator.Equal:
                    return "";
                case FilterOperator.Unequal:
                    return "!";
                case FilterOperator.LessThan:
                    return "<";
                case FilterOperator.LessThanOrEqualTo:
                    return "<=";
                case FilterOperator.GreaterThan:
                    return ">";
                case FilterOperator.GreaterThanOrEqualTo:
                    return ">=";
                case FilterOperator.Contains:
                    return "~";
                default:
                    throw new ArgumentOutOfRangeException(nameof(filterOperator), filterOperator, null);
            }
        }

        public static bool TryParse<T>(this string filter, string operatorString, out FilterParam<T> filterParam)
        {
            filterParam = default(FilterParam<T>);
            if (filter.Substring(operatorString.Length).TryParse<T>(out var value))
            {
                filterParam = new FilterParam<T> { Operator = operatorString.ToFilterOperator(), Value = value };
                return true;
            }

            return false;
        }

        public static bool TryParse<T>(this string inValue, out T result)
        {
            try
            {
                if (inValue == "null")
                {
                    result = default(T);
                }
                else
                {
                    var converter = TypeDescriptor.GetConverter(typeof(T));
                    result = (T)converter.ConvertFromString(null, CultureInfo.InvariantCulture, inValue);
                }
            }
            catch
            {
                result = default(T);
                return false;
            }
            return true;
        }


        public static string ToFilterString<T>(this FilterParam<T> filterParam, string propertyName, string paramName)
        {
            switch (filterParam.Operator)
            {
                case FilterOperator.Equal:
                    return $"{propertyName} = @{paramName}";
                case FilterOperator.Unequal:
                    return "";
                case FilterOperator.Contains:
                    return "";
                case FilterOperator.LessThanOrEqualTo:
                    return "";
                case FilterOperator.LessThan:
                    return "";
                case FilterOperator.GreaterThanOrEqualTo:
                    return "";
                case FilterOperator.GreaterThan:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            return "";
        }

    }
}
