# Exportador de Issues do GitHub

Este script permite exportar issues de um repositório do GitHub para um arquivo CSV.

## Requisitos

Antes de executar o script, certifique-se de ter os seguintes requisitos instalados:

1. **Instale o GitHub CLI**: [gh cli](https://cli.github.com/)
   ```sh
   # No Linux (Debian/Ubuntu)
   sudo apt install gh
   
   # No macOS (via Homebrew)
   brew install gh
   
   # No Windows (via Chocolatey)
   choco install gh
   ```
   Após instalar, autentique-se no GitHub com:
   ```sh
   gh auth login
   ```

2. **Instale as dependências do Node.js**
   ```sh
   npm install
   ```

## Executando o script

Para exportar as issues para um arquivo CSV, execute:

```sh
node export_issues.js
```

O arquivo `github_issues.csv` será gerado no mesmo diretório.

## Estrutura do CSV

O arquivo CSV será gerado no seguinte formato:

```
title,description,due_date,milestone
"Título da Issue","Descrição da Issue",,
"Outra Issue","Outra descrição",,
"Issue com Milestone","Descrição aqui",,v1.0
```

Caso tenha dúvidas ou precise de suporte, sinta-se à vontade para abrir uma issue neste repositório! 🚀

