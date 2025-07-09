import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Edit2, Trash2, GripVertical } from "lucide-react";

export default function CategoryList({
  categories,
  activeCatId,
  setActiveCatId,
  openCatModal,
  setShowCatDel,
  onSort,
}) {
  function handleDragEnd(result) {
    if (!result.destination) return;
    const reordered = Array.from(categories);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onSort?.(reordered);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="categories">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 max-h-[320px] overflow-y-auto pr-2"
            style={{ overscrollBehavior: "contain" }}
          >
            {categories.map((cat, index) => (
              <Draggable key={cat.id} draggableId={String(cat.id)} index={index}>
                {(provided, snapshot) => (
                  <motion.li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    // burada sürükleme pozisyonunu sağlayan stili ekliyoruz:
                    style={provided.draggableProps.style}
                    layout={!snapshot.isDragging}
                    transition={{ duration: 0.2 }}
                    onClick={() => setActiveCatId(cat.id)}
                    className={`
                      group flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer
                      border bg-white 
                      transition-shadow transition-colors duration-200
                      ${activeCatId === cat.id 
                        ? "border-blue-500 bg-blue-50 shadow-md" 
                        : "border-gray-200 hover:shadow hover:bg-gray-50"}
                      ${snapshot.isDragging ? "shadow-xl bg-blue-100" : ""}
                    `}
                  >
                    <span className="truncate text-gray-800 group-hover:text-blue-600">
                      {cat.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); openCatModal(cat); }}
                        className="p-1 rounded hover:bg-blue-50 transition"
                        title="Düzenle"
                      >
                        <Edit2 className="w-5 h-5 text-gray-500 hover:text-blue-600" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowCatDel(cat); }}
                        className="p-1 rounded hover:bg-red-50 transition"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                      </button>
                      <button
                        {...provided.dragHandleProps}
                        className="p-1 rounded hover:bg-gray-100 transition"
                        title="Sürükle & Sırala"
                      >
                        <GripVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </motion.li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
