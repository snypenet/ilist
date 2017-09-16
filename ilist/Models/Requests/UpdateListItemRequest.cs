using iList.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iList.Models.Requests
{
    public class UpdateListItemRequest
    {
        public ListItem Item { get; set; }
    }
}