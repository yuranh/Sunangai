# Proposta de metadados de publicação

**Estado:** proposta; não aplicada às páginas nem ao servidor.  
**Domínio pretendido:** `sunangai.co.mz` (alojamento ainda por configurar).

## Modelo por página

Depois de confirmar o domínio público, HTTPS, caminhos finais e comportamento do alojamento, adicionar a cada página um `link rel="canonical"` com o seu URL público e metadados Open Graph com `og:type`, `og:title`, `og:description`, `og:url` e uma imagem aprovada e acessível por HTTPS. O `og:url` deve corresponder ao canonical da mesma página.

Não inserir ainda valores como `https://sunangai.co.mz/...`: o domínio é pretendido, mas o DNS, certificado e alojamento não foram validados. Escolher também uma imagem de partilha e respetivos direitos antes de preencher `og:image`.

## Ficheiros a preparar após configuração

- `sitemap.xml`: listar apenas as seis páginas públicas com os URLs HTTPS finais; confirmar se o alojamento publica as páginas na raiz e qual a política de atualização de `lastmod`.
- `robots.txt`: confirmar a política de rastreamento com a empresa e apontar para o sitemap público final. Não bloquear nem permitir diretórios por suposição.
- Cabeçalhos de segurança, redirecionamento HTTPS e suporte a pedidos `Range` para o vídeo: configurar e verificar no alojamento, não neste projeto local.

## Aprovações e validações pendentes

Confirmar domínio e URLs finais, imagem Open Graph aprovada, política de indexação, configuração do fornecedor de alojamento e autorização de publicação. Depois da configuração, testar os URLs públicos, certificado HTTPS, sitemap, robots, cabeçalhos e visualização de partilhas.
