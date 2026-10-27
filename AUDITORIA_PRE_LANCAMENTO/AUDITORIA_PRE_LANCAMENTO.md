# Auditoria integral pré-lançamento — SUNANGAI PROJECT

**Data:** 19 de outubro de 2026  
**Âmbito:** website local em `Y:/Projetos/Sunangai Website/`  
**Decisão da auditoria original:** **NÃO APTO PARA PUBLICAÇÃO**

## Atualização após o plano de correção — 19 de outubro de 2026

**Estado atual:** **Correções aplicadas — aguarda validação humana**. Esta atualização regista as correções locais e os retestes; não autoriza nem representa publicação.

### Alterações efetuadas

- Corrigido o endereço visível e os destinos `mailto:` nas seis páginas para `info@sunangai.co.mz`.
- Atualizados os links sociais para os perfis fornecidos pela empresa; removidos os ícones e links de TikTok e YouTube.
- Substituída a chamada de subscrição por “Entrar em contacto”, com assunto pré-preenchido e texto informativo de contacto por email em português e inglês. Não foi criado formulário ou backend.
- Corrigidos os textos do rodapé nas traduções existentes e os IDs usados para atualizar os botões de contacto em Agência Artística e Design Gráfico.
- Acrescentado fecho do menu por Escape nas seis páginas. Foco por teclado, abertura por Enter e fecho por Escape foram confirmados no Chromium.
- Mantidos os rótulos legais sem os transformar em links nem criar conteúdo jurídico. Não foi encontrado favicon apropriado nem ficheiro favicon existente; o pedido local 404 permanece pendente.
- Preparadas uma proposta de metadados ainda não aplicada e uma lista explícita de recursos de publicação.

### Retestes após as correções

| Verificação | Resultado |
|---|---|
| `node site-audit.mjs` | PASSOU: seis páginas, 55 links internos, 11 scripts inline, IDs, fragmentos e navegação interna |
| `node --check` em `site-audit.mjs`, `responsive-qa.mjs` e `.mobile-visual-qa.mjs` | PASSOU |
| Chromium local: 6 páginas × 7 larguras (320, 375, 390, 430, 768, 1024 e 1440 px) | PASSOU: 42 capturas; 0 layouts com overflow horizontal, 0 textos visíveis cortados e 0 imagens falhadas |
| Menus por clique a 390 px | PASSOU: abre e fecha nas seis páginas |
| Teclado no menu e CTA | PASSOU: Tab chega ao menu e mostra foco; Enter abre; Escape fecha; CTA de contacto recebe foco visível |
| Vídeo da página inicial nas sete larguras | PASSOU: controlos disponíveis, `readyState` 4 e erro 0 |
| Destinos de contacto e redes sociais | PASSOU por verificação estática nas seis páginas; nenhum perfil genérico, TikTok ou YouTube restante |
| Erros de JavaScript no Chromium | PASSOU: nenhuma exceção; o único diagnóstico HTTP/console continua a ser o favicon 404 |

Durante a instrumentação da verificação de teclado, uma execução intermédia do script QA terminou com `TypeError` ao guardar os resultados antes de inicializar o objeto do relatório. A ordem foi corrigida e a execução completa seguinte terminou com sucesso. Uma execução intermédia também leu os logótipos antes do fim do carregamento; o teste foi ajustado para aguardar as imagens e o resultado final confirmou 0 falhas.

As 42 capturas atuais, a galeria e o relatório do navegador estão em `evidencias/capturas-responsivas/`. O H1 visualmente oculto de Produção de Eventos foi excluído da contagem de texto cortado por ser intencional e continuar acessível. O cliente de email não foi aberto e nenhuma mensagem foi enviada.

### Backups e ficheiros de preparação

As cópias dos seis HTML anteriores às alterações e do script QA anterior estão em `evidencias/backup-pre-correcao-2026-10-19/`. A lista proposta de ficheiros de publicação está em `evidencias/lista-publicacao-proposta.txt`; a proposta de canonical, Open Graph, sitemap e robots está em `evidencias/proposta-metadados-publicacao.md`. Nenhum deles configura ou publica o alojamento.

### Pendências humanas e de produção

- Aprovar e publicar Política de Privacidade e Termos de Uso, fornecendo os URLs definitivos.
- Escolher ou aprovar um favicon da marca; nenhum foi criado nem improvisado.
- Confirmar licenças e autorizações das imagens, vídeo, fontes e logótipos, e os nomes oficiais dos parceiros.
- Configurar o alojamento, confirmar domínio/DNS/HTTPS e cabeçalhos, política de rastreamento e URLs públicos finais.
- Validar o link de email num cliente real se necessário e autorizar expressamente qualquer publicação.
- Executar validação de produção (HTML/CSS, SEO social, HTTPS, sitemap/robots, segurança e desempenho) após disponibilizar o alojamento.

**A publicação continua pendente.** Os achados nas secções seguintes descrevem a auditoria original; consulte esta atualização para o estado após as correções.

## A. Resumo executivo

O site é uma aplicação estática de seis páginas, com identidade visual coerente, páginas de serviços completas e adaptação responsiva. As verificações técnicas e as 42 capturas de navegador passaram no que diz respeito à navegação interna, carregamento das imagens, vídeo e overflow.

Há bloqueadores funcionais de contacto e confiança: os seis rodapés usam um destino `mailto:` sem `@`; os ícones sociais apontam para as páginas gerais das plataformas, sem identificar as contas da empresa; os textos de Política de Privacidade e Termos de Uso não são links nem têm páginas; e “Subscrever” apenas abre um cliente de e-mail, sem formulário ou serviço de subscrição. Não alterei esses destinos porque o endereço, as contas oficiais e os textos legais precisam de confirmação da empresa.

Não foi possível verificar domínio, alojamento, HTTPS, formulários de produção, cabeçalhos do servidor, Core Web Vitals ou licenças dos recursos. A decisão é **NÃO APTO** até que o contacto funcional e os requisitos institucionais essenciais sejam confirmados e corrigidos.

## B. Inventário

### Páginas efetivamente navegáveis

| Página | Conteúdo | Resultado |
|---|---|---|
| `index.html` | Início, cinco serviços, vídeo, sobre, visão/missão/valores, parceiros e rodapé | Carrega; os cinco cartões ligam às páginas correspondentes |
| `estudio-musical.html` | Serviço de estúdio musical | Carrega; CTA e navegação presentes |
| `agencia-artistica.html` | Serviço de agência artística | Carrega; CTA e navegação presentes |
| `design-grafico.html` | Serviço de design gráfico | Carrega; CTA e navegação presentes |
| `producao-eventos.html` | Cinco cartões de serviços de eventos | Carrega; cartões e links de telefone presentes |
| `marketing.html` | Serviço de marketing | Carrega; CTA e navegação presentes |

`evidencias/capturas-responsivas/index.html` é uma galeria de auditoria, não uma página da navegação do site. Os scripts de QA e ficheiros de origem também não fazem parte das seis rotas do site.

### Componentes e tecnologia

- HTML estático, CSS (`styles.css` e `mobile-responsive.css`) e JavaScript inline; sem framework, sistema de build, gestor de dependências ou backend identificado.
- Recursos locais: PNG/JPG/JPEG, três PDFs de origem e `susu.mp4`; logótipos agrupados em `LOGOS PARA SITE/`; material adicional em `design-icons/` e `fts e icons/`.
- Dependências externas declaradas: Google Fonts, Google Maps e links para Instagram, Facebook, TikTok e YouTube.
- As seis páginas são acessíveis pelos menus e links internos. A auditoria automática encontrou 55 links internos e confirmou destinos locais existentes e fragmentos válidos.
- O alojamento precisa de servir HTML/CSS/JS e imagens por HTTP(S), e suportar a entrega do MP4. Não há configuração de publicação, domínio ou servidor no projeto para auditar.
- O inventário atual do workspace está em [`evidencias/inventario-workspace.csv`](evidencias/inventario-workspace.csv); o inventário inicial, anterior à organização das evidências, está em [`evidencias/audit-inventory.csv`](evidencias/audit-inventory.csv). O primeiro lista **146 ficheiros / 107,73 MB** no workspace; **30 ficheiros / 42,39 MB** são referenciados pelas seis páginas e pelas duas folhas CSS. Isto não representa o tráfego de uma visita: vídeo e imagens são pedidos conforme a página e o navegador.
- [`evidencias/links-extraidos.csv`](evidencias/links-extraidos.csv) regista os destinos extraídos das seis páginas.

### Recursos e ficheiros fora da navegação

O workspace contém imagens de origem, PDFs, ícones, fotografias não referenciadas, capturas anteriores e scripts de QA. O total medido antes de arquivar as capturas era aproximadamente **107,7 MB**, incluindo material de teste e recursos sem referência nas seis páginas. A fotografia `Dia 1 de maio foto (1).jpg` tem cerca de **12,89 MB** e não é referenciada pelo site. O vídeo `susu.mp4` tem cerca de **20 MB** e é referenciado na página inicial com `preload="none"`.

Não apaguei esses recursos porque podem ser material de origem. A publicação deve usar uma lista explícita dos seis HTML, duas folhas CSS e apenas os recursos realmente referenciados. Não publique a pasta de evidências, os scripts de QA, PDFs de origem, `fts e icons/`, `design-icons/` ou fotografias não utilizadas sem confirmar a necessidade.

## C. Pontos fortes

- A linguagem visual preta, dourada e branca mantém-se consistente nas seis páginas.
- A hierarquia visual, fotografias e CTAs são legíveis nas capturas inspecionadas; o desktop preserva a composição atual.
- Há seis páginas de conteúdo com um H1 cada, meta description, `lang="pt"`, viewport e texto alternativo em todas as imagens `<img>` verificadas.
- Os menus mobile abrem e fecham por interação nas seis páginas; os cartões da página inicial encaminham para as páginas de serviço.
- As capturas mostram as imagens carregadas e o vídeo pronto para reprodução, sem erro de mídia.
- `styles.css` define `:focus-visible`, link para saltar ao conteúdo e suporte a `prefers-reduced-motion`.

## D. Problemas encontrados e estado

### ALTO — Destino de e-mail inválido nas seis páginas

- **Localização:** links de contacto e subscrição nos rodapés de `index.html`, `estudio-musical.html`, `agencia-artistica.html`, `design-grafico.html`, `producao-eventos.html` e `marketing.html`.
- **Evidência:** o destino é `mailto:infosunangai.co.mz`, que não tem `@` e não é um endereço de e-mail válido.
- **Impacto:** visitantes não conseguem confiar que o contacto por e-mail chegará ao destinatário pretendido.
- **Correção:** não efetuada. O endereço oficial precisa de ser confirmado; não inferi `info@...`.
- **Estado:** pendente de confirmação e substituição uniforme nas seis páginas.

### ALTO — Links sociais não identificam as contas da empresa

- **Localização:** ícones sociais nos seis rodapés.
- **Evidência:** os destinos são as páginas gerais de `instagram.com`, `facebook.com`, `tiktok.com` e `youtube.com`, sem nome de utilizador/canal. A verificação externa abriu páginas gerais; o [Facebook redirecionou para o login](https://www.facebook.com/).
- **Impacto:** o visitante não chega às contas da Sunangai Project e pode interpretar os ícones como destinos oficiais.
- **Correção:** não efetuada; requer URLs oficiais fornecidos pela empresa.
- **Estado:** pendente de confirmação dos quatro perfis. A verificação externa foi limitada às URLs genéricas, sem autenticação.

### ALTO — Política de Privacidade e Termos de Uso não estão disponíveis

- **Localização:** texto do rodapé nas seis páginas.
- **Evidência:** “Política de Privacidade” e “Termos de Uso” são elementos `span`, não links; não existem páginas legais no inventário.
- **Impacto:** as referências prometidas no rodapé não podem ser abertas; o visitante não consegue consultar informação de privacidade ou termos.
- **Correção:** não efetuada. Os textos e URLs exigem conteúdo aprovado pela empresa/revisão apropriada.
- **Estado:** pendente; criar/aprovar as páginas e ligar os rótulos antes da publicação.

### MÉDIO — “Subscrever” não implementa uma subscrição

- **Localização:** rodapés das seis páginas; em `index.html` o CTA é “Subscrever”.
- **Evidência:** não há elemento `<form>`, campos, validação, endpoint, backend ou integração de newsletter. O CTA é apenas um link para o `mailto:` inválido descrito acima.
- **Impacto:** não recolhe nem regista subscrições; o rótulo não corresponde à ação disponível.
- **Correção:** não efetuada. É necessária decisão sobre serviço/endpoint, consentimento e texto de privacidade.
- **Estado:** não confirmado; depende de integração e configuração externa.

### MÉDIO — Publicação do workspace inteiro exporia material de QA e origem

- **Localização:** raiz do projeto e diretórios auxiliares.
- **Evidência:** existem scripts `.mjs`, PDFs, imagens não referenciadas e diretórios de recursos de origem. Também foi encontrado `pass-sunangai2026.txt`, com **0 bytes**; não contém conteúdo, mas o nome parece relacionado com palavra-passe.
- **Impacto:** carregar a pasta inteira pode expor ficheiros sem relação com o site e recursos de origem. Não foi encontrada atribuição de credenciais em texto/código nos padrões pesquisados; isso não equivale a uma revisão de segredo exaustiva.
- **Correção:** o ficheiro vazio foi movido, preservado, para `evidencias/quarentena-pass-sunangai2026.txt`; as capturas de QA também foram arquivadas sob `AUDITORIA_PRE_LANCAMENTO/evidencias/`.
- **Estado:** pendente configurar e verificar uma lista de publicação que exclua a pasta de auditoria, scripts e recursos não utilizados.

### MÉDIO — SEO social e indexação não estão configurados

- **Localização:** cabeçalhos das seis páginas e raiz de publicação.
- **Evidência:** títulos, descrições, idioma e viewport existem; não encontrei canonical, Open Graph, `sitemap.xml` nem `robots.txt`. Não há domínio configurado no workspace.
- **Impacto:** partilhas sociais e rastreio/indexação não estão preparados para um domínio de produção.
- **Correção:** não efetuada porque canonical, sitemap e regras de rastreamento dependem do domínio e da estratégia de publicação.
- **Estado:** validar e configurar após confirmar o domínio e o URL público.

### BAIXO — Favicon ausente

- **Localização:** `<head>` das páginas.
- **Evidência:** o Chromium local pediu `/favicon.ico` e recebeu 404; o relatório de navegador regista um erro de console correspondente.
- **Impacto:** separador/favorito sem ícone e um pedido 404 desnecessário.
- **Correção:** não efetuada; não existe no inventário um favicon inequívoco e adequado para ser declarado sem preparar/aprovar o ativo.
- **Estado:** melhoria pendente.

### CORRIGIDO — Overflow dos logótipos de parceiros a 768 px

- **Localização:** página inicial, faixa de parceiros em `mobile-responsive.css`.
- **Evidência inicial:** os logótipos escalados excediam a largura em tablet portrait (768 px).
- **Correção:** o grid nessa faixa foi limitado a três colunas e as escalas herdadas removidas; a regra permanece restrita ao intervalo tablet.
- **Reteste:** 0 de 42 layouts com overflow horizontal.

### BAIXO — Verificações incompletas de acessibilidade e desempenho

- **Evidência:** todas as imagens `<img>` têm `alt`; os cinco logótipos de parceiros usam rótulos genéricos (`Parceiro 1` a `Parceiro 5`). O script de browser conseguiu focar o botão do menu, mas a ativação por teclado não ficou comprovada pela simulação CDP; a abertura/fecho por clique passou. O projeto não tem axe, Lighthouse, HTML validator ou CSS validator instalados.
- **Impacto:** não há evidência suficiente para declarar conformidade WCAG 2.2 AA, contraste em todos os fundos, nem conformidade sintática completa.
- **Correção:** não efetuada; não alterei textos alternativos sem confirmar os nomes dos parceiros.
- **Estado:** avaliação manual/automática com ferramentas apropriadas permanece necessária. O teste local não mede Core Web Vitals reais.

## E. Testes executados

| Teste | Resultado | Evidência/limite |
|---|---|---|
| Inventário das páginas e recursos | PASSOU | Seis páginas principais; inventário completo em CSV |
| `node site-audit.mjs` | PASSOU | 6 páginas, 55 links internos, 11 scripts inline, metadados, IDs, fragmentos e navegação same-tab |
| `node --check` nos três scripts `.mjs` | PASSOU | Sem erros de sintaxe nos scripts verificados |
| Browser local nas larguras 320, 375, 390, 430, 768, 1024 e 1440 px | PASSOU | 42 capturas (6 páginas × 7 larguras), galeria abaixo |
| Overflow horizontal | PASSOU | 0 de 42 layouts com overflow após o ajuste de grid de parceiros a 768 px |
| Texto visível cortado | PASSOU | 0 ocorrências no relatório; o H1 visualmente oculto de Eventos é intencional para acessibilidade |
| Imagens e logos | PASSOU | 0 imagens falhadas após carregamento explícito das imagens lazy |
| Menus mobile por clique | PASSOU | Abriu e fechou nas seis páginas a 390 px |
| Vídeo da página inicial | PASSOU | Pronto para reprodução, sem erro e com controles a todas as sete larguras |
| Navegação entre páginas e fragmentos locais | PASSOU | Auditoria estática confirma destinos existentes; não houve envio de dados |
| Erros de JavaScript no browser | PASSOU | Nenhuma exceção JavaScript registada durante as capturas |
| Favicon no servidor local | FALHOU | `/favicon.ico` respondeu 404 |
| E-mail de contacto | FALHOU | `mailto:` sem `@`, repetido em seis páginas |
| Subscrição/newsletter | FALHOU | Não existe formulário nem endpoint; CTA abre cliente de e-mail |
| Páginas/links legais | FALHOU | Rótulos não são links e não há páginas legais |
| Links de perfis sociais | FALHOU | Destinam-se às páginas genéricas das plataformas |
| Teclado/contraste/WCAG AA | BLOQUEADO | Simulação de ativação por teclado inconclusiva; axe e verificação integral de contraste não disponíveis |
| Envio real de formulário, telefone e e-mail | NÃO EXECUTADO | Não há formulário de backend; não foram iniciadas chamadas nem mensagens reais |
| HTML/CSS validator, Lighthouse, PageSpeed e Core Web Vitals | NÃO EXECUTADO | Ferramentas não instaladas; site ainda não tem URL público para medição válida |
| DNS, HTTPS e cabeçalhos de segurança de produção | BLOQUEADO | Domínio e alojamento não configurados/disponíveis no workspace |
| Licenças de fotografias, vídeo, fontes e logótipos | BLOQUEADO | Necessita comprovativos/validação da empresa |

## F. Capturas

As capturas são screenshots reais do Chromium local, com imagens lazy ativadas antes da captura. A galeria abre cada screenshot no tamanho original:

- [Galeria das 42 capturas](evidencias/capturas-responsivas/index.html)
- [Relatório estruturado do navegador](evidencias/capturas-responsivas/report.json)
- [Homepage — 390 px](evidencias/capturas-responsivas/index-390.png) · [Homepage — 1440 px](evidencias/capturas-responsivas/index-1440.png)
- [Estúdio — 390 px](evidencias/capturas-responsivas/estudio-musical-390.png) · [Agência — 390 px](evidencias/capturas-responsivas/agencia-artistica-390.png)
- [Design — 390 px](evidencias/capturas-responsivas/design-grafico-390.png) · [Eventos — 390 px](evidencias/capturas-responsivas/producao-eventos-390.png) · [Marketing — 390 px](evidencias/capturas-responsivas/marketing-390.png)

## G. Ficheiros alterados e organização

- Nenhum HTML, CSS, texto de conteúdo, fotografia, logótipo ou contacto do site foi alterado durante esta auditoria.
- `responsive-captures/`, `mobile-preview-390.png` e `responsive-qa-tablet-landscape.png` foram movidos para `AUDITORIA_PRE_LANCAMENTO/evidencias/` para separar capturas de auditoria dos ficheiros do site.
- O ficheiro vazio `pass-sunangai2026.txt` foi movido para `evidencias/quarentena-pass-sunangai2026.txt`; permanece preservado para revisão.
- `evidencias/audit-inventory.csv` e `evidencias/inventario-workspace.csv` contêm os inventários inicial e atual; `evidencias/links-extraidos.csv` contém os destinos extraídos.
- Não há repositório Git no diretório (`git status`/`git rev-parse` falharam por ausência de `.git`); não existia snapshot Git para rollback.

## H. Dependências externas e configuração pendente

- Google Fonts depende de ligação externa. Os links para redes e Google Maps também dependem de acesso à Internet.
- A subscrição requer uma plataforma/endpoint, tratamento de consentimento e política aprovada; nada disso está configurado.
- O projeto não contém domínio, DNS, configuração de HTTPS, servidor, cabeçalhos de segurança, backup ou monitorização.
- O servidor de produção deve servir os recursos locais e suportar vídeo MP4 com pedidos de intervalo/range.

## I. Checklist de publicação

- [ ] Confirmar e corrigir o e-mail oficial nas seis páginas.
- [ ] Confirmar URLs oficiais dos perfis sociais.
- [ ] Publicar Política de Privacidade e Termos de Uso aprovados e ligar o rodapé.
- [ ] Decidir se existe subscrição; se sim, configurar fornecedor/endpoint e consentimento; caso contrário, substituir a ação por contacto aprovado.
- [ ] Criar ou aprovar um favicon e eliminar o pedido 404.
- [ ] Configurar domínio, DNS, HTTPS, redirecionamento para HTTPS e cabeçalhos de segurança no alojamento.
- [ ] Preparar uma lista de publicação com apenas as seis páginas, CSS e recursos realmente utilizados; excluir `AUDITORIA_PRE_LANCAMENTO/`, PDFs, capturas, scripts de QA e material de origem.
- [ ] Confirmar direitos/licenças de fotografias, vídeo, música, fontes e marcas de parceiros.
- [ ] Depois da publicação, validar formulários/links reais, backup, monitorização, sitemap/robots, Search Console e medições Lighthouse/PageSpeed/Core Web Vitals.

## J. Tarefas que precisam de confirmação humana

1. Fornecer endereço de e-mail oficial (com domínio e `@`) e perfis sociais oficiais.
2. Aprovar conteúdo e URL das páginas legais.
3. Decidir e configurar o mecanismo de subscrição e os textos de consentimento.
4. Confirmar o domínio, fornecedor de alojamento, política de publicação e arquivos permitidos.
5. Confirmar licenças e autorizações dos ativos de terceiros.
6. Validar os nomes reais dos cinco parceiros para melhorar os seus textos alternativos.

## K. Recomendação

**NÃO APTO PARA PUBLICAÇÃO neste estado.** O layout e a navegação local passam as verificações feitas, mas um canal de contacto está comprovadamente inválido e os perfis sociais e referências legais não conduzem a destinos oficiais utilizáveis. A classificação pode ser revista depois de as tarefas humanas acima serem resolvidas e os testes de produção serem repetidos.

Esta auditoria não é uma certificação jurídica, de segurança ou de conformidade WCAG. Não foram enviados dados a terceiros, submetidos formulários reais, iniciadas chamadas, nem executados testes intrusivos.
