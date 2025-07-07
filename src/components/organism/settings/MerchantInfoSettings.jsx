import React, { useState } from "react";
import { merchants } from "../../../data/exampleData";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import SuccessModal from "../../modals/SuccessModal";

export default function MerchantInfoSettings() {
  const [info, setInfo] = useState(merchants[0]);
  const [editImage, setEditImage] = useState(!info.image_file); // ilk upload'ta true, varsa false
  const [successOpen, setSuccessOpen] = useState(false);

  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  function handleImageDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setInfo({ ...info, image_file: URL.createObjectURL(file) });
      setEditImage(false);
    }
  }

  function handleImageInput(e) {
    const file = e.target.files[0];
    if (file) {
      setInfo({ ...info, image_file: URL.createObjectURL(file) });
      setEditImage(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Demo: sadece modal aç
    setSuccessOpen(true);
  }

  return (
    <DragDropContext onDragEnd={() => { }}>
      <div className="max-w-lg">
        <h3 className="text-xl font-semibold mb-4">İşyeri Bilgisi</h3>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 flex flex-col gap-4"
        >
          {/* Image section */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Logo/Fotoğraf
            </label>
            {info.image_file && !editImage ? (
              <div className="relative mb-2">
                <img
                  src={info.image_file}
                  alt="Logo"
                  className="w-28 h-28 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => setEditImage(true)}
                  className="absolute top-1 right-1 px-2 py-1 text-xs rounded bg-white shadow border"
                >
                  Düzenle
                </button>
              </div>
            ) : (
              <Droppable droppableId="image-drop" isDropDisabled={false}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    onDrop={handleImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded h-28 cursor-pointer transition ${
                      snapshot.isDraggingOver
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => document.getElementById("logo-input").click()}
                  >
                    <span className="text-sm text-gray-500">
                      Sürükleyip bırakın ya da tıklayın
                    </span>
                    <input
                      id="logo-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageInput}
                      className="hidden"
                    />
                  </div>
                )}
              </Droppable>
            )}
          </div>
          {/* İşyeri adı */}
          <div>
            <label className="block text-sm font-medium mb-1">İşyeri Adı</label>
            <input
              className="border rounded p-2 w-full"
              name="name"
              value={info.name}
              onChange={handleChange}
            />
          </div>
          {/* Adres */}
          <div>
            <label className="block text-sm font-medium mb-1">Adres</label>
            <input
              className="border rounded p-2 w-full"
              name="address"
              value={info.address}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
          >
            Kaydet
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Bilgileriniz başarıyla güncellendi!"
      />
    </DragDropContext>
  );
}
