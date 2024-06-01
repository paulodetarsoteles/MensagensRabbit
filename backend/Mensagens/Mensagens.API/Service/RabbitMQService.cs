using Mensagens.API.ViewModels;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace Mensagens.API.Service
{
    public class RabbitMQService
    {
        public void EnviarMensagens(Mensagem mensagem)
        {
            try
            {
                ConnectionFactory factory = new() { HostName = "localhost" };

                using IConnection connection = factory.CreateConnection();
                using IModel channel = connection.CreateModel();

                channel.QueueDeclare(queue: "mensagens_telefone",
                                         durable: false,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                string messageToSend = JsonSerializer.Serialize(mensagem);

                byte[] body = Encoding.UTF8.GetBytes(messageToSend);

                channel.BasicPublish(exchange: string.Empty,
                                     routingKey: "mensagens_telefone",
                                     basicProperties: null,
                                     body: body);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }
    }
}
