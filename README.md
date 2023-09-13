# Shopper.com.br - Atualização de Preços

Este é um projeto de atualização de preços para Shopper.com.br. Este README fornecerá instruções detalhadas sobre como configurar e executar o projeto localmente.

## Pré-requisitos

Antes de iniciar, verifique se você possui o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) - O Node.js é necessário para executar a aplicação.
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) - Você pode escolher entre npm ou Yarn como gerenciador de pacotes.

## Instalação

Siga estas etapas para instalar e configurar o projeto localmente:

1. Clone o repositório para o seu sistema de arquivos local:

   ```bash
   git clone https://github.com/emersonbbezerra/shopper-price-update---Copia.git

2. Navegue até o diretório do projeto:

   ```bash
   cd shopper-price-update---Copia

3. Instale as dependências do projeto:
       
    * Se você estiver usando npm:
    
       ```bash
       npm install
    
    * Se você estiver usando Yarn:
    
       ```bash
       yarn install

## Configuração
Antes de executar o projeto, é necessário fazer algumas configurações:

Certifique-se de que seu servidor de back-end (onde os dados do arquivo CSV serão processados) esteja em execução e acessível em http://localhost:3000. Certifique-se de que ele esteja pronto para aceitar solicitações POST em http://localhost:3000/upload.

## Execução
Agora você está pronto para executar o projeto:

Inicie a aplicação React:

* Se você estiver usando npm:

   ```bash
   npm start

* Se você estiver usando Yarn:

   ```bash
   yarn start

O projeto será executado e estará acessível em seu navegador em http://localhost:3000. Você verá a página de atualização de preços.

## Uso
Use a opção "Escolher arquivo" para selecionar um arquivo CSV para upload.
Clique no botão "VALIDAR" para enviar o arquivo CSV para validação no servidor.
Os resultados da validação serão exibidos na página. (OBS.: Ficou faltando implementar)
Você também pode visualizar os dados atualizados na tabela de produtos (Após o envio do arquivo CSV, o banco de dados será atualizado).

## Contribuição
Sinta-se à vontade para contribuir para este projeto. Se você encontrar problemas ou desejar adicionar novos recursos, crie um problema ou envie uma solicitação pull.
