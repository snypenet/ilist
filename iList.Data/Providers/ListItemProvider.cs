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
            return (await QueryAsync<ListItem>(@"SELECT * FROM ListItem (NOLOCK)")).ToList();
        }

        public async Task<ListItem> GetListItemById(Guid listItemId)
        {
            return (await QueryAsync<ListItem>(@"SELECT * FROM ListItem WHERE Id = @Id", new { Id = listItemId })).FirstOrDefault();
        }

        public async Task<bool> DeleteListItemById(Guid listItemId)
        {
            return (await ExecuteAsync(@"DELETE FROM ListItem Where Id = @Id", new { Id = listItemId })) > 0;
        }

        public async Task<ListItem> UpdateListItem(ListItem updatedItem)
        {
            return (await QueryAsync<ListItem>(@"UPDATE ListItem
                                                 SET Text = @Text
                                                 WHERE Id = @Id;
                                                 SELECT * FROM ListItem (NOLOCK)", new { Id = updatedItem, Text = updatedItem.Text })).FirstOrDefault();
        }

        public async Task<ListItem> InsertListItem(string text)
        {
            return (await QueryAsync<ListItem>(@"INSERT INTO ListItem
                                                 (Id, Text)
                                                 VALUES
                                                 (NEWID(), @Text);
                                                 SELECT * 
                                                 FROM ListItem (NOLOCK)
                                                 WHERE Id = SCOPE_IDENTITY()", new { Text = text })).FirstOrDefault();
        }
    }
}
