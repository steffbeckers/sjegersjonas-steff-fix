﻿using System.Collections.Generic;
using System.Linq;

namespace Orion.Helpers
{
    public static class EnumerableExtensions
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable)
        {
            return (enumerable == null) ? true : false;
        }
    }
}
