import React from 'react'

export const SidebarFilter = ({ categories, selectedCategories, onChange }) => {
    return (
        <aside className="w-64 p-4 border-r border-gray-300">
            <h3 className="text-lg font-bold">Filtrar por categoría</h3>
            <div className="mt-3 flex flex-col gap-2">
                {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                                onChange(category, e.target.checked)
                            }}
                            className="cursor-pointer"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>
        </aside>
    )
}
