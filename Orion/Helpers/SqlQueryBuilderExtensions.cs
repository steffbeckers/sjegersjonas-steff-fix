using Orion.Infrastructure.Queries.Filtering;
using System;
using System.Linq;
using System.Text;

namespace Orion.Helpers
{
    public static class SqlQueryBuilderExtensions
    {
        private static string CreateWhereClause<T>(string columnName)
        {
            return $"{columnName} = @{columnName}";
        }

        private static string CreateWhereClause(string columnName, string alias)
        {
            return $"{columnName} = @{alias}";
        }

        private static string CreateWhereInClause<T>(string columnName)
        {
            return $"{columnName} IN @{columnName}";
        }

        private static string CreateWhereClause<T>(string columnName, FilterParam<T> filter)
        {
            return CreateWhereClause<T>(columnName, columnName, filter);
        }

        private static string CreateWhereClause<T>(string columnName, FilterParam<T>[] filter)
        {
            return CreateWhereClause<T>(columnName, columnName, filter);
        }

        private static string CreateWhereClause<T>(string columnName, string alias, FilterParam<T> filter)
        {
            if (filter.Value == null)
            {
                return $"{columnName} {GetNullCondition(filter.Operator)} NULL";
            }
            else
            {
                return $"{columnName} {GetCondition(filter.Operator)} @{alias}";
            }
        }

        private static string CreateWhereClause<T>(string columnName, string alias, FilterParam<T>[] filter)
        {
            var groupedFilters = filter.GroupBy(x => x.Operator).ToList();
            var whereClause = $"";

            for (var i = 0; i < groupedFilters.Count; i++)
            {
                if (i > 0)
                {
                    whereClause = $"{whereClause} AND ";
                }

                var @operator = groupedFilters[i].First().Operator;
                whereClause = $"{whereClause}{columnName} {GetCondition(@operator, groupedFilters[i].Count())} @{StringHelper.SanitizeAlias(alias)}_{@operator}";
            }

            return whereClause;
        }

        private static string GetCondition(FilterOperator filterOperator, int count = 1)
        {
            switch (filterOperator)
            {
                case FilterOperator.Equal:
                    return count == 1 ? "=" : "IN";
                case FilterOperator.Unequal:
                    return count == 1 ? "<>" : "NOT IN";
                case FilterOperator.Contains:
                    return "LIKE";
                case FilterOperator.LessThanOrEqualTo:
                    return "<=";
                case FilterOperator.LessThan:
                    return "<";
                case FilterOperator.GreaterThanOrEqualTo:
                    return ">=";
                case FilterOperator.GreaterThan:
                    return ">";
                default:
                    throw new ArgumentOutOfRangeException(nameof(filterOperator), filterOperator, null);
            }
        }

        private static string GetNullCondition(FilterOperator filterOperator)
        {
            switch (filterOperator)
            {
                case FilterOperator.Equal:
                    return "IS";
                case FilterOperator.Unequal:
                    return "IS NOT";
                default:
                    throw new ArgumentOutOfRangeException(nameof(filterOperator), filterOperator, null);
            }
        }

        public static string CreateOrAddWhere<T>(this string whereClause, FilterParam<T> filter, string columnName)
        {
            if (whereClause.Contains("WHERE"))
            {
                return whereClause.AddWhere(filter, columnName);
            }

            return whereClause.CreateWhere(filter, columnName);
        }

        public static string CreateOrAddWhere<T>(this string whereClause, FilterParam<T>[] filter, string columnName)
        {
            if (whereClause.Contains("WHERE"))
            {
                return whereClause.AddWhere(filter, columnName);
            }

            return whereClause.CreateWhere(filter, columnName);
        }

        private static string CreateWhere<T>(this string whereClause, FilterParam<T> filter, string columnName)
        {
            if (filter != null)
            {
                return " WHERE " + CreateWhereClause(columnName, filter);
            }

            return whereClause;
        }

        private static string CreateWhere<T>(this string whereClause, FilterParam<T>[] filter, string columnName)
        {
            if (!filter.IsNullOrEmpty())
            {
                return " WHERE " + CreateWhereClause(columnName, filter);
            }

            return whereClause;
        }

        public static string AddWhere<T>(this string whereClause, FilterParam<T> filter, string columnName)
        {
            if (filter != null)
            {
                return whereClause + " AND " + CreateWhereClause(columnName, filter);
            }

            return whereClause;
        }

        public static string AddWhere<T>(this string whereClause, FilterParam<T> filter, string[] columnNames)
        {
            if (filter != null && columnNames.Any())
            {
                whereClause = whereClause + " AND (" + CreateWhereClause(columnNames.First(), filter);

                foreach (var columnName in columnNames.Skip(1))
                {
                    whereClause = whereClause + " OR " + CreateWhereClause(columnName, filter);
                }
                return whereClause + ")";
            }

            return whereClause;
        }

        public static string AddWhere<T>(this string whereClause, FilterParam<T>[] filter, string columnName)
        {
            if (!filter.IsNullOrEmpty())
            {
                return whereClause + " AND " + CreateWhereClause(columnName, filter);
            }

            return whereClause;
        }

        public static string AddWhere(this string whereClause, string columnName, string alias)
        {
            return whereClause + " AND " + CreateWhereClause(columnName, alias);
        }

        public static string AddWhere<T>(this string whereClause, FilterParam<T> filter, string columnName, string alias)
        {
            if (filter != null)
            {
                return whereClause + " AND " + CreateWhereClause(columnName, alias, filter);
            }

            return whereClause;
        }

        public static string AddWhere<T>(this string whereClause, FilterParam<T>[] filter, string columnName, string alias)
        {
            if (!filter.IsNullOrEmpty())
            {
                return whereClause + " AND " + CreateWhereClause(columnName, alias, filter);
            }

            return whereClause;
        }

        public static string AddWhereNullableDateTime<T>(this string whereClause, FilterParam<T> filter, string columnName)
        {
            if (filter != null)
            {
                return (filter.Operator == FilterOperator.GreaterThan || filter.Operator == FilterOperator.GreaterThanOrEqualTo) ?
                    whereClause + " AND (" + CreateWhereClause(columnName, filter) + $" OR {columnName} IS NULL)"
                    : whereClause + " AND " + CreateWhereClause(columnName, filter);
            }

            return whereClause;
        }

        public static string AddWhereDateRange(this string whereClause, FilterParam<DateTime> filterStart, FilterParam<DateTime> filterEnd, string columnNameStart, string columnNameEnd, string aliasStart, string aliasEnd)
        {
            if (filterStart != null && filterEnd != null)
            {
                return $"{whereClause} AND (( @{aliasStart} >= {columnNameStart} AND ( @{aliasStart} <= {columnNameEnd} OR {columnNameEnd} IS NULL)) OR ( @{aliasStart} <= {columnNameStart} AND ( @{aliasStart} <= {columnNameEnd} OR {columnNameEnd} IS NULL )))" +
                    $" AND (( @{aliasEnd} >= {columnNameStart} AND ( @{aliasEnd} <= {columnNameEnd} OR {columnNameEnd} IS NULL)) OR ( @{aliasEnd} >= {columnNameStart} AND ( @{aliasEnd} <= {columnNameEnd} OR {columnNameEnd} IS NULL )))";
            }

            return whereClause;
        }

        public static string AddWhere(this string whereClause, string columnName)
        {
            return $"{whereClause} AND {columnName} = @{columnName}";
        }

        public static string AddSearch(this string whereClause, string value, params string[] columns)
        {
            var searchValues = GetSearchValues(value);
            if (!searchValues.IsNullOrEmpty() && !columns.IsNullOrEmpty())
            {
                var concatQuery = "CONCAT_WS(' ', " + string.Join(", ", columns) + ")";
                var sb = new StringBuilder();

                for (var i = 0; i < searchValues.Length; i++)
                {
                    sb.Append(" AND " + concatQuery + " LIKE @Search" + i);
                }

                return whereClause + sb;
            }

            return whereClause;
        }

        public static string[] GetSearchValues(string value)
        {
            return value?.Split(" ", StringSplitOptions.RemoveEmptyEntries);
        }
    }
}