using System;
using System.ComponentModel;
using System.Globalization;

namespace Orion.Infrastructure.Queries.Filtering
{
    public class FilterParamConverter<T> : TypeConverter
    {
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            if (sourceType == typeof(string))
            {
                return true;
            }
            return base.CanConvertFrom(context, sourceType);
        }

        public override object ConvertFrom(ITypeDescriptorContext context,
            CultureInfo culture, object value)
        {
            if (value is string s)
            {
                if (FilterParam<T>.TryParse(s, out var filter))
                {
                    return filter;
                }
            }
            return base.ConvertFrom(context, culture, value);
        }
    }
}
