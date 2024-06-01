using MensagensServico.Model;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace MensagensServico
{
    internal class Program
    {
        static void Main(string[] args)
        {
            bool sair = false;

            while (sair != true)
            {
                Console.Clear();
                Console.Beep();
                Console.WriteLine("Aguardando mensagens... ");

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

                    EventingBasicConsumer consumer = new(channel);

                    consumer.Received += (model, ea) =>
                    {
                        byte[] body = ea.Body.ToArray();
                        string messageReceived = Encoding.UTF8.GetString(body);

                        Mensagem mensagem = new();

                        if (!string.IsNullOrEmpty(messageReceived))
                        {
                            Console.WriteLine("Mensagem recebida está vazia.");
                            return;
                        }

                        mensagem = JsonSerializer.Deserialize<Mensagem>(messageReceived) ?? throw new Exception("Falha na searialização da mensagem!");

                        Console.WriteLine($"Mensagem recebida: {messageReceived}");
                    };

                    channel.BasicConsume(queue: "mensagens_telefone",
                                         autoAck: true,
                                         consumer: consumer);

                    Console.WriteLine("Digite a tecla ESC para sair ou qualquer outra para continuar... ");

                    if (Console.ReadKey().Key == ConsoleKey.Escape)
                    {
                        sair = true;
                        Console.Beep();
                        Environment.Exit(0);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Erro: {ex.Message}");
                    Console.WriteLine("Pressione qualquer tecla para continuar...");

                    if (Console.ReadKey().Key != ConsoleKey.Insert)
                        continue;
                }
            }
        }
    }
}
