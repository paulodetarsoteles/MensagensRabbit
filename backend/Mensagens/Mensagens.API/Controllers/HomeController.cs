using Mensagens.API.Service;
using Mensagens.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Mensagens.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet("index")]
        public IActionResult Index() => Ok("API funcionando!");

        [HttpPost("recebermsg")]
        public IActionResult ReceberMsg([FromBody] Mensagem mensagem)
        {
            try
            {
                RabbitMQService servicoMsg = new();

                servicoMsg.EnviarMensagens(mensagem);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro: {ex.Message}");
            }
        }
    }
}
