# Projeto WhatsApp CRM Integrado

Este projeto visa criar uma ferramenta de integração entre WhatsApp e o CV CRM, permitindo a interação com leads através de um chat, consulta de status dos leads e gerenciamento das mensagens diretamente no WhatsApp.

### Funcionalidades:
- **Conversar com Leads via WhatsApp:** Permite interagir com os leads de maneira fácil, enviando e recebendo mensagens.
- **Histórico de Mensagens:** As mensagens trocadas com os leads serão armazenadas no banco de dados.
- **Integração com CV CRM:** As informações de status dos leads serão extraídas diretamente da base de dados do CV CRM.
- **Múltiplos Usuários:** Suporte para múltiplos usuários com a possibilidade de escanear diferentes QR Codes.
- **Cache de Mensagens:** As mensagens podem ser pré-carregadas como cache para melhorar a performance.
- **Persistência de Sessões:** A sessão do WhatsApp permanece ativa mesmo após o fechamento do aplicativo, permitindo acesso contínuo.

### Tecnologias Utilizadas:
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (com Mongoose)
  - WhatsApp Web (via biblioteca `whatsapp-web.js`)
- **Frontend:**
  - A ser implementado
- **Outras ferramentas:**
  - Redis (para cache)
  - GitHub Actions (para CI/CD)

### Propriedades das Mensagens:

Ao trabalhar com a biblioteca `whatsapp-web.js`, as mensagens recebidas têm várias propriedades úteis que podem ser acessadas. Aqui estão algumas delas que podem ser utilizadas no seu projeto:

- **`body`**: O conteúdo textual da mensagem.
- **`from`**: O número do remetente no formato `ID@c.us`.
- **`to`**: O número do destinatário da mensagem.
- **`timestamp`**: O horário em que a mensagem foi enviada (timestamp UNIX).
- **`id`**: O ID único da mensagem.
- **`type`**: O tipo da mensagem (ex.: `chat`, `image`, `video`, `audio`, etc.).
- **`hasMedia`**: Indica se a mensagem contém mídia (imagem, vídeo, áudio, etc.).
- **`isGroupMsg`**: Indica se a mensagem foi enviada em um grupo (`true` ou `false`).
- **`chat`**: Informações sobre o chat (conversa), incluindo:
  - **`chat.id`**: ID do chat.
  - **`chat.name`**: Nome do chat (se disponível).
- **`quotedMsg`**: Caso a mensagem seja uma resposta a outra, essa propriedade contém a mensagem citada.
  - **`quotedMsg.body`**: Corpo da mensagem citada.
- **`mentionedIds`**: Lista de IDs de contatos mencionados na mensagem.
- **`isMedia`**: Indica se a mensagem é de mídia (imagem, áudio, vídeo, etc.) (`true` ou `false`).
- **`location`**: Caso a mensagem contenha informações de localização, esta propriedade fornece as coordenadas de latitude e longitude.
- **`sender`**: Informações sobre o remetente, como:
  - **`sender.pushname`**: Nome exibido do remetente.
  - **`sender.id`**: ID do remetente.

### Exemplo de Acesso às Propriedades:

```javascript
client.on('message', message => {
  console.log({
    body: message.body,  // Conteúdo da mensagem
    from: message.from,  // Número do remetente
    timestamp: message.timestamp,  // Hora de envio (timestamp)
    type: message.type,  // Tipo da mensagem (texto, imagem, etc.)
    chatName: message.chat.name,  // Nome do chat
    hasMedia: message.hasMedia,  // Indica se a mensagem tem mídia
    isGroupMsg: message.isGroupMsg,  // Indica se a mensagem é de grupo
    quotedMsg: message.quotedMsg ? message.quotedMsg.body : null,  // Mensagem citada, se houver
    mentionedIds: message.mentionedIds,  // Contatos mencionados
  });
});
```

### ESTRUTURA DE PASTA
```plain
project/
├── src/
│   ├── config/               # Configurações gerais (ex.: variáveis de ambiente, conexões)
│   ├── controllers/          # Lógica das rotas (organização da lógica de negócios)
│   ├── models/               # Modelos para interação com o banco de dados
│   ├── routes/               # Definição de rotas da API
│   ├── services/             # Camada de serviços (integrações externas ou lógica complexa)
│   ├── middlewares/          # Middlewares para autenticação, validação, etc.
│   ├── utils/                # Funções auxiliares e utilitários
│   ├── app.js                # Configuração principal do servidor Express
│   └── server.js             # Inicialização do servidor
├── public/                   # Arquivos públicos (frontend estático, se necessário)
├── tests/                    # Testes automatizados
├── .env                      # Variáveis de ambiente (chaves de API, etc.)
├── .gitignore                # Arquivos/locais a serem ignorados pelo Git
├── package.json              # Dependências e scripts do Node.js
└── README.md                 # Documentação do projeto
```
