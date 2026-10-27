# Revisão final pré-lançamento — SUNANGAI PROJECT

**Data da revisão:** 19 de outubro de 2026  
**Âmbito:** inspeção documental e verificação estática do projeto local  
**Estado:** **C. Revisão concluída — não foram encontrados bloqueadores técnicos na lista de publicação, mas continuam pendentes as aprovações humanas e a validação no alojamento.**

## 1. Resumo executivo

Os quatro documentos pedidos existem e puderam ser lidos em UTF-8. A lista proposta contém seis páginas, duas folhas CSS e 22 recursos locais. A comparação com os seis HTML e as duas folhas CSS encontrou todos os recursos locais referenciados, sem ficheiros de recurso ausentes e sem recursos excedentes na lista. O `susu.mp4` continua referenciado pela página inicial e, por isso, é necessário para manter o vídeo.

A galeria contém 42 imagens com os nomes esperados e cobre as seis páginas nas sete larguras pedidas. Consultei o relatório de navegador e inspecionei capturas mobile representativas. Esta revisão não repetiu a execução do Chromium: os números de layout, carregamento de imagens, vídeo e teclado abaixo são evidência anterior, gerada em 19 de outubro de 2026.

Não há bloqueador técnico na lista local de recursos proposta. A publicação ainda depende de aprovação humana de conteúdo legal, favicon e direitos de ativos, e da validação do domínio, HTTPS e alojamento. A proposta de metadados é um roteiro geral, não uma configuração pronta: faltam exemplos por página e uma decisão de favicon/imagem social. O Chromium da auditoria anterior também registou `/favicon.ico` com HTTP 404.

## 2. Documentos inspecionados

| Documento | Resultado |
|---|---|
| `AUDITORIA_PRE_LANCAMENTO/AUDITORIA_PRE_LANCAMENTO.md` | Existe e foi lido. Contém a auditoria inicial e uma atualização posterior; a atualização é a referência para o estado atual. |
| `AUDITORIA_PRE_LANCAMENTO/evidencias/lista-publicacao-proposta.txt` | Existe e foi lido. Contém uma lista de 30 caminhos relativos à raiz do projeto. |
| `AUDITORIA_PRE_LANCAMENTO/evidencias/proposta-metadados-publicacao.md` | Existe e foi lido. Declara que é uma proposta não aplicada. |
| `AUDITORIA_PRE_LANCAMENTO/evidencias/capturas-responsivas/index.html` | Existe e foi lido. Os 42 links PNG da galeria apontam para capturas existentes. |

Não foram encontrados ficheiros inacessíveis entre os quatro pedidos.

## 3. Verificação da lista de publicação

Verifiquei os caminhos da lista contra o disco e as referências `src`, `poster`, folhas de estilo, URLs CSS e imagens de fundo nos seis HTML e nas duas CSS. Os nomes e capitalização correspondem aos existentes. A lista é relativa à raiz do site, e não depende de caminhos absolutos de Windows. O caminho `LOGOS PARA SITE/` contém espaços; os nomes relativos são válidos para servidor HTTP e foram usados nas capturas locais.

### Ficheiros necessários — manter na publicação

**Páginas (6):**

- `index.html`
- `estudio-musical.html`
- `agencia-artistica.html`
- `design-grafico.html`
- `producao-eventos.html`
- `marketing.html`

**CSS (2):**

- `styles.css`
- `mobile-responsive.css`

**Imagens e vídeo (22):**

- `fundo.png`, `sobre.png`
- `stuu.png`, `agenn.png`, `desi.png`, `orn.png`, `yuyu.png`
- `stu.jpg`, `agen.jpg`, `des.jpeg`
- `seg.jpg`, `orna.jpeg`, `son.png`, `carr.jpg`, `fogo.jpg`
- `LOGOS PARA SITE/sunangai-header.png`
- `LOGOS PARA SITE/logo1.png`, `LOGOS PARA SITE/logo2.png`, `LOGOS PARA SITE/logo3.png`, `LOGOS PARA SITE/logo4.png`, `LOGOS PARA SITE/logo5.png`
- `susu.mp4`

O vídeo está presente na página inicial e não deve ser removido da publicação enquanto essa secção continuar ativa. O HTML usa JavaScript inline; a inspeção não encontrou ficheiro `.js` externo necessário. Os ícones da interface estão incorporados como SVG no HTML. As fontes são obtidas de Google Fonts por URLs externas, não há ficheiros de fonte locais referenciados.

### Referências em falta

**Nenhum recurso local referenciado foi encontrado em falta.** A comparação estática encontrou 24 dependências locais referenciadas (duas CSS e 22 imagens/vídeo); mais as seis páginas HTML, totalizam os 30 itens da lista.

Não fazem parte da lista porque ainda não existem ou não foram aprovados: `favicon.ico`/outro favicon, imagem Open Graph, `sitemap.xml` e `robots.txt`. São itens pendentes para a etapa de publicação/configuração, não referências locais quebradas nas seis páginas atuais.

### Ficheiros a excluir da publicação

Excluir integralmente `AUDITORIA_PRE_LANCAMENTO/`, incluindo capturas, relatórios, backups e `evidencias/quarentena-pass-sunangai2026.txt`. Não publicar os scripts `.mobile-visual-qa.mjs`, `responsive-qa.mjs` e `site-audit.mjs`, nem `desktop.ini` ou PDFs de origem.

Também ficam fora os recursos não referenciados pelo site: diretórios `design-icons/` e `fts e icons/`; material de origem em `LOGOS PARA SITE/Clejowezu - Logotipo2324/` e `LOGOS PARA SITE/ilovepdf_pages-to-jpg/`; e outros itens sem referência local, incluindo `LOGOS PARA SITE/logo.png`, `LOGOS PARA SITE/KACEHAAL.png`, `LOGOS PARA SITE/Betos look.jpg`, `Dia 1 de maio foto (1).jpg`, `IMG-20251009-WA0066.jpg`, `IMG-20251009-WA0069.jpg`, `IMG-20251009-WA0071.jpg`, `IMG-20251009-WA0072.jpg`, `ornE.jpeg`, `pro.jpg` e `WhatsApp Image 2025-11-21 at 03.11.51 (2).jpeg`.

Esses itens são apenas excluídos da proposta de publicação; nenhum foi apagado, movido ou alterado nesta revisão. A exclusão da pasta de auditoria não é uma declaração de que os seus conteúdos foram submetidos a uma auditoria exaustiva de segredos. O ficheiro com nome semelhante a palavra-passe deve continuar tratado como material interno; estar vazio ou não ter correspondências numa pesquisa não prova que outros segredos não existam.

## 4. Revisão dos metadados e URLs

O domínio informado para planeamento é `https://sunangai.co.mz`. A revisão não consultou DNS, HTTPS nem páginas externas; não confirma que o domínio resolva ou que o alojamento esteja configurado.

| Item | Estado observado | Próxima ação |
|---|---|---|
| Títulos e meta descriptions | Presentes nas seis páginas. Os títulos identificam a página inicial e cada serviço. | Manter e rever com a empresa antes da publicação. |
| Canonical | Ausente nas seis páginas. | Definir URL final para cada rota depois de confirmar se a homepage canónica será `/` ou `/index.html` e como o servidor tratará `.html`. |
| Open Graph | Ausente nas seis páginas. | Preparar `og:type`, `og:title`, `og:description` e `og:url` alinhados ao canonical aprovado. |
| Imagem social (`og:image`) | Nenhuma foi escolhida ou aprovada na proposta. | Selecionar imagem, confirmar direitos e validar URL pública HTTPS. Não inferir que qualquer fundo atual é aprovado para partilha. |
| `sitemap.xml` | Não existe. A proposta recomenda criá-lo depois da configuração. | Usar os seis URLs públicos finais; decidir se `lastmod` será mantido. |
| `robots.txt` | Não existe. A proposta corretamente deixa a política em aberto. | Aprovar rastreamento e acrescentar a localização final do sitemap. |
| Favicon | Não existe ficheiro favicon nem referência `<link>` no projeto. O relatório do Chromium anterior registou pedido padrão a `/favicon.ico` com 404. | Aprovar/reutilizar um ativo de marca adequado antes de adicionar os caminhos. |

A proposta de metadados é coerente ao não inventar URLs públicos nem regras de rastreamento antes da configuração do alojamento. Porém, é insuficiente como especificação final: não enumera as seis rotas canonical, não mapeia os títulos e descrições existentes para Open Graph, não propõe uma imagem social aprovada e não inclui favicon. Os canonical candidatos para páginas de serviço seriam as rotas `.html` correspondentes sob o domínio pretendido; o URL definitivo da homepage e as URLs públicas dependem da configuração do servidor. Não apliquei valores ao HTML.

### Valores confirmados, propostos e pendentes

- **Confirmados para configuração local:** seis títulos e descrições já presentes; domínio pretendido informado como `sunangai.co.mz`; seis rotas HTML existentes.
- **Propostos, não aplicados:** canonical e Open Graph por página, sitemap das seis rotas e robots com referência ao sitemap.
- **Dependem do alojamento:** protocolo HTTPS funcional, URL final de cada página, alias da homepage, caminhos públicos, redirecionamento, cabeçalhos, sitemap/robots servidos e suporte a `Range` do MP4.
- **Aprovação humana:** política de indexação, imagem Open Graph e direitos, favicon/versão reduzida da marca e autorização para publicar.

## 5. Revisão das capturas responsivas

A galeria tem 42 PNG, seis por página, nos tamanhos 320, 375, 390, 430, 768, 1024 e 1440 px. A validação estática desta revisão confirmou que os 42 links da galeria têm ficheiros existentes e correspondem às combinações esperadas. O `report.json` arquivado indica zero overflow, zero imagens falhadas e zero texto visível cortado. O H1 de Eventos é intencionalmente oculto visualmente e excluído da verificação de clipping.

> **Data e limite:** o relatório do navegador indica geração em 19 de outubro de 2026 às 13:28 UTC. Estas são evidências anteriores; nenhum novo teste de navegador foi executado nesta revisão.

Inspecionei visualmente as seis capturas de 390 px. Não observei texto ou imagem cortados, deformação evidente, sobreposições relevantes ou overflow nas amostras. As capturas mostram o rodapé reorganizado com Instagram, Facebook e o CTA de contacto. A inspeção visual foi amostral, não uma revisão manual individual de todas as 42 imagens em resolução nativa.

## 6. Estado dos bloqueadores

| Item | Estado na revisão |
|---|---|
| Email `info@sunangai.co.mz` | Presente como texto e `mailto:` nas seis páginas, conforme atualização da auditoria. A ação de abrir cliente de email não foi executada nesta revisão. |
| Instagram `https://www.instagram.com/sunangaiproject/` | URL presente nas seis páginas. Sem teste externo nesta revisão. |
| Facebook `https://www.facebook.com/p/Sunangai-Project-SU-Lda-61582045679565/` | URL presente nas seis páginas. Sem teste externo nesta revisão. |
| TikTok e YouTube | Ausentes dos links e ícones dos seis rodapés, conforme conferência estática. |
| Subscrição | Substituída por link de contacto por email; não existe backend ou subscrição. |
| Favicon | Pendente; não existe ativo identificado e a evidência anterior mostra 404 local. |
| Política de Privacidade e Termos de Uso | Rótulos continuam sem páginas/links funcionais; aprovação humana pendente. |
| Direitos de imagens, vídeos, fontes e logótipos | Não verificados; confirmação da empresa pendente. |
| Nomes dos parceiros | Alt genéricos continuam; confirmação pendente. |
| Domínio e alojamento | `sunangai.co.mz` é o domínio pretendido; DNS, HTTPS e alojamento continuam por configurar/validar. |

## 7. Estado dos testes

### Executados nesta revisão

- Verificação de existência e leitura dos quatro documentos solicitados.
- Comparação estática dos 30 itens da lista com referências locais dos seis HTML e duas CSS: nenhum recurso referenciado em falta; todos os 30 caminhos propostos existem.
- Conferência da galeria: 42 links PNG esperados e existentes, correspondentes às seis páginas e sete larguras.
- Inspeção visual amostral das capturas mobile de 390 px.
- Leitura dos metadados presentes e verificação da ausência de canonical, Open Graph, favicon, `sitemap.xml` e `robots.txt` nas páginas/raiz atuais.

### Evidência de testes anteriores — não repetidos agora

O relatório atualizado e `evidencias/capturas-responsivas/report.json` registam `node site-audit.mjs`, verificações `node --check`, 42 capturas locais, testes de overflow/imagens/vídeo e menu/teclado. Esses resultados são evidência da execução anterior em 19 de outubro de 2026, não testes novos desta revisão.

### Não executados / pendentes

- Repetir navegação real no Chromium; esta revisão consultou capturas e relatórios existentes.
- Abrir o cliente de email, enviar mensagem, iniciar chamadas ou navegar aos perfis sociais.
- DNS, domínio, HTTPS, cabeçalhos e configuração do servidor.
- Lighthouse, PageSpeed, Core Web Vitals, validação HTML/CSS ou acessibilidade WCAG 2.2 AA.
- Revisão exaustiva de segredos, direitos de ativos, conteúdo jurídico e identificação dos parceiros.

## 8. Problemas, gravidade e ação recomendada

| Gravidade | Problema / evidência | Ação recomendada |
|---|---|---|
| Alta — antes da publicação | Política e Termos não têm conteúdo/páginas funcionais; rótulos do rodapé são apenas texto. | Obter conteúdo aprovado e URLs finais; então ligar os rótulos e testar. |
| Alta — antes da publicação | Licenças e autorizações dos ativos não estão documentadas nesta revisão. | Confirmar direitos de imagens, vídeo, música, fontes e marcas. |
| Média | Proposta de metadados genérica; não especifica rotas por página, correspondência de OG nem imagem social. | Completar a especificação depois de confirmar URLs/servidor e aprovar a imagem. |
| Baixa | Favicon inexistente; Chromium anterior reportou `/favicon.ico` 404. | Aprovar ativo adequado e incluir referência/caminho; sem criar marca improvisada. |
| Média — configuração | Domínio/hosting ainda não validados; sitemap, robots, HTTPS e cabeçalhos não existem localmente. | Configurar no fornecedor escolhido e testar os URLs públicos antes de publicar. |
| Baixa | Alt dos cinco parceiros são genéricos. | Confirmar nomes oficiais antes de alterar os textos alternativos. |
| Baixa — limitação da evidência | Galeria foi inspecionada por validação de ficheiros e amostra visual; não foram reexecutados os testes de browser nesta revisão. | Repetir QA visual e funcional quando houver nova alteração ou antes da publicação. |

## 9. Decisões que dependem de confirmação humana

1. Conteúdo aprovado e URLs para Política de Privacidade e Termos de Uso.
2. Favicon ou símbolo da marca aprovado e imagem de partilha Open Graph com direitos confirmados.
3. Licenças/autorização dos ativos e nomes oficiais dos parceiros.
4. Domínio final, URLs/alias da homepage, fornecedor e comportamento do alojamento, política de indexação.
5. Autorização expressa de publicação.

O email e os perfis sociais foram fornecidos anteriormente pelo responsável e estão configurados localmente. A sua disponibilidade externa não foi testada nesta revisão.

## 10. Riscos remanescentes

- Publicar antes de aprovar documentos legais e direitos dos ativos pode deixar obrigações institucionais e de uso sem resolução.
- Publicar a raiz inteira exporia material de auditoria/origem. Usar uma implantação por allowlist; não inferir que nomes de ficheiro vazios ou pesquisas prévias garantem ausência de segredos.
- Google Fonts depende de rede externa; se indisponível, haverá fontes de fallback.
- Sem favicon há pedido 404; sem Open Graph, canonical, sitemap e robots configurados, partilha/indexação não está preparada.
- Não há evidência desta revisão sobre desempenho real, segurança HTTP, acessibilidade certificada ou funcionamento em produção.

## 11. Checklist final para publicação

- [ ] Aprovar/publicar Política de Privacidade e Termos de Uso e ligar os destinos reais.
- [ ] Aprovar favicon e imagem social; confirmar direitos dos ativos.
- [ ] Confirmar direitos de todas as fotografias, vídeo, música, fontes e logótipos; confirmar nomes dos parceiros.
- [ ] Confirmar domínio, fornecedor, rotas da homepage, DNS, HTTPS e cabeçalhos.
- [ ] Finalizar canonical e metadados Open Graph individualmente para as seis páginas.
- [ ] Criar sitemap e robots de acordo com a política aprovada e URLs públicos.
- [ ] Preparar o pacote usando apenas a allowlist dos 30 itens; excluir integralmente auditorias, backups, scripts, PDFs e originais não usados.
- [ ] Testar a lista de implantação no alojamento, incluindo caminhos com espaços, MP4 e pedidos HTTP `Range`.
- [ ] Repetir testes de links, menu/teclado, favicon, formulários/email, imagens, vídeo e capturas nas sete larguras.
- [ ] Executar verificações de segurança, acessibilidade, Lighthouse/Core Web Vitals e SEO no endereço público.
- [ ] Obter autorização expressa final antes de publicar.

## 12. Próximos passos recomendados

1. Recolher as aprovações humanas listadas na secção 9.
2. Confirmar domínio e especificações do alojamento com o fornecedor.
3. Atualizar a proposta de metadados com rotas e imagem aprovadas; só então gerar sitemap/robots e favicon.
4. Montar um pacote de teste com a lista de 30 ficheiros, sem publicar a pasta de trabalho completa.
5. Executar uma nova auditoria contra o ambiente de staging e resolver qualquer diferença antes da autorização de publicação.

## Classificação final

**C. Revisão concluída — não foram encontrados bloqueadores técnicos na lista de publicação, mas continuam pendentes as aprovações humanas e a validação no alojamento.**

A lista contém todos os seis HTML, ambas as CSS e todos os recursos locais referenciados, sem omissões ou ficheiros excedentes além das páginas de entrada que são deliberadamente necessárias. Esta classificação não significa que o site esteja pronto para publicar: documentos legais, favicon, direitos, metadados públicos, DNS/HTTPS/alojamento e autorização continuam pendentes.
