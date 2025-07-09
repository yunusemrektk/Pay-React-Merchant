import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EditIcon, DeleteIcon } from "../main/Icons";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

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
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    if (onSort) onSort(reordered);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="categories">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50"
            style={{ overscrollBehavior: "contain" }}
          >
            {categories.map((cat, index) => (
              <Draggable key={cat.id} draggableId={cat.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <motion.li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    layout={!snapshot.isDragging}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer border bg-white
                      ${activeCatId === cat.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}
                      ${snapshot.isDragging ? "shadow-lg bg-blue-100" : ""}`}
                    onClick={() => setActiveCatId(cat.id)}
                  >
                    <span className="truncate">{cat.label}</span>
                    <div className="flex items-center gap-1 ml-2">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          openCatModal(cat);
                        }}
                      >
                        <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600 transition" />
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCatDel(cat);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600 transition" />
                      </span>
                      <span
                        className="ml-2 cursor-grab"
                        title="Sürükle ve sırala"
                        {...provided.dragHandleProps}
                      >
                        ☰
                      </span>
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
