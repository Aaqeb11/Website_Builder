import { useDrop } from "react-dnd"
import { useRef } from "react"
import { useBuildStore } from '../store/useStore';
import { ComponentTypes, EditorComponents } from "@/types/types";
import { FaRegImages } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


export const EditorLayout: React.FC = () => { 
    const {components,addComponent,removeComponent,selectComponent,selectedComponentId}= useBuildStore();
    const ref=useRef<HTMLDivElement>(null)
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'component',
        drop: (item: { type: ComponentTypes }, monitor) => {
            if (monitor.isOver({ shallow: true })) {
              addComponent(item.type);
            }
            return { name: 'EditorLayout' };
          },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        }),
    }))
    drop(ref)
    const renderComponent = (component: EditorComponents) => {
        const DeleteButton = () => (
            <button
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                onClick={() => removeComponent(component.id)}
            >
                <FaTrash />
            </button>
        );
        const commonProps = {
            onClick: () => { selectComponent(component.id) },
            className:`relative p-2 shadow-lg ${selectedComponentId === component.id ? 'ring-2 ring-blue-500' : ''}`
            }
        switch (component.type) {
          case 'BOX':
            return (
                <div
                    {...commonProps}
                    key={component.id}
                    style={{
                        backgroundColor: component.props?.backgroundColor,
                        width: `${component.props?.width}px`,
                        height: `${component.props?.height}px`,
                    }}
                >

                    <p style={{ color: component.props?.color,fontSize:component.props?.fontSize }} className="" >{ component.props?.text || 'Text'}</p>
                    <DeleteButton />
                </div>
            );
          case 'TEXT':
            return (
                <div
                {...commonProps}
                key={component.id}
                >
                    <p style={{ color: component.props?.color,fontSize:component.props?.fontSize }} className="" >{ component.props?.text || 'Text'}</p>
                    <DeleteButton />
                </div>
            );
          case 'IMAGE':
            return (
                <div {...commonProps} key={component.id} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img style={{width:component.props?.width , height:component.props?.height}} src={component.props?.src || <FaRegImages/>} alt="Dragged image" />
                    <DeleteButton />
                </div>
            );
          default:
            return null;
        }
    };
    return (
        <>
           
            
            {components.map(renderComponent)}
           
             <div ref={ref} className={`w-full h-[20vh] border-dashed border-2 border-sky-500 p-4 rounded-lg ${isOver && canDrop ? 'bg-green-300' : 'bg-inherit'}`}>
            {isOver&&canDrop ? 'Release here':'drop here'}
            </div>
        </>
    )
}