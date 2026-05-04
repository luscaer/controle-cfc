# Controle CFC

> Sistema de gestão para CFCs e autoescolas, focado em organização e simplicidade no dia a dia.

**Controle total do seu CFC**

<img width="2560" height="1440" alt="Logo-ControleCFC-2K" src="https://github.com/user-attachments/assets/b232b8d6-7e15-44b2-a4d9-b70e167a3273" />

> Este projeto faz parte do meu portfólio profissional e está sendo desenvolvido seguindo boas práticas de engenharia de software, arquitetura e metodologias ágeis.

---

## Visão Geral

O **Controle CFC** é um sistema **SaaS B2B** voltado para Centros de Formação de Condutores (CFCs) e autoescolas, com foco na gestão de alunos, aulas práticas e vendas de pacotes, seguindo as diretrizes legais e priorizando simplicidade operacional.

O sistema utiliza uma abordagem **Multi-tenant**, onde cada autoescola possui seu próprio isolamento de dados, permitindo que uma única instância do software atenda a múltiplos clientes de forma segura.

---

## Status do Projeto

🟢 **MVP em Desenvolvimento Ativo**  
A estrutura base do sistema (Backend e Frontend) está consolidada, com os fluxos principais de autenticação e gestão de entidades fundamentais implementados.

### Funcionalidades Atuais:
- [x] **Arquitetura Base**: Backend Spring Boot e Frontend React estruturados.
- [x] **Multi-tenancy**: Isolamento de dados por autoescola (`autoEscolaId`).
- [x] **Autenticação Segura**: Sistema de Login e Registro com JWT e cookies HttpOnly.
- [x] **Registro de Contas**: Fluxo completo de criação de Autoescola + Usuário Administrador.
- [x] **Gestão de Autoescolas**: Dashboard para visualização e edição de dados das autoescolas.
- [x] **Gestão de Usuários**: Controle de perfis e ativação/desativação de usuários.
- [x] **Redefinição de Senha**: Fluxo de "Esqueci minha senha" com envio de e-mail e tokens temporários.

---

## Tecnologias

### Backend
- **Java 21** e **Spring Boot 3**
- **Spring Security** com **JWT** (Stateless)
- **Spring Data JPA** com **Auditoria** (dataCriacao, dataAtualizacao)
- **Validation** (Bean Validation) e **Global Exception Handling**
- **PostgreSQL** como banco de dados principal

### Frontend
- **React (Vite)** com **TypeScript**
- **Tailwind CSS** para estilização moderna e responsiva
- **React Hook Form** + **Zod** para validação robusta de formulários
- **Lucide React** (Ícones) e **Sonner** (Notificações)
- **Axios** para comunicação com a API

### Infraestrutura
- **Docker** e **Docker Compose**
- **Mailtrap** para testes de envio de e-mail em desenvolvimento

---

## Como Executar

### Pré-requisitos
- Docker e Docker Compose
- Java 21+ (opcional para execução via Docker)
- Node.js 20+ (opcional para execução via Docker)

### Execução via Docker (Recomendado)
1. Clone o repositório.
2. Configure as variáveis de ambiente no arquivo `.env` (baseie-se no `.env.example`).
3. Execute o comando:
   ```bash
   docker-compose up -d
   ```
4. O frontend estará disponível em `http://localhost:5173` (ou conforme configurado) e o backend em `http://localhost:8080`.

### Execução Local (Desenvolvimento)
Para rodar sem Docker (exceto o banco de dados):
1. Suba apenas o banco de dados via Docker **OU** utilize o perfil de desenvolvimento (`dev`) para usar o banco de dados em memória **H2**.
2. Use o script auxiliar:
   ```bash
   ./run-local.sh
   ```

---

## Documentação Detalhada
- [Arquitetura do Sistema](docs/arquitetura.md)
- [Modelo de Domínio](docs/dominio.md)
- [Documento de Requisitos (MVP)](docs/Sistema%20de%20Gerenciamento%20de%20Auto%20Escolas.pdf)

---

## Evoluções Futuras
- [ ] Módulo de Alunos e Matrículas
- [ ] Agendamento de Aulas Práticas
- [ ] Gestão de Vendas e Pacotes
- [ ] Integração com órgãos oficiais (Detran)
- [ ] Relatórios gerenciais e financeiros
