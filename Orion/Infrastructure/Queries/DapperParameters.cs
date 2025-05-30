using System;
using System.Collections.Generic;
using System.Linq;
using Orion.Helpers;
using Orion.Infrastructure.Queries.Filtering;
using Orion.Infrastructure.Queries.Pagination;

namespace Orion.Infrastructure.Queries
{
    public class DapperParameters : Dictionary<string, object>
    {
        public DapperParameters() : base()
        {

        }

        public DapperParameters(PagingParams pagingParams) : base()
        {
            Add("Limit", pagingParams.PageSize);
            Add("Offset", pagingParams.PageSize * (pagingParams.Page - 1));
        }

        public void Add<T>(string columnName, FilterParam<T> filter)
        {
            if (filter == null || filter.Value == null)
            {
                return;
            }

            if (filter.Value.GetType().IsEnum || filter.Value is DateTime || filter.Value is decimal)
            {
                Add(columnName, filter.Value);
            }
            else
            {
                Add(columnName, filter.Operator == FilterOperator.Contains ? "%" + filter.Value + "%" : filter.Value.ToString());
            }
        }

        public void Add<T>(string[] columnNames, FilterParam<T> filter)
        {
            foreach (var columnName in columnNames)
            {
                Add(columnName, filter);
            }
        }

        public void Add<T>(string columnName, FilterParam<T>[] filters)
        {
            if (!filters.IsNullOrEmpty())
            {
                foreach (var filterGroup in filters.GroupBy(x => x.Operator).ToList())
                {
                    var @operator = filterGroup.First().Operator;
                    if (filterGroup.Count() > 1 && (@operator == FilterOperator.Equal || @operator == FilterOperator.Unequal))
                    {
                        Add($"{StringHelper.SanitizeAlias(columnName)}_{@operator}", filterGroup.Select(x => x.Value).ToArray());
                    }
                    else
                    {
                        Add($"{StringHelper.SanitizeAlias(columnName)}_{@operator}", filterGroup.First());
                    }
                }
            }
        }

        public void Add(string columnName, FilterParam<DateTime> filter)
        {
            Add(columnName, filter?.Value);
        }

        public void Add(string columnName, FilterParam<bool> filter)
        {
            Add(columnName, filter?.Value);
        }

        public void Add(string value)
        {
            var searchValues = SqlQueryBuilderExtensions.GetSearchValues(value);
            if (!searchValues.IsNullOrEmpty())
            {
                for (var i = 0; i < searchValues.Length; i++)
                {
                    Add("Search" + i, "%" + searchValues[i] + "%");
                }
            }
        }
    }
}
