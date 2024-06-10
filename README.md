# MensagensRabbit
Projeto de teste de envio de mensagens com RabbitMQ

Basicamente eu tenho um frontend simples com HTML, CSS e Javascript que envia uma requisição tipo Ajax para uma API no backend. 

No Backend (tudo com .NET8 e C#) a API recebe a requisição e envia para um container docker rodando o serviço de mensageria RabbitMQ. 
(Ainda vou por direitinho os comandos para rodar o container)

Na última etapa existe um programa console que vai capturar essas mensagens. 

Só precisar instalar o docker e executar o docker compose que está na pasta. 
Depois com o VS Code pode exetuar o frontend com o Live Server
O backend precisa rodar a WebAPI que recebe as mensagens do frontend e envia para o RabbitMQ e o serviço que captura as mensagens e exibe no console. 
