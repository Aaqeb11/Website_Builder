import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid'
import { ComponentTypes, EditorComponents } from "@/types/types";
import { persist, createJSONStorage } from 'zustand/middleware'
import { setEditorComponent } from "@/types/types";

interface BuildStore {
    components: EditorComponents[];
    selectedComponentId: string | null;
    addComponent: (type: ComponentTypes, parentId?: string) => void;
    removeComponent: (id: string) => void;
    updateComponent: (id: string, updates: Partial<EditorComponents>) => void;
    selectComponent: (id: string | null) => void;
    // moveComponent: (id: string, newIndex: number, newParentId: string) => void;
}

export const useBuildStore = create(
    persist<BuildStore>(
        (set) => ({
            components: [],
            selectedComponentId:null,
          addComponent: (type, parentId) => set((state) => {
            const newComponent: EditorComponents = { id: uuidv4(), type };
            if (!parentId) {
              return { components: [...state.components, newComponent] };
            }
            return {
              components: state.components.map(c => 
                c.id === parentId 
                  ? { ...c, children: [...(c.children || []), newComponent] }
                  : c
              )
            };
          }),
          removeComponent: (id) => set((state) => ({
            components: state.components.filter(c => c.id !== id)
              .map(c => c.children 
                ? { ...c, children: c.children.filter(child => child.id !== id) }
                : c
              )
          })),
            updateComponent: (id, updates) => set((state) => ({
        components: state.components.map(c => 
          c.id === id ? { ...c, ...updates } : c
        )
            })),
            selectComponent: (id) => set({ selectedComponentId: id }),
        }),
        {
          name: 'builder-storage', // unique name
          storage: createJSONStorage(() => localStorage), // use localStorage
        }
      )
)
