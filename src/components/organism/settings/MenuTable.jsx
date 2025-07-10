import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Edit2, Trash2, GripVertical } from "lucide-react";

export default function MenuListGrid({
  menu,
  openMenuModal,
  setShowMenuDel,
  onSortMenu,
}) {
  function handleDragEnd(result) {
    if (!result.destination) return;
    const reordered = Array.from(menu);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onSortMenu(reordered);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="menu-list-grid">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-white rounded-xl shadow p-5 h-[320px] overflow-y-auto"
          >
            {/* Header */}
            <div
              className="
                grid
                grid-cols-[minmax(2rem,2rem)_minmax(0,1fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(6rem,6rem)]
                gap-x-8 gap-y-4 pb-2 border-b mb-2 font-semibold text-sm
              "
            >
              <div />
              <div>Ürün</div>
              <div className="hidden md:block">Açıklama</div>
              <div className="text-right">Fiyat</div>
              <div className="text-center">İşlemler</div>
            </div>

            {/* Items */}
            {menu.length === 0 && (
              <div className="py-4 text-center text-gray-400">
                Bu kategoride ürün yok.
              </div>
            )}

            {menu.map((item, idx) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={idx}
              >
                {(prov, snapshot) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    style={prov.draggableProps.style}
                    className={
                      `
                      grid
                      grid-cols-[minmax(2rem,2rem)_minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(6rem,6rem)]
                      gap-x-6 gap-y-4 items-center
                      h-12              /* Sabit yükseklik */
                      px-2 rounded-lg transition-colors
                      ${snapshot.isDragging ? "bg-blue-100 shadow-lg" : "hover:bg-blue-50"}
                    `
                    }
                  >
                    {/* Drag Handle */}
                    <div
                      {...prov.dragHandleProps}
                      className="cursor-grab text-gray-400 text-center"
                    >
                      <GripVertical className="w-5 h-5 mx-auto" />
                    </div>

                    {/* Name */}
                    <div className="truncate">{item.name}</div>

                    {/* Description */}
                    <div className="truncate hidden md:block">
                      {item.description}
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      {parseFloat(item.price).toFixed(2)} ₺
                    </div>

                    {/* Actions */}
                    <div className="text-center space-x-2">
                      <button
                        onClick={() => openMenuModal({ edit: item })}
                        className="p-1 rounded hover:bg-blue-50 transition"
                        title="Düzenle"
                      >
                        <Edit2 className="w-5 h-5 text-gray-500 hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => setShowMenuDel(item)}
                        className="p-1 rounded hover:bg-red-50 transition"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
