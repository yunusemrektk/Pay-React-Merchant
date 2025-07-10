import { useState } from "react";
import { uniqId } from "../util/MenuItemUtil";

export function useCategories(initialCategories = []) {
    const [categories, setCategories] = useState(() => [...initialCategories]);

    function addCategory(label) {
        const trimmed = label.trim();
        if (!trimmed) return null;

        console.log("categories before", categories)
        const newCat = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            category_key: trimmed.toLowerCase().replace(/\s+/g, "-"),
            label: trimmed,
            sort_order: categories.length + 1,
        };
        setCategories((cats) => [...cats, newCat]);
        console.log("categories before", categories)

        return newCat.id;
    }

    function editCategory(id, newLabel) {
        setCategories(c =>
            c.map(x => (x.id === id ? { ...x, label: newLabel } : x))
        );
    }

    function deleteCategory(id) {
        setCategories(c => c.filter(x => x.id !== id));
    }

    function sortCategories(newOrder) {
        setCategories(newOrder);
    }

    return {
        categories,
        addCategory,
        editCategory,
        deleteCategory,
        sortCategories,
    };
}
