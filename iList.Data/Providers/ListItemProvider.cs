using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iList.Data.Models;
using System.Configuration;

namespace iList.Data.Providers
{
    public class ListItemProvider : ProviderBase, IListItemProvider
    {
        protected override string ConnectionString => ConfigurationManager.ConnectionStrings["iList"].ConnectionString;

        public async Task<List<ListItem>> GetListItems()
        {
            return (await QueryAsync<ListItem>(@"SELECT * FROM ListItem (NOLOCK) ORDER BY LastUpdatedOn DESC")).ToList();
        }

        public async Task<ListItem> GetListItemById(Guid listItemId)
        {
            return (await QueryAsync<ListItem>(@"SELECT * FROM ListItem (NOLOCK) WHERE Id = @Id", new { Id = listItemId })).FirstOrDefault();
        }

        public async Task<bool> DeleteListItemById(Guid listItemId)
        {
            return (await ExecuteAsync(@"DELETE FROM ListItem Where Id = @Id", new { Id = listItemId })) > 0;
        }

        public async Task<ListItem> UpdateListItem(ListItem updatedItem)
        {
            return (await QueryAsync<ListItem>(@"UPDATE ListItem
                                                 SET Text = @Text,
                                                     LastUpdatedOn = GETDATE()
                                                 WHERE Id = @Id;
                                                 SELECT * FROM ListItem (NOLOCK)", new { Id = updatedItem, Text = updatedItem.Text })).FirstOrDefault();
        }

        public async Task<ListItem> InsertListItem(string text)
        {
            var newId = Guid.NewGuid();
            return (await QueryAsync<ListItem>(@"INSERT INTO ListItem
                                                 (Id, Text, CreatedOn, LastUpdatedOn)
                                                 VALUES
                                                 (@NewId, @Text, GETDATE(), GETDATE());
                                                 SELECT * 
                                                 FROM ListItem (NOLOCK)
                                                 WHERE Id = @NewId", new { Text = text, NewId = newId })).FirstOrDefault();
        }
    }
}
