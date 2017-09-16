using iList.Data.Models;

namespace iList.Models.Responses
{
    public class GetListItemByIdResponse : ResponseBase
    {
        public ListItem Item { get; set; }
    }
}