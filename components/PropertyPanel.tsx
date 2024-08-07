import React from 'react'
import { useBuildStore } from '@/store/useStore'
import { EditorComponents } from '@/types/types'
import { propagateServerField } from 'next/dist/server/lib/render-server';

export const PropertyPanel: React.FC = () => {
    
    const { selectedComponentId, components, updateComponent } = useBuildStore();
    const selectedComponent = components.find(c => c.id === selectedComponentId);

    if (!selectedComponent) {
        return <div className="p-4">No component selected</div>;
    }

    const handlePropertyChange = (key:string, value:any) => {
        updateComponent(selectedComponent.id,{props:{...selectedComponent.props,[key]:value}})
    }
    const renderProperties = (component:EditorComponents) => {
        switch (component.type) {
            case 'TEXT':
                return (
                    <>
                        <input type="text"
                            value={component.props?.text || ''}
                            onChange={(e)=>{handlePropertyChange('text',e.target.value)}}
                            className="w-full p-2 border rounded"
                            placeholder="Enter text"
                        />
                        <input
                            type="color"
                            value={component.props?.color || '#000000'}
                            onChange={(e) => handlePropertyChange('color', e.target.value)}
                            className="w-full mt-2"
                        />
                    </>
                )
            case 'IMAGE':
                return (
                    <>
                        <input type="text"
                            value={component.props?.src || ''}
                            onChange={(e)=>{handlePropertyChange('src',e.target.value)}}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Image URL"
                        />
                    </>
                )
            case 'BOX':
                return (
                    <>
                        <input type="color"
                            value={component.props?.backgroundColor || '#ffffff'}
                            onChange={(e)=>{handlePropertyChange('backgroundColor',e.target.value)}}
                            className="w-full mt-2"
                        
                        />
                        <input type="number"
                            value={component.props?.width || 100}
                            onChange={(e)=>{handlePropertyChange('width',e.target.value)}}
                            className="w-full p-2 border rounded mt-2"
                            placeholder="Width (px)"
                        
                        />
                        <input type="number"
                            value={component.props?.height || 100}
                            onChange={(e)=>{handlePropertyChange('height',e.target.value)}}
                            className="w-full p-2 border rounded mt-2"
                            placeholder="height (px)"
                        
                        />
                    </>
                )
                default:
                    return null;
        }
    }

    return (
        <div className="p-4 border-l">
      <h2 className="text-xl font-bold mb-4">Properties</h2>
      {renderProperties(selectedComponent)}
    </div>
    )
}
