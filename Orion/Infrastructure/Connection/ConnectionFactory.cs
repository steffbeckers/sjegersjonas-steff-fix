using Microsoft.Data.Sqlite;
using System.Data;
using System.Threading.Tasks;

namespace Orion.Infrastructure.Connection
{
    public class ConnectionFactory : IConnectionFactory
    {
        private readonly string _connectionString;

        public ConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<SqliteConnection> Create()
        {
            var connection = new SqliteConnection(_connectionString);
            if (connection.State == ConnectionState.Closed)
            {
                await connection.OpenAsync();
            }

            return connection;
        }
    }
}
