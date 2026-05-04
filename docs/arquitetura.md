# Arquitetura do Sistema – Controle CFC

## 1. Visão Geral

O **Controle CFC** é um sistema **SaaS (Software as a Service)** voltado para a gestão de CFCs e autoescolas, com foco em simplicidade operacional, organização e aderência às regras do processo de habilitação.

Este documento descreve as **decisões arquiteturais** adotadas, servindo como base para desenvolvimento, manutenção e evolução futura.

---

## 2. Estrutura do Projeto

O projeto é organizado como um monorepo simplificado, contendo o backend e o frontend em diretórios distintos na raiz:

- `/backend`: API REST desenvolvida com Spring Boot.
- `/frontend`: Aplicação Web desenvolvida com React e Vite.
- `/docs`: Documentação técnica e de requisitos.

---

## 3. Estilo Arquitetural (Backend)

### 3.1 Tipo de Arquitetura
Foi adotada uma arquitetura do tipo **monólito bem organizado**.

### Justificativa:
- Escopo focado no MVP.
- Redução de complexidade operacional e de deploy.
- Facilidade de manutenção e consistência de tipos (DTOs).

### 3.2 Arquitetura em Camadas
O sistema segue uma separação clara de responsabilidades:

`Controller (API REST) → Service (Regras de Negócio) → Repository (Persistência) → Domain (Entidades)`

- **Controller**: Exposição de endpoints, validação de entrada (`@Valid`) e mapeamento para DTOs.
- **Service**: Implementação da lógica de negócio e orquestração de transações.
- **Repository**: Interface com o banco de dados via Spring Data JPA.
- **Domain**: Entidades ricas e regras fundamentais do negócio.

---

## 4. Arquitetura Frontend

O frontend foi construído priorizando performance, tipagem forte e experiência do usuário (UX).

### 4.1 Tecnologias Principais:
- **React (Vite)**: Framework base para a SPA.
- **TypeScript**: Garantia de segurança de tipos em toda a aplicação.
- **Tailwind CSS**: Sistema de estilização utilitário para design responsivo e customizável.
- **React Hook Form + Zod**: Gerenciamento de formulários e validação baseada em schemas.

### 4.2 Padrões Adotados:
- **Hooks Customizados**: Isolamento da lógica de API e estado dos componentes UI.
- **Context API**: Gerenciamento de estado global (ex: Autenticação).
- **Adapter Pattern**: Mapeamento entre os dados dos formulários frontend e as requisições esperadas pela API (DTOs).
- **Componentização**: UI baseada em componentes reutilizáveis e atômicos.

---

## 5. Segurança e Transversalidade

### 5.1 Autenticação e Autorização
- **Stateless (JWT)**: Autenticação via tokens JWT armazenados em cookies `HttpOnly` para mitigar ataques XSS.
- **Spring Security**: Configuração de segurança robusta com suporte a CORS e proteção de rotas por perfis (SUPER_ADMIN, ADMINISTRADOR, INSTRUTOR).

### 5.2 Multi-tenant (SaaS)
- **Isolamento Lógico**: Filtro obrigatório por `autoEscolaId` em todas as consultas e persistências.
- **Contexto de Segurança**: O ID da autoescola é extraído do token do usuário autenticado.

### 5.3 Auditoria
- **Spring Data Auditing**: Rastreamento automático de `dataCriacao` e `dataAtualizacao` em todas as entidades principais através de um `AuditorAware` integrado ao Spring Security.

### 5.4 Tratamento de Erros
- **Global Exception Handler**: Centralização do tratamento de exceções utilizando `@RestControllerAdvice`, garantindo respostas JSON padronizadas para o frontend.

---

## 6. Persistência de Dados

- **PostgreSQL**: Banco de dados relacional robusto.
- **H2**: Banco de dados em memória utilizado para agilidade no ambiente de desenvolvimento.
- **Hibernate (JPA)**: Mapeamento objeto-relacional com suporte a migrações e validações em tempo de execução.

---

## 7. Considerações Futuras

- **Refresh Tokens**: Implementação de rotação de tokens para maior segurança.
- **Caching**: Uso de Redis para otimização de consultas frequentes.
- **Kubernetes**: Orquestração de containers para alta disponibilidade.

---

## 8. Conclusão

A arquitetura do Controle CFC combina a robustez do ecossistema Spring no backend com a agilidade e modernidade do React no frontend, garantindo um sistema escalável, seguro e de fácil manutenção.
