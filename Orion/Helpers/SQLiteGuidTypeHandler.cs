using Dapper;
using System.Data;

namespace Orion.Helpers
{
    public class SQLiteGuidTypeHandler : SqlMapper.TypeHandler<Guid>
    {
        public override void SetValue(IDbDataParameter parameter, Guid guid)
        {
            parameter.Value = guid.ToString().ToUpper();
        }

        public override Guid Parse(object value)
        {
            return new Guid((string)value);
        }
    }
}
