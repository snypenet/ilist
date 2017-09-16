using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;

namespace iList.Data.Providers
{
    public abstract class ProviderBase
    {
        protected abstract string ConnectionString { get; }

        private SqlConnection Connection => new SqlConnection(ConnectionString);

        protected async Task<int> ExecuteAsync(string query, object parameters = null)
        {
            using (var connection = Connection)
            {
                return await connection.ExecuteAsync(query, parameters);
            }
        }

        protected async Task<IEnumerable<Tout>> QueryAsync<Tout>(string query, object parameters = null)
        {
            using (var connection = Connection)
            {
                return await connection.QueryAsync<Tout>(query, parameters);
            }
        }
    }
}
