import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Edit2, Trash2, GripVertical } from "lucide-react";

export default function MenuTable({
  menu,
  openMenuModal,
  setShowMenuDel,
  onSortMenu,
}) {
  function handleDragEnd(result) {
    if (!result.destination) return;
    const reordered = Array.from(menu);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onSortMenu(reordered);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="menu-table">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-white rounded-xl shadow p-5 min-h-[320px] max-h-[320px] overflow-y-auto"
          >
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b">
                  <th className="w-8" />
                  <th className="py-2 text-left w-1/4">Ürün</th>
                  <th className="py-2 text-left w-2/5 hidden md:table-cell">
                    Açıklama
                  </th>
                  <th className="py-2 text-center w-1/6">Fiyat</th>
                  <th className="py-2 w-16 text-center" />
                </tr>
              </thead>
              <tbody>
                {menu.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-3 text-center text-gray-400">
                      Bu kategoride ürün yok.
                    </td>
                  </tr>
                ) : (
                  menu.map((item, idx) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={idx}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={`border-b last:border-none transition-colors ${
                            snapshot.isDragging
                              ? "bg-blue-100 shadow-lg"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          {/* Drag Handle */}
                          <td className="w-8 text-center align-middle">
                            <GripVertical
                              className="mx-auto w-5 h-5 text-gray-400 hover:text-gray-600 cursor-grab"
                              title="Sürükle & Sırala"
                            />
                          </td>

                          {/* Name */}
                          <td className="py-2 w-1/4">
                            <span className="block truncate max-w-[160px]">
                              {item.name}
                            </span>
                          </td>

                          {/* Description */}
                          <td className="py-2 w-2/5 hidden md:table-cell">
                            <span className="block truncate max-w-[260px]">
                              {item.description}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-2 w-1/6 text-center">
                            {parseFloat(item.price).toFixed(2)} ₺
                          </td>

                          {/* Actions */}
                          <td className="py-2 w-28 min-w-[6rem] text-center whitespace-nowrap">
                            <button
                              onClick={() => openMenuModal({ edit: item })}
                              className="inline-flex items-center justify-center p-1 mr-2 rounded hover:bg-blue-50 transition"
                              title="Düzenle"
                            >
                              <Edit2 className="w-5 h-5 text-gray-500 hover:text-blue-600" />
                            </button>
                            <button
                              onClick={() => setShowMenuDel(item)}
                              className="inline-flex items-center justify-center p-1 rounded hover:bg-red-50 transition"
                              title="Sil"
                            >
                              <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </tbody>
            </table>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
