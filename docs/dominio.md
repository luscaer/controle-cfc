# Modelo de Domínio – Controle CFC

## 1. Objetivo

Este documento descreve o **modelo de domínio** do sistema Controle CFC, diferenciando as entidades já implementadas das planejadas para o MVP final.

---

## 2. Entidades Implementadas

### 2.1 AutoEscola `[Implementado]`

**Descrição:**  
Representa a unidade de negócio principal do sistema (tenant do SaaS).

**Atributos:**
- `id` (UUID)
- `nome` (String)
- `cnpj` (String, único)
- `ativo` (Boolean)
- `dataCriacao` (LocalDateTime, auditoria)
- `dataAtualizacao` (LocalDateTime, auditoria)
- `usuarioCriador` / `usuarioModificador` (Auditoria)

**Regras de negócio:**
- Todas as entidades do sistema devem estar vinculadas a uma AutoEscola.
- Autoescolas inativas não podem operar o sistema.

---

### 2.2 Usuario `[Implementado]`

**Descrição:**  
Representa um usuário (colaborador ou administrador) do sistema.

**Atributos:**
- `id` (UUID)
- `nome` (String)
- `email` (String, único)
- `telefone` (String)
- `senha` (String, BCrypt)
- `perfilUsuario` (SUPER_ADMIN | ADMINISTRADOR | INSTRUTOR)
- `ativo` (Boolean)
- `autoEscola` (Relacionamento Many-to-One)
- `campos de auditoria` (dataCriacao, dataAtualizacao, etc)

**Regras de negócio:**
- Usuários pertencem a apenas uma autoescola.
- O acesso ao sistema depende do status `ativo` tanto do usuário quanto da sua autoescola.

---

### 2.3 RecuperacaoSenha `[Implementado]`

**Descrição:**  
Gerenciamento de tokens temporários para redefinição de senha.

**Atributos:**
- `token` (String, único)
- `usuario` (Relacionamento Many-to-One)
- `dataExpiracao` (LocalDateTime)
- `utilizado` (Boolean)

---

## 3. Entidades Planejadas (Escopo MVP)

### 3.1 Aluno `[Planejado]`

**Descrição:**  
Representa o aluno em processo de formação.

**Atributos:**
- `nome`, `cpf`, `status` (EM_FORMACAO | PRONTO_PARA_EXAMES)
- `cargaHorariaRealizada`, `cargaHorariaPrevista`
- `autoEscolaId`
- `campos de auditoria` (dataCriacao, dataAtualizacao, etc)

---

### 3.2 Venda `[Planejado]`

**Descrição:**  
Representa o acordo comercial entre o aluno e a autoescola.

**Atributos:**
- `alunoId`, `quantidadeDeAulas`, `valorTotal`, `status` (ATIVA | CONCLUIDA)
- `campos de auditoria` (dataCriacao, dataAtualizacao, etc)

---

### 3.3 Aula `[Planejado]`

**Descrição:**  
Representa uma aula prática agendada ou realizada.

**Atributos:**
- `alunoId`, `instrutorId`, `dataHoraInicio`, `duracao`, `status` (AGENDADA | REALIZADA)
- `campos de auditoria` (dataCriacao, dataAtualizacao, etc)

---

## 4. Relacionamentos Principais

* **AutoEscola 1:N Usuario** (Implementado)
* **AutoEscola 1:N Aluno** (Planejado)
* **AutoEscola 1:N Venda** (Planejado)
* **AutoEscola 1:N Aula** (Planejado)
* **Usuario 1:N RecuperacaoSenha** (Implementado)

---

## 5. Considerações

Este modelo é a "fonte da verdade" para o desenvolvimento das entidades JPA e reflete a evolução incremental do sistema SaaS.
