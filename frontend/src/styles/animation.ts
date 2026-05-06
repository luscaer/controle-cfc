import { type Transition, type Variants } from "framer-motion";

/**
 * Transição suave de opacidade (Fade)
 * Ideal para Overlays e Backgrounds
 */
export const TRANSITION_FADE: Transition = {
  duration: 0.2,
  ease: "easeInOut",
};

/**
 * Física de mola para Modais (Centro da tela)
 * Focada em precisão e escala suave
 */
export const SPRING_MODAL: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/**
 * Física de mola para SlideOvers (Lateral)
 * Um pouco mais firme, dando a sensação de um painel sólido deslizando
 */
export const SPRING_SLIDE: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 40,
  mass: 0.8,
};

/**
 * Variantes para transição de slides (Ex: Passos de um formulário)
 * Suporta direção dinâmica: 1 para frente, -1 para trás
 */
export const VARIANTS_SIDE_SLIDE: Variants = {
  entrada: (direcao: number) => ({
    x: direcao > 0 ? 40 : -40,
    opacity: 0,
  }),
  centro: {
    x: 0,
    opacity: 1,
  },
  saida: (direcao: number) => ({
    x: direcao > 0 ? -40 : 40,
    opacity: 0,
  }),
};