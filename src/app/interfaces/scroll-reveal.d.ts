export interface RevealOptions {
    delay?: number;
    duration?: number;
    easing?: string;
    distance?: string;
    origin?: 'top' | 'bottom' | 'left' | 'right';
    rotate?: { x: number, y: number, z: number };
    opacity?: number;
    scale?: number;
    viewFactor?: number;
    reset?: boolean;
}