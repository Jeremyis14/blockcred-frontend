export type WidgetType =
  | "apiCalls"
  | "latency"
  | "topEndpoints"
  | "errors"
  | "quota"
  | "pumpkin"; // fun seasonal widget

export interface WidgetConfig {
  id: string; // stable id
  type: WidgetType;
  title?: string;
  // grid position and size
  x: number; // column start
  y: number; // row start
  w: number; // columns spanned
  h: number; // rows spanned
}

export const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: "w1", type: "apiCalls", title: "API Calls (7d)", x: 0, y: 0, w: 4, h: 3 },
  { id: "w2", type: "latency", title: "Latency", x: 4, y: 0, w: 4, h: 3 },
  { id: "w3", type: "topEndpoints", title: "Top Endpoints", x: 0, y: 3, w: 4, h: 3 },
  { id: "w4", type: "errors", title: "Errors", x: 4, y: 3, w: 2, h: 3 },
  { id: "w5", type: "quota", title: "Quota Usage", x: 6, y: 3, w: 2, h: 3 },
];
