# Metadados SEO — preparação local

**Estado:** títulos, descrições, canonical e Open Graph aplicados localmente às seis páginas.  
**Domínio indicado para futura publicação:** `sunangai.co.mz` (DNS, HTTPS e alojamento não verificados).

## URLs preparados

| Página | Canonical e `og:url` |
|---|---|
| `index.html` | `https://sunangai.co.mz/` |
| `estudio-musical.html` | `https://sunangai.co.mz/estudio-musical.html` |
| `agencia-artistica.html` | `https://sunangai.co.mz/agencia-artistica.html` |
| `design-grafico.html` | `https://sunangai.co.mz/design-grafico.html` |
| `producao-eventos.html` | `https://sunangai.co.mz/producao-eventos.html` |
| `marketing.html` | `https://sunangai.co.mz/marketing.html` |

Cada página mantém o seu título e descrição existentes e agora declara `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description` e `og:url`. O canonical e `og:url` coincidem. A presença e consistência destes campos foi verificada por auditoria local.

O domínio é o pretendido no projeto e foi usado como configuração preparada, não como confirmação de propriedade, DNS, certificado ou rotas públicas. Confirmar que a página inicial responde em `/`, que as restantes rotas `.html` são servidas sem redirecionamento canónico diferente e que cada URL pode ser acedido por HTTPS antes de publicar.

`og:image` não foi preenchido: não há imagem de partilha aprovada identificada. Não foi criado favicon porque os logótipos disponíveis são wordmarks horizontais/baixa resolução e não fornecem um símbolo compacto legível sem edição ou aprovação da marca. O pedido `/favicon.ico` continuará a devolver 404 até existir um ativo aprovado.

## Ficheiros a preparar após configuração

- `sitemap.xml`: listar apenas as seis páginas públicas com os URLs HTTPS finais; confirmar se o alojamento publica as páginas na raiz e qual a política de atualização de `lastmod`.
- `robots.txt`: confirmar a política de rastreamento com a empresa e apontar para o sitemap público final. Não bloquear nem permitir diretórios por suposição.
- Cabeçalhos de segurança, redirecionamento HTTPS e suporte a pedidos `Range` para o vídeo: configurar e verificar no alojamento, não neste projeto local.

## Ficheiros e ações para a fase de hospedagem

- `sitemap.xml`: preparar com as seis URLs HTTPS finais após validar rotas e política de atualização de `lastmod`.
- `robots.txt`: confirmar a política de rastreamento com a empresa e apontar para o sitemap público final.
- Validar os canonicals, Open Graph, certificado, redirecionamento HTTPS, cabeçalhos, sitemap, robots e pré-visualização das partilhas nos URLs públicos.
- Escolher/aprovar uma imagem Open Graph e um favicon apropriado; só então acrescentar os ativos ao pacote de publicação.
- Não configurar estes itens de hospedagem nesta preparação local.
