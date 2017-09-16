using iList.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iList.Data.Providers
{
    public interface IListItemProvider
    {
        Task<List<ListItem>> GetListItems();
        Task<ListItem> GetListItemById(Guid listItemId);
        Task<bool> DeleteListItemById(Guid listItemId);
        Task<ListItem> UpdateListItem(ListItem updatedItem);
        Task<ListItem> InsertListItem(string text);
    }
}
