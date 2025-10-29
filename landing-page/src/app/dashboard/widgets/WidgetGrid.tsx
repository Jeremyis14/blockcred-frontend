// "use client";
//
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { motion, Reorder } from "framer-motion";
// import { WidgetCard } from "./WidgetCard";
// import { DEFAULT_WIDGETS, WidgetConfig, WidgetType } from "./WidgetTypes";
// import { useLocalStorage } from "./useLocalStorage";
//
// const COLS = 8; // responsive grid columns
// const ROW_HEIGHT = 80; // px per row (for h)
// const GUTTER = 12; // px
//
// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }
//
// function snapToGrid(px: number, cell: number) {
//   return Math.round(px / cell);
// }
//
// export function WidgetGrid() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isEditing, setIsEditing] = useLocalStorage("dash.widgets.edit", false);
//   const [widgets, setWidgets] = useLocalStorage<WidgetConfig[]>("dash.widgets.layout", DEFAULT_WIDGETS);
//   const [halloween, setHalloween] = useLocalStorage("dash.widgets.halloween", true);
//
//   const [dragging, setDragging] = useState<string | null>(null);
//   const dragStart = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
//   const resizeStart = useRef<{ id: string; startX: number; startY: number; origW: number; origH: number; dir: "right" | "bottom" } | null>(null);
//   const [isNarrow, setIsNarrow] = useState(false);
//
//   const ordered = useMemo(() => {
//     return [...widgets].sort((a, b) => a.y - b.y || a.x - b.x);
//   }, [widgets]);
//
//   useEffect(() => {
//     const mq = window.matchMedia("(max-width: 640px)");
//     const set = () => setIsNarrow(mq.matches);
//     set();
//     mq.addEventListener ? mq.addEventListener("change", set) : window.addEventListener("resize", set);
//     return () => {
//       mq.removeEventListener ? mq.removeEventListener("change", set) : window.removeEventListener("resize", set);
//     };
//   }, []);
//
//   function removeWidget(id: string) {
//     // optimistic removal with slight delay to allow exit animation
//     setWidgets(prev => prev.filter(w => w.id !== id));
//   }
//
//   function addWidget(type: WidgetType) {
//     const id = `${type}-${Date.now()}`;
//     const lastY = widgets.reduce((m, w) => Math.max(m, w.y + w.h), 0);
//     const w = type === "topEndpoints" ? 4 : 2;
//     const h = type === "topEndpoints" ? 3 : 3;
//     setWidgets([...widgets, { id, type, title: undefined, x: 0, y: lastY, w, h }]);
//   }
//
//   function resetLayout() {
//     setWidgets(DEFAULT_WIDGETS);
//   }
//
//   function onDragMove(e: React.PointerEvent) {
//     if (!isEditing || !dragStart.current || !containerRef.current) return;
//     const { id, startX, startY, origX, origY } = dragStart.current;
//     const rect = containerRef.current.getBoundingClientRect();
//     const cellW = (rect.width - (COLS - 1) * GUTTER) / COLS;
//     const dx = e.clientX - startX;
//     const dy = e.clientY - startY;
//     const nx = isNarrow ? 0 : clamp(origX + snapToGrid(dx, cellW), 0, COLS - (widgets.find(w => w.id === id)?.w ?? 1));
//     const ny = Math.max(0, origY + snapToGrid(dy, ROW_HEIGHT));
//     setWidgets(prev => prev.map(w => (w.id === id ? { ...w, x: nx, y: ny } : w)));
//   }
//
//   function onDragStart(e: React.PointerEvent, id: string) {
//     if (!isEditing || !containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const cellW = (rect.width - (COLS - 1) * GUTTER) / COLS;
//     const w = widgets.find(w => w.id === id)!;
//     dragStart.current = { id, startX: e.clientX, startY: e.clientY, origX: w.x, origY: w.y };
//     setDragging(id);
//     const target = e.currentTarget as HTMLElement;
//     target.setPointerCapture?.(e.pointerId);
//     e.preventDefault();
//   }
//
//   function onDragEnd(e: React.PointerEvent) {
//     if (!dragStart.current) return;
//     const target = e.currentTarget as HTMLElement;
//     try { target.releasePointerCapture?.(e.pointerId); } catch {}
//     dragStart.current = null;
//     setDragging(null);
//   }
//
//   function onResizeStart(e: React.PointerEvent, id: string, dir: "right" | "bottom") {
//     if (!isEditing || !containerRef.current) return;
//     const w = widgets.find(w => w.id === id)!;
//     resizeStart.current = { id, startX: e.clientX, startY: e.clientY, origW: w.w, origH: w.h, dir };
//     const target = e.currentTarget as HTMLElement;
//     target.setPointerCapture?.(e.pointerId);
//     e.preventDefault();
//   }
//
//   function onResizeMove(e: React.PointerEvent) {
//     if (!isEditing || !resizeStart.current || !containerRef.current) return;
//     const { id, startX, startY, origW, origH, dir } = resizeStart.current;
//     const rect = containerRef.current.getBoundingClientRect();
//     const cellW = (rect.width - (COLS - 1) * GUTTER) / COLS;
//     const dx = e.clientX - startX;
//     const dy = e.clientY - startY;
//     setWidgets(prev => prev.map(w => {
//       if (w.id !== id) return w;
//       const newW = dir === "right" ? clamp(origW + snapToGrid(dx, cellW), 1, COLS - w.x) : w.w;
//       const newH = dir === "bottom" ? clamp(origH + snapToGrid(dy, ROW_HEIGHT), 1, 20) : w.h;
//       return { ...w, w: newW, h: newH };
//     }));
//   }
//
//   function onResizeEnd(e: React.PointerEvent) {
//     if (!resizeStart.current) return;
//     const target = e.currentTarget as HTMLElement;
//     try { target.releasePointerCapture?.(e.pointerId); } catch {}
//     resizeStart.current = null;
//   }
//
//   function renderWidget(w: WidgetConfig) {
//     const key = w.id;
//     const effX = isNarrow && isEditing ? 0 : w.x;
//     const effW = isNarrow && isEditing ? COLS : w.w;
//     const style: React.CSSProperties = {
//       gridColumn: `${effX + 1} / span ${effW}`,
//       gridRow: `${w.y + 1} / span ${w.h}`,
//       minHeight: ROW_HEIGHT * w.h + (GUTTER * (w.h - 1)),
//       cursor: isEditing ? (dragging === w.id ? "grabbing" : "grab") : "default",
//       userSelect: "none",
//       touchAction: "none",
//     };
//
//     const content = (() => {
//       if (w.type === "pumpkin") {
//         return (
//           <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
//             <div className="text-5xl animate-bounce">🎃</div>
//             <div className="absolute inset-x-0 top-2 flex justify-between px-4 opacity-70 text-xl select-none">
//               <span className="animate-[fly_8s_linear_infinite]">🦇</span>
//               <span className="animate-[fly_10s_linear_infinite]">🦇</span>
//               <span className="animate-[fly_12s_linear_infinite]">🦇</span>
//             </div>
//             <style jsx>{`
//               @keyframes fly { from { transform: translateX(-10%);} to { transform: translateX(110%);} }
//             `}</style>
//           </div>
//         );
//       }
//       return (
//         <div className="h-full w-full text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
//           {w.type} content here
//         </div>
//       );
//     })();
//
//     return (
//       <motion.div
//         key={key}
//         layout
//         initial={{ opacity: 0.9, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
//         transition={{ type: "spring", stiffness: 500, damping: 40 }}
//         style={style}
//         onPointerDown={isEditing ? (e) => onDragStart(e, w.id) : undefined}
//         onPointerUp={isEditing ? (e) => onDragEnd(e) : undefined}
//         onPointerMove={isEditing && dragging === w.id ? (e) => onDragMove(e) : undefined}
//       >
//         <WidgetCard
//           title={(halloween ? "🎃 " : "") + (w.title ?? w.type)}
//           isEditing={isEditing}
//           onRemove={() => removeWidget(w.id)}
//         >
//           {content}
//           {isEditing && (
//             <div className="absolute inset-0 pointer-events-none">
//               {!isNarrow && (
//                 <div className="absolute -right-1 top-1/2 -translate-y-1/2 pointer-events-auto">
//                   <button
//                     className="w-3 h-6 rounded bg-gray-200/70 dark:bg-gray-700/60 cursor-ew-resize"
//                     onPointerDown={(e) => onResizeStart(e, w.id, "right")}
//                     onPointerMove={(e) => onResizeMove(e)}
//                     onPointerUp={(e) => onResizeEnd(e)}
//                   />
//                 </div>
//               )}
//               <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 pointer-events-auto">
//                 <button
//                   className={`${isNarrow ? "w-10 h-5" : "w-6 h-3"} rounded bg-gray-200/70 dark:bg-gray-700/60 cursor-ns-resize`}
//                   onPointerDown={(e) => onResizeStart(e, w.id, "bottom")}
//                   onPointerMove={(e) => onResizeMove(e)}
//                   onPointerUp={(e) => onResizeEnd(e)}
//                 />
//               </div>
//             </div>
//           )}
//         </WidgetCard>
//       </motion.div>
//     );
//   }
//
//   return (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between">
//         <div className="flex gap-2 items-center">
//           <button
//             className={`px-3 py-1.5 text-sm rounded-md border ${isEditing ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"}`}
//             onClick={() => setIsEditing(!isEditing)}
//           >
//             {isEditing ? "Done" : "Customize"}
//           </button>
//           <button
//             className={`px-3 py-1.5 text-sm rounded-md border ${halloween ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"}`}
//             onClick={() => setHalloween(!halloween)}
//             title="Toggle Halloween theme"
//           >
//             {halloween ? "🎃 Halloween" : "🎃 Enable Halloween"}
//           </button>
//           {isEditing && (
//             <>
//               <button
//                 className="px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"
//                 onClick={() => addWidget("apiCalls")}
//               >Add API Calls</button>
//               <button
//                 className="px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"
//                 onClick={() => addWidget("latency")}
//               >Add Latency</button>
//               <button
//                 className="px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"
//                 onClick={() => addWidget("topEndpoints")}
//               >Add Top Endpoints</button>
//               <button
//                 className="px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"
//                 onClick={() => addWidget("errors")}
//               >Add Errors</button>
//               <button
//                 className="px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"
//                 onClick={() => addWidget("quota")}
//               >Add Quota</button>
//               <button
//                 className="px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-black/40 border-gray-200 dark:border-gray-800"
//                 onClick={resetLayout}
//               >Reset</button>
//             </>
//           )}
//         </div>
//       </div>
//
//       <div
//         ref={containerRef}
//         className={`grid ${halloween ? "relative" : ""}`}
//         style={{
//           gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
//           gap: GUTTER,
//           gridAutoRows: `${ROW_HEIGHT}px`,
//         }}
//       >
//         {halloween && (
//           <div
//             aria-hidden
//             className="pointer-events-none absolute inset-0 -z-10 opacity-70"
//             style={{
//               backgroundImage: "radial-gradient(ellipse at top left, rgba(255,140,0,0.12), transparent 50%), radial-gradient(ellipse at bottom right, rgba(147,51,234,0.12), transparent 50%)"
//             }}
//           />
//         )}
//         {ordered.map(renderWidget)}
//       </div>
//     </div>
//   );
// }
