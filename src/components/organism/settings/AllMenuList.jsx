import React from "react";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductThumbnail from "../../molecules/ProductThumbnail";

export default function AllMenuList({ categories, menu, activeCatId }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full overflow-y-auto">
      {/* Başlık */}
      <div className="flex items-center mb-6">
        <Info className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Tüm Ürünler Önizlemesi
        </h2>
      </div>

      {/* Kategori Kartları */}
      <div className="space-y-10">
        <AnimatePresence>
          {categories.map((cat) => {
            const catProducts = menu.filter((m) => m.category_id === cat.id);
            return (
              <motion.section
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                {/* Kategori Başlığı */}
                <h3
                  className={`
                    text-xl font-semibold mb-4 pb-2
                    ${
                      activeCatId === cat.id ? "text-blue-700" : "text-gray-800"
                    }
                    border-b-2 ${
                      activeCatId === cat.id
                        ? "border-blue-200"
                        : "border-gray-200"
                    }
                  `}
                >
                  {cat.label}
                </h3>

                {/* Ürünler */}
                {catProducts.length === 0 ? (
                  <div className="text-gray-400 italic">
                    Bu kategoride ürün yok.
                  </div>
                ) : (
                  <div
                    className="
                      grid
                      grid-cols-2
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      xl:grid-cols-5
                      gap-4
                    "
                  >
                    {catProducts.map((prod) => (
                      <motion.div
                        key={prod.id}
                        whileHover={{ y: -4 }}
                        className="
                          relative bg-white rounded-lg shadow-sm hover:shadow-md
                          transition-shadow overflow-hidden flex flex-col
                        "
                      >
                        {/* Fiyat Rozeti */}
                        <span
                          className="absolute top-2 right-2 z-10
                            bg-blue-600 text-white text-xs font-semibold
                            px-2 py-1 rounded"
                        >
                          {parseFloat(prod.price).toFixed(2)} ₺
                        </span>

                        {/* Resim - rounded üst köşe */}
                        <div className="w-full aspect-[3/2] overflow-hidden rounded-t-lg">
                          <ProductThumbnail
                            imagePath={prod.image}
                            alt={prod.name}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* İçerik */}
                        <div className="p-4 flex-1 flex flex-col justify-end">
                          <h4 className="text-sm font-medium text-gray-800 truncate">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {prod.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
