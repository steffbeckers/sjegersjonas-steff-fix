using System;

namespace Orion.Helpers
{
    public static class Requires
    {
        public static T IsNotNull<T>(T instance)
        {
            // Use ReferenceEquals in case T overrides equals.
            if (ReferenceEquals(null, instance))
            {
                throw new ArgumentNullException(nameof(instance));
            }

            return instance;
        }
    }
}
