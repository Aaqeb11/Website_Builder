import React from 'react'
import { useBuildStore } from '@/store/useStore'
import { EditorComponents } from '@/types/types'
import { propagateServerField } from 'next/dist/server/lib/render-server';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { FormControl, FormControlLabel } from '@/components/ui/form-control';
import { Box } from '@/components/ui/box';
import { Slider, SliderThumb,SliderTrack,SliderFilledTrack } from '@/components/ui/slider';

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
                    <VStack space="md">
                        <FormControl>
                            <FormControlLabel>Text</FormControlLabel>
                            <Input>
                                <InputField
                                    defaultValue={component.props?.text || ''}
                                    onChangeText={(value) => handlePropertyChange('text', value)}
                                    placeholder="Enter text"
                                />
                            </Input>
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>Color</FormControlLabel>
                            <Box className="b-1 border-gray-300 rounded-sm p-2">
                            <input
                            type="color"
                            value={component.props?.color || '#000000'}
                            onChange={(e) => handlePropertyChange('color', e.target.value)}
                            className="w-full mt-2"
                        />
                            </Box>
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>Font Size</FormControlLabel>
                            <Slider defaultValue={30}
                                size="md"
                                orientation="horizontal"
                                isDisabled={false}
                                isReversed={false}
                                onChange={(number) => { handlePropertyChange('fontSize', number) }}
                                maxValue={60}
                                minValue={10}
                            >
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        </FormControl>
                    </VStack>
                )
            case 'IMAGE':
                return (
                    <VStack space="xl">
                        <FormControl>
                        <FormControlLabel>Image URL</FormControlLabel>
                            <Input>
                                <InputField
                                    defaultValue={component.props?.src || ''}
                                    onChangeText={(value) => handlePropertyChange('src', value)}
                                    placeholder="Enter URL"
                                />
                            </Input>
                        </FormControl>
                        <FormControl>
                        <FormControlLabel>Width</FormControlLabel>
                        <input type="number"
                            value={component.props?.width || 100}
                            onChange={(e)=>{handlePropertyChange('width',e.target.value)}}
                            className="w-full p-2 border rounded mt-2"
                                placeholder="Width (px)"
                                max={778}
                                min={30}
                        
                            />
                            <Slider defaultValue={30}
                                size="md"
                                orientation="horizontal"
                                isDisabled={false}
                                isReversed={false}
                                onChange={(number) => { handlePropertyChange('width', number) }}
                                maxValue={778}
                                minValue={30}
                            >
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        </FormControl>
                        <FormControl>
                        <FormControlLabel>Height</FormControlLabel>
                        <input type="number"
                            value={component.props?.height || 100}
                            onChange={(e)=>{handlePropertyChange('height',e.target.value)}}
                            className="w-full p-2 border rounded mt-2"
                            placeholder="height (px)"
                                max={778}
                                min={30}
                        
                            />
                            <Slider defaultValue={30}
                                size="md"
                                orientation="horizontal"
                                isDisabled={false}
                                isReversed={false}
                                onChange={(number) => { handlePropertyChange('height', number) }}
                                maxValue={778}
                                minValue={30}
                            >
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        </FormControl>
                    </VStack>
                )
            case 'BOX':
                return (
                    <VStack space="xl">
                        <FormControl>
                        <FormControlLabel>Background Color</FormControlLabel>
                        <input type="color"
                            value={component.props?.backgroundColor || '#ffffff'}
                            onChange={(e)=>{handlePropertyChange('backgroundColor',e.target.value)}}
                            className="w-full mt-2"
                        
                            />
                        </FormControl>
                        <FormControl>
                        <FormControlLabel>Width</FormControlLabel>
                        <input type="number"
                            value={component.props?.width || 100}
                            onChange={(e)=>{handlePropertyChange('width',e.target.value)}}
                            className="w-full p-2 border rounded mt-2"
                                placeholder="Width (px)"
                                max={778}
                                min={30}
                        
                            />
                            <Slider defaultValue={30}
                                size="md"
                                orientation="horizontal"
                                isDisabled={false}
                                isReversed={false}
                                onChange={(number) => { handlePropertyChange('width', number) }}
                                maxValue={778}
                                minValue={30}
                            >
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        </FormControl>
                        <FormControl>
                        <FormControlLabel>Height</FormControlLabel>
                        <input type="number"
                            value={component.props?.height || 100}
                            onChange={(e)=>{handlePropertyChange('height',e.target.value)}}
                            className="w-full p-2 border rounded mt-2"
                            placeholder="height (px)"
                                max={778}
                                min={30}
                        
                            />
                            <Slider defaultValue={30}
                                size="md"
                                orientation="horizontal"
                                isDisabled={false}
                                isReversed={false}
                                onChange={(number) => { handlePropertyChange('height', number) }}
                                maxValue={778}
                                minValue={30}
                            >
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        </FormControl>
                        <FormControl>
                        <FormControlLabel>Text</FormControlLabel>
                            <Input>
                                <InputField
                                    defaultValue={component.props?.text || ''}
                                    onChangeText={(value) => handlePropertyChange('text', value)}
                                    placeholder="Enter text"
                                />
                            </Input>
                        </FormControl>
                        <FormControl>
                        <FormControlLabel>Text Color</FormControlLabel>
                        <input
                            type="color"
                            value={component.props?.color || '#000000'}
                            onChange={(e) => handlePropertyChange('color', e.target.value)}
                            className="w-full mt-2"
                        />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>Font Size</FormControlLabel>
                            <Slider defaultValue={30}
                                size="md"
                                orientation="horizontal"
                                isDisabled={false}
                                isReversed={false}
                                onChange={(number) => { handlePropertyChange('fontSize', number) }}
                                maxValue={60}
                                minValue={10}
                            >
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        </FormControl>
                    </VStack>
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
