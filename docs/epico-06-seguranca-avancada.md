# Épico 6 – Segurança Avançada e Resiliência

## Objetivo

Elevar o nível de segurança do sistema migrando de uma validação stateful (consulta ao banco por request) para uma **estratégia híbrida com Refresh Token**, e implementando **bloqueio automático de contas** por tentativas falhas de login.

> **Contexto:** O sistema atualmente valida o estado do usuário no banco de dados a cada requisição (via `loadUserByUsername` no `JwtAuthenticationFilter`). Embora seguro, isso gera uma query por request e não escala bem. A migração para JWT stateless com Refresh Token resolve esse trade-off.

---

## Tarefa 6.1 – Bloqueio Automático de Conta (Account Locking)

**Descrição:**
Implementar o mecanismo de bloqueio temporário de conta após N tentativas consecutivas de login com senha incorreta. Protege contra ataques de força bruta e tentativas de acesso não autorizadas.

**Regras de Negócio:**
- Após **5 tentativas falhas** consecutivas, a conta é bloqueada por **30 minutos**.
- O contador é zerado ao realizar login com sucesso.
- Se o tempo de bloqueio expirar, a conta é desbloqueada automaticamente na próxima tentativa.
- O `SUPER_ADMIN` **não é imune** ao bloqueio (protege contra força bruta mesmo na conta master).

### Checklist

#### Backend – Modelagem
- [ ] Adicionar campo `tentativasLoginFalhas` (int, default 0) na entidade `Usuario`
- [ ] Adicionar campo `dataUltimoBloqueio` (LocalDateTime, nullable) na entidade `Usuario`
- [ ] Criar migration/atualização do schema para os novos campos

#### Backend – Lógica de Negócio
- [ ] Implementar método no `UsuarioService` para incrementar tentativas falhas
- [ ] Implementar método no `UsuarioService` para verificar se a conta está bloqueada (considerando o tempo de expiração de 30 min)
- [ ] Implementar método no `UsuarioService` para resetar o contador ao login bem-sucedido
- [ ] Implementar lógica de desbloqueio automático quando o tempo de punição expirar

#### Backend – Integração com Spring Security
- [ ] Implementar `isAccountNonLocked()` no `UsuarioPrincipal` consultando os novos campos
- [ ] Integrar a lógica de incremento/reset no fluxo de autenticação (onde a senha é validada)
- [ ] Retornar resposta HTTP adequada quando a conta estiver bloqueada (ex: 423 Locked ou 403 com mensagem específica)

#### Frontend
- [ ] Tratar a resposta de conta bloqueada no fluxo de login
- [ ] Exibir mensagem informativa ao usuário ("Conta bloqueada. Tente novamente em X minutos.")

#### Testes
- [ ] Testar bloqueio após 5 tentativas falhas
- [ ] Testar desbloqueio automático após 30 minutos
- [ ] Testar reset do contador após login bem-sucedido
- [ ] Testar que o bloqueio não impede o desbloqueio manual por um Admin

---

## Tarefa 6.2 – Migração para Estratégia Híbrida (Access Token + Refresh Token)

**Descrição:**
Migrar a autenticação de "stateful com consulta ao banco por request" para uma **estratégia híbrida** onde o Access Token (JWT) é validado de forma stateless e o Refresh Token é usado para renovação segura com verificação completa no banco de dados.

**Arquitetura Alvo:**
- **Access Token:** JWT com vida curta (15 minutos). Validado apenas pela assinatura, sem consulta ao banco.
- **Refresh Token:** Token opaco armazenado no banco, vida longa (7 dias). Usado apenas para renovar o Access Token, com verificação completa do estado do usuário.
- **Revogação:** Desativar um usuário impede a renovação do token. No pior caso, o acesso residual é de no máximo 15 minutos.

### Checklist

#### Backend – Modelagem do Refresh Token
- [ ] Criar entidade `RefreshToken` (id, token, usuarioId, dataExpiracao, revogado)
- [ ] Criar `RefreshTokenRepository` com métodos de busca por token e por usuário
- [ ] Criar migration para a tabela `refresh_token`

#### Backend – Serviço de Refresh Token
- [ ] Criar `RefreshTokenService` com método para gerar novo Refresh Token
- [ ] Implementar método para validar Refresh Token (existência, expiração, revogação)
- [ ] Implementar método para revogar todos os Refresh Tokens de um usuário (logout global)
- [ ] Implementar método para revogar Refresh Token específico (logout de sessão)

#### Backend – Endpoint de Renovação
- [ ] Criar endpoint `POST /api/v1/auth/refresh` que recebe o Refresh Token via cookie HttpOnly
- [ ] No endpoint: validar Refresh Token → buscar usuário no banco → checar `isEnabled()` e `isAccountNonLocked()` → gerar novo Access Token → retornar via cookie
- [ ] Retornar 401 se o Refresh Token for inválido, expirado ou revogado
- [ ] Retornar 403 se o usuário estiver desativado ou bloqueado

#### Backend – Modificar Fluxo de Login
- [ ] No login bem-sucedido, gerar **ambos** os tokens (Access + Refresh)
- [ ] Enviar Access Token em cookie HttpOnly com `Max-Age` curto (15 min)
- [ ] Enviar Refresh Token em cookie HttpOnly separado com `Max-Age` longo (7 dias) e `Path` restrito ao endpoint `/api/v1/auth/refresh`

#### Backend – Modificar JwtAuthenticationFilter
- [ ] Remover a chamada a `loadUserByUsername` no filtro (tornar stateless)
- [ ] Validar o JWT apenas pela assinatura e expiração
- [ ] Extrair as claims necessárias (userId, perfil, autoEscolaId) diretamente do token
- [ ] Construir o `Authentication` a partir das claims do JWT, sem consulta ao banco

#### Backend – Endpoint de Logout
- [ ] Criar/modificar endpoint `POST /api/v1/auth/logout`
- [ ] Revogar o Refresh Token no banco
- [ ] Limpar ambos os cookies (Access + Refresh) na resposta

#### Frontend – Interceptor de Renovação
- [ ] Implementar interceptor no `apiClient` (Axios) para capturar respostas 401
- [ ] Ao receber 401: chamar `POST /api/v1/auth/refresh` automaticamente
- [ ] Se o refresh for bem-sucedido: re-executar a requisição original
- [ ] Se o refresh falhar: redirecionar para a tela de login
- [ ] Implementar fila de requisições pendentes para evitar múltiplos refreshes simultâneos

#### Frontend – Fluxo de Logout
- [ ] Chamar o endpoint de logout antes de limpar o estado local
- [ ] Redirecionar para a tela de login após o logout

#### Testes
- [ ] Testar login gerando ambos os tokens
- [ ] Testar acesso normal com Access Token válido (sem consulta ao banco)
- [ ] Testar renovação com Refresh Token válido
- [ ] Testar rejeição de renovação com usuário desativado
- [ ] Testar rejeição de renovação com Refresh Token revogado/expirado
- [ ] Testar logout revogando o Refresh Token
- [ ] Testar que após desativar um usuário, ele perde acesso em no máximo 15 minutos

---

## Tarefa 6.3 – Limpeza de Refresh Tokens Expirados (Manutenção)

**Descrição:**
Implementar um job agendado para limpar Refresh Tokens expirados e revogados do banco de dados, evitando acúmulo de registros desnecessários.

### Checklist

- [ ] Criar `@Scheduled` job no Spring para rodar diariamente
- [ ] Implementar query de deleção em massa de tokens expirados/revogados
- [ ] Configurar o cron no `application.properties`
- [ ] Adicionar log para rastrear a quantidade de tokens limpos

---

## Tarefa 6.4 – Atualização da Documentação de Segurança

**Descrição:**
Atualizar o `arquitetura.md` para refletir a nova estratégia de autenticação híbrida e os mecanismos de proteção implementados.

### Checklist

- [ ] Atualizar a seção 6 (Segurança) do `arquitetura.md`
- [ ] Documentar o fluxo de Access Token + Refresh Token
- [ ] Documentar o mecanismo de Account Locking
- [ ] Adicionar diagrama de sequência do fluxo de autenticação/renovação

---

## Ordem de Execução Recomendada

1. **6.1** → Account Locking (independente, prepara o terreno)
2. **6.2** → Migração para Refresh Token (dependência: 6.1 para checar `isAccountNonLocked` no refresh)
3. **6.3** → Limpeza de tokens (dependência: 6.2)
4. **6.4** → Documentação (ao final de tudo)

---

## Considerações Técnicas

- O Refresh Token deve ser um **token opaco** (UUID), não um JWT. Ele é validado por lookup no banco, não por assinatura.
- O cookie do Refresh Token deve ter `Path=/api/v1/auth/refresh` para que ele só seja enviado nesse endpoint específico, reduzindo a superfície de ataque.
- O Access Token deve carregar nas claims: `sub` (email), `userId`, `perfil`, `autoEscolaId`. Isso elimina a necessidade de consultar o banco no filtro.
- A fila de requisições no frontend (durante o refresh) é essencial para evitar race conditions quando múltiplas chamadas simultâneas recebem 401.
