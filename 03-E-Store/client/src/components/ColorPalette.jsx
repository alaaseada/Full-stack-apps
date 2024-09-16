import { useState } from 'react'

const ColorPalette = ({ colors, selectedColor, chooseColor }) => {
  return (
    <div className="mt-6">
      <h4 className="text-md font-medium tracking-wider capitalize">Colors</h4>
      <div className="flex gap-2 mt-2">
        {colors.map((color, index) => {
          return (
            <button
              key={index}
              className={`badge w-6 h-6 mr-2 border-2 ${
                color === selectedColor && 'border-secondary'
              }`}
              style={{ backgroundColor: color }}
              type="button"
              onClick={() => chooseColor(color)}
            ></button>
          )
        })}
      </div>
    </div>
  )
}
export default ColorPalette
