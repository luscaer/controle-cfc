import { type Transition } from "framer-motion";

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
  stiffness: 260,
  damping: 32,
  mass: 1,
};
