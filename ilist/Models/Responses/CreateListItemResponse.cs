using iList.Data.Models;

namespace iList.Models.Responses
{
    public class CreateListItemResponse : ResponseBase
    {
        public ListItem Item { get; set; }
    }
}