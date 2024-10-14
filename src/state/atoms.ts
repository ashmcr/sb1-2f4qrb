import { atom } from 'recoil';

export interface CanvasComponent {
  id: number;
  type: string;
  position: { x: number; y: number };
  content: string;
}

export const canvasComponentsState = atom<CanvasComponent[]>({
  key: 'canvasComponentsState',
  default: [],
});

export const selectedComponentState = atom<number | null>({
  key: 'selectedComponentState',
  default: null,
});