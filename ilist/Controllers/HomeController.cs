using System.Web.Mvc;

namespace ilist.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "iList";

            return View();
        }
    }
}
