# Astartes Monastery

Protótipo pessoal de registro de musculação com tema de ficção científica gótica. Projeto independente, sem assets oficiais, conta, serviços externos ou compras.

## Executar no computador

Requer Node.js já instalado. Abra o PowerShell nesta pasta e execute:

    node server.js

Abra http://localhost:4173 no navegador. Pare o servidor com Ctrl+C. Os dados são locais ao navegador e ao endereço utilizado, não são sincronizados entre dispositivos ou navegadores. A rotina inicial é apenas um exemplo, não uma prescrição.

## Usar no iPhone: limitações do protótipo

O servidor padrão só aceita conexões do próprio computador. Uma prévia temporária pela rede local pode ser iniciada com `node server.js --lan`, acessando `http://IP-DO-COMPUTADOR:4173` no Safari do iPhone na mesma rede. Isso expõe o servidor aos dispositivos da rede, sem login nem criptografia. Use apenas uma rede confiável; o firewall pode bloquear o acesso. Não alteramos o firewall. Encerre com Ctrl+C.

Essa prévia HTTP não é equivalente a uma instalação offline: recursos de PWA/service worker exigem uma origem segura no iPhone, normalmente HTTPS confiável. Também não há sincronização com os dados do navegador do PC. Para uso móvel durável, será necessário decidir uma forma privada e segura de disponibilizar HTTPS ou construir um aplicativo nativo. Não há Apple Health, Apple Watch nem notificações nesta versão.

## Trajetórias e separação de dados

Em **Arsenal**, escolha Astartes ou Adepta Sororitas. Cada trajetória tem suas próprias rotinas, treino em andamento, histórico e XP neste navegador. A progressão usa os mesmos limites e regras de XP, com patentes e apresentação próprias. A escolha não altera cargas nem presume sexo, identidade ou capacidade física. As duas trajetórias começam com a mesma rotina de exemplo, que pode ser alterada.

Dados existentes permanecem na trajetória Astartes original, sem conversão. Há um único perfil por trajetória neste navegador, não perfis ilimitados. A separação não é autenticação: qualquer pessoa com acesso ao navegador pode trocar de trajetória e ver os registros. Dados em outros navegadores, dispositivos ou endereços continuam independentes.

Exporte separadamente o backup de cada trajetória. Os novos backups identificam a trajetória, e a restauração recusa um backup da outra trajetória para evitar substituição acidental. Backups antigos sem identificação são aceitos apenas na trajetória Astartes; restaure-os com cuidado, pois substituem os dados atuais daquela trajetória.

## Uso e dados

- Crie ou edite rotinas, inicie uma e marque as séries realizadas. Para exercícios com peso corporal, use carga 0 kg ou a carga adicional, de forma consistente.
- Cada treino concluído com pelo menos uma série dá 50 XP + 10 XP por série. As patentes têm limites fixos; são apenas motivacionais.
- O botão de exportação gera um JSON da trajetória atual. Guarde o arquivo em local seguro. A restauração substitui os dados atuais e solicita confirmação. O histórico não acompanha a exclusão de uma rotina.
- Limpar os dados do navegador, trocar de navegador ou mudar a origem (protocolo, host ou porta) pode tornar os registros indisponíveis. Faça backups regulares. O arquivo de backup contém seus dados pessoais de treino.
- O app salva o treino em andamento após cada alteração. Não há cronômetro de descanso, autenticação ou armazenamento em nuvem.

## Verificação

    node domain.test.js
    node app.test.js
    node server.test.js
    node --check app.js
    node --check server.js
    node --check sw.js

O código não precisa de dependências externas. `server.js` serve somente os arquivos necessários, sem API ou coleta de dados. `domain.js` mantém um formato versionado e valida as importações.

