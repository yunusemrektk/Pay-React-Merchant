import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EditIcon, DeleteIcon, SwapIcon } from "../main/Icons";

export default function MenuTable({
  menu,
  categories,
  openMenuModal,
  setShowMenuDel,
  setMoveMenuItem,
  onSortMenu, // Sıralama callback'i parent'tan gelir
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
                  <th className="w-8"></th> {/* drag handle sütunu */}
                  <th className="py-2 text-left w-1/4">Ürün</th>
                  <th className="py-2 text-left w-2/5">Açıklama</th>
                  <th className="py-2 text-center w-1/6">Fiyat</th>
                  <th className="py-2 w-16 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {menu.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-3 text-center text-gray-400">
                      Bu kategoride ürün yok.
                    </td>
                  </tr>
                )}
                {menu.map((item, idx) => (
                  <Draggable draggableId={item.id.toString()} index={idx} key={item.id}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border-b last:border-none group hover:bg-blue-50 transition-colors ${snapshot.isDragging ? "bg-blue-100" : ""}`}
                        style={{
                          ...provided.draggableProps.style,
                          // Sürüklerken daralma önlemi:
                          minHeight: "48px", // satır yüksekliği sabit tut
                          background: snapshot.isDragging ? "#DBEAFE" : undefined,
                        }}
                      >
                        {/* Drag handle hücresi */}
                        <td className="w-8 text-center align-middle">
                          <span
                            {...provided.dragHandleProps}
                            className="cursor-grab text-lg text-gray-400 hover:text-gray-700"
                            title="Sürükle"
                          >
                            {/* Drag ikonunu burada özelleştirebilirsin */}
                            ☰
                          </span>
                        </td>
                        <td className="py-2 w-1/4">
                          <span className="block truncate max-w-[160px] whitespace-nowrap overflow-hidden">
                            {item.name}
                          </span>
                        </td>
                        <td className="py-2 w-2/5">
                          <span className="block truncate max-w-[260px] whitespace-nowrap overflow-hidden">
                            {item.description}
                          </span>
                        </td>
                        <td className="py-2 w-1/6 text-center">
                          {parseFloat(item.price).toFixed(2)} ₺
                        </td>
                        <td className="py-2 w-28 min-w-[6rem] text-center whitespace-nowrap">
                          <button
                            className="inline-block mr-2 align-middle"
                            title="Düzenle"
                            onClick={() => openMenuModal({ edit: item })}
                            tabIndex={0}
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="inline-block mr-2 align-middle"
                            title="Sil"
                            onClick={() => setShowMenuDel(item)}
                            tabIndex={0}
                          >
                            <DeleteIcon />
                          </button>
                          <button
                            className="inline-block align-middle"
                            title="Kategorisini değiştir"
                            onClick={() => setMoveMenuItem(item)}
                            tabIndex={0}
                          >
                            <SwapIcon />
                          </button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
