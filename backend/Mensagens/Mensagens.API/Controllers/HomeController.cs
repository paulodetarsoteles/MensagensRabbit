using Microsoft.AspNetCore.Mvc;

namespace Mensagens.API.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => Ok("API funcionando!");
    }
}
