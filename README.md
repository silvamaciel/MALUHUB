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

### Estrutura de Pastas:

```plaintext
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
