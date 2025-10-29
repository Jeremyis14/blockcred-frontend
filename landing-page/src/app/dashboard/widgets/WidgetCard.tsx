// "use client";
//
// import React from "react";
// import { motion } from "framer-motion";
//
// interface Props extends React.HTMLAttributes<HTMLDivElement> {
//   title: string;
//   isEditing?: boolean;
//   onRemove?: () => void;
// }
//
// export const WidgetCard: React.FC<Props> = ({ title, isEditing, onRemove, children, ...rest }) => {
//   return (
//     <motion.div
//       layout
//       layoutId={title}
//       {...rest}
//       className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/40 backdrop-blur p-3 shadow-sm ${rest.className ?? ""}`}
//       transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
//     >
//       <div className="flex items-center justify-between mb-2">
//         <div className="text-sm font-medium opacity-80">{title}</div>
//         {isEditing ? (
//           <button
//             onClick={onRemove}
//             className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
//           >
//             Remove
//           </button>
//         ) : null}
//       </div>
//       <div className="min-h-20">{children}</div>
//     </motion.div>
//   );
// };
