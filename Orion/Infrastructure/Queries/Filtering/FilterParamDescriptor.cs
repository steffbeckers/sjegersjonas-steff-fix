using System;
using System.ComponentModel;

namespace Orion.Infrastructure.Queries.Filtering
{
    public class FilterParamDescriptor : CustomTypeDescriptor
    {
        private Type _objectType;

        public FilterParamDescriptor(Type objectType)
        {
            _objectType = objectType;
        }

        public override TypeConverter GetConverter()
        {
            var genericArg = _objectType.GenericTypeArguments[0];
            var converterType = typeof(FilterParamConverter<>).MakeGenericType(genericArg);
            var converter = (TypeConverter)Activator.CreateInstance(converterType);
            return converter;
        }
    }
}
