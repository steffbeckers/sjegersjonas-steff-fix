using System;
using System.ComponentModel;

namespace Orion.Infrastructure.Queries.Filtering
{
    public class FilterParamTypeDescriptionProvider : TypeDescriptionProvider
    {
        public override ICustomTypeDescriptor GetTypeDescriptor(Type objectType, object instance)
        {
            return new FilterParamDescriptor(objectType);
        }
    }
}
