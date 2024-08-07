"use client"
import { ComponentTypes } from "@/types/types"
import React, { useRef } from "react"
import { useDrag,ConnectDragSource } from 'react-dnd'
interface ComponentItems {
    icon: React.ReactNode,
    title: string,
    type: ComponentTypes;

}

export const ComponentsList: React.FC<ComponentItems> = ({ icon, title,type }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'component',
        item: { type },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<{name:string}>()
            if (item && dropResult) {
             console.log("working.")
            }
          },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
          }),
    }))
    drag(ref)
    return (
        <div ref={ref} className="flex flex-wrap p-2 gap-2 pt-6 justify-center inline-flex ">
            <div className="flex flex-col lg:w-[10vw] w-[20vw] items-center p-4 shadow-lg border-[0.5px] border-black rounded-lg cursor-pointer">
                {icon}
                <p className="text-2xl">{title}</p>
                {isDragging && <span>Dragging...</span>}
           </div>
           
        </div>
    )
}