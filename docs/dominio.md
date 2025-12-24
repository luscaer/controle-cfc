# Modelo de Domínio – Controle CFC

## 1. Objetivo

Este documento descreve o **modelo de domínio do MVP** do sistema Controle CFC.
Ele define as entidades principais, seus atributos, relacionamentos e regras de negócio,
servindo como base para o modelo de dados e implementação das entidades JPA.

---

## 2. Entidades do Domínio (MVP)

### 2.1 AutoEscola

**Descrição:**  
Representa a unidade de negócio principal do sistema (tenant do SaaS).

**Atributos:**
- id
- nome
- cnpj
- ativo
- dataCriacao

**Regras de negócio:**
- Todas as entidades do sistema devem estar vinculadas a uma AutoEscola.
- Autoescolas inativas não podem operar o sistema.

---

### 2.2 Usuario

**Descrição:**  
Representa um usuário do sistema.

**Atributos:**
- id
- nome
- email
- senha
- perfil (ADMINISTRADOR | INSTRUTOR)
- ativo
- autoEscolaId

**Regras de negócio:**
- Usuários pertencem a apenas uma autoescola.
- Instrutores possuem acesso restrito às funcionalidades do sistema.

---

### 2.3 Aluno

**Descrição:**  
Representa o aluno em processo de formação.

**Atributos:**
- id
- nome
- cpf
- status (EM_FORMACAO | PRONTO_PARA_EXAMES)
- cargaHorariaRealizada
- autoEscolaId

**Regras de negócio:**
- A carga horária realizada é atualizada automaticamente com a confirmação das aulas.
- O status do aluno é atualizado conforme a carga horária.

---

### 2.4 Venda

**Descrição:**  
Representa o acordo comercial entre o aluno e a autoescola.

**Atributos:**
- id
- alunoId
- quantidadeDeAulas
- valorTotal
- status (ATIVA | CONCLUIDA)
- dataCriacao
- autoEscolaId

**Regras de negócio:**
- Aulas só podem ser agendadas se houver venda ativa.
- Cada venda pertence a um aluno.

---

### 2.5 Aula

**Descrição:**  
Representa uma aula prática do aluno.

**Atributos:**
- id
- alunoId
- instrutorId
- dataHoraInicio
- duracao
- status (AGENDADA | REALIZADA)
- autoEscolaId

**Regras de negócio:**
- Uma aula só pode ser confirmada uma vez.
- A confirmação da aula soma carga horária ao aluno.

---

## 3. Relacionamentos

* AutoEscola 1:N Usuario 
* AutoEscola 1:N Aluno 
* AutoEscola 1:N Venda 
* AutoEscola 1:N Aula 

* Aluno 1:N Venda 
* Aluno 1:N Aula 
* Usuario (Instrutor) 1:N Aula

---

## 4. Considerações

Este modelo foi definido com foco no MVP, priorizando simplicidade e clareza,
permitindo evolução futura sem refatorações complexas.
