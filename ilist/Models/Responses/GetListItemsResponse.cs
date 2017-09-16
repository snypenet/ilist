using iList.Data.Models;
using System.Collections.Generic;

namespace iList.Models.Responses
{
    public class GetListItemsResponse : ResponseBase
    {
        public List<ListItem> Items { get; set; } = new List<ListItem>();
    }
}