# Controle CFC - Frontend

Esta é a aplicação web do sistema **Controle CFC**, desenvolvida com tecnologias modernas para oferecer uma interface rápida, responsiva e segura para a gestão de autoescolas.

## Tecnologias Principais

- **React 18**: Biblioteca base para construção da interface.
- **Vite**: Ferramenta de build extremamente rápida.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao projeto.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e consistente.
- **React Hook Form**: Gerenciamento eficiente de formulários.
- **Zod**: Validação de esquemas com integração total ao TypeScript e React Hook Form.
- **Axios**: Cliente HTTP para comunicação com a API REST.
- **React Router Dom**: Gerenciamento de rotas e navegação.
- **Lucide React**: Biblioteca de ícones leves e bonitos.
- **Sonner**: Sistema de notificações (toast) elegante.

## 📁 Estrutura de Pastas

```text
src/
├── api/          # Definições de chamadas à API (Axios)
├── assets/       # Imagens, logotipos e estilos globais
├── components/   # Componentes React reutilizáveis (UI, layouts, entidades)
├── context/      # Contextos globais (Autenticação, Temas)
├── hooks/        # Hooks customizados para lógica de negócio e API
├── pages/        # Componentes de página (rotas principais)
├── schemas/      # Definições de validação Zod
├── types/        # Definições de tipos TypeScript
└── utils/        # Funções utilitárias (formatadores, validadores)
```

## 🛠️ Como Iniciar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

## 🔐 Autenticação

A aplicação utiliza um fluxo de autenticação baseado em **JWT** enviado através de cookies `HttpOnly` pelo backend. O estado de autenticação é gerenciado globalmente via `AuthContext`, protegendo rotas privadas e controlando o acesso baseado no perfil do usuário.

## 🎨 Design System

O projeto utiliza uma paleta de cores personalizada via Tailwind, com foco em:
- **Responsividade**: Layouts que se adaptam de mobile a telas 4K.
- **Feedback Visual**: Estados de carregamento, erros de validação claros e notificações em tempo real.
- **Acessibilidade**: Uso de elementos semânticos e contrastes adequados.
