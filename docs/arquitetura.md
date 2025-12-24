# Arquitetura do Sistema – Controle CFC

## 1. Visão Geral

O **Controle CFC** é um sistema **SaaS (Software as a Service)** voltado para a gestão de CFCs e autoescolas, com foco em simplicidade operacional, organização e aderência às regras do processo de habilitação.

Este documento descreve as **decisões arquiteturais** adotadas para o MVP do sistema, servindo como base para desenvolvimento, manutenção e evolução futura.

---

## 2. Estilo Arquitetural

### 2.1 Tipo de Arquitetura

Foi adotada uma arquitetura do tipo **monólito bem organizado**.

### Justificativa:
- Escopo inicial limitado (MVP)
- Projeto desenvolvido por um único desenvolvedor
- Redução de complexidade operacional
- Facilidade de manutenção e aprendizado
- Base sólida para futura evolução

---

## 3. Arquitetura em Camadas

O sistema segue uma **arquitetura em camadas**, separando responsabilidades de forma clara:

Controller (API Rest) → Service (Regras de Negócio) → Domain (Entidades e Regras do Domínio) → Repository (Persistência de Dados)


### Responsabilidades das camadas:

#### Controller
- Exposição das APIs REST
- Recebimento e validação básica de requisições
- Conversão de DTOs

#### Service
- Implementação das regras de negócio
- Orquestração entre entidades e repositórios
- Garantia de consistência do domínio

#### Domain
- Entidades do sistema
- Enums e regras centrais
- Representação do negócio

#### Repository
- Acesso ao banco de dados
- Implementação da persistência utilizando JPA
- Isolamento da lógica de acesso a dados

---

## 4. Padrão de API

- Estilo: **REST**
- Formato de dados: **JSON**
- Versionamento de API:


### Exemplo de endpoints:

* POST /api/v1/alunos 
* GET /api/v1/aulas 
* POST /api/v1/vendas

---

## 5. Estratégia SaaS (Multi-tenant)

O Controle CFC foi projetado desde o MVP como um sistema **multi-tenant**, permitindo o uso por múltiplas autoescolas.

### Estratégia adotada:
✔ Multi-tenant por **autoEscolaId**

### Regras:
- Todas as entidades possuem referência a `autoEscolaId`
- Todas as consultas devem ser filtradas por `autoEscolaId`
- Usuários pertencem a apenas uma autoescola

Essa abordagem simplifica a implementação inicial e garante isolamento lógico entre os dados.

---

## 6. Segurança (Visão MVP)

- Autenticação baseada em usuários
- Perfis de acesso:
    - ADMINISTRADOR
    - INSTRUTOR
- Adoção futura de Spring Security com JWT

No MVP, a segurança será implementada de forma incremental, priorizando a estrutura correta.

---

## 7. Persistência de Dados

- Banco de dados relacional
- Tecnologia: **PostgreSQL**
- ORM: **JPA / Hibernate**

O modelo de dados segue a modelagem de domínio definida no documento de requisitos do MVP.

---

## 8. Considerações Futuras

As seguintes evoluções estão previstas, mas fora do escopo do MVP:

- Integração com sistemas governamentais
- Relatórios avançados
- Escalabilidade com Kubernetes
- Separação em microserviços, se necessário

---

## 9. Conclusão

A arquitetura do Controle CFC foi pensada para atender às necessidades do MVP com **clareza, simplicidade e boas práticas**, permitindo evolução futura sem retrabalho excessivo.

Este documento será revisado conforme o sistema amadurecer.
