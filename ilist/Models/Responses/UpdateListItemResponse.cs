using iList.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iList.Models.Responses
{
    public class UpdateListItemResponse : ResponseBase
    {
        public ListItem Item { get; set; }
    }
}