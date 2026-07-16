import type { ReactNode } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';

import { useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
  useSensor,
  DndContext,
  useSensors,
  PointerSensor,
  closestCenter,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
// Drag-and-drop reorder helper for spa2 dashboard "manage" grids (team
// members, certifications, vision/mission cards...). Wraps @dnd-kit, which
// is already a project dependency (see src/sections/kanban).
// ----------------------------------------------------------------------

type SortableGridProps<T extends { id: string }> = {
  items: T[];
  onReorder: (next: T[]) => void;
  children: ReactNode;
};

export function Spa2SortableGrid<T extends { id: string }>({
  items,
  onReorder,
  children,
}: SortableGridProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          onReorder(arrayMove(items, oldIndex, newIndex));
        }
      }
    },
    [items, onReorder]
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

type UseSortableResult = ReturnType<typeof useSortable>;

export function Spa2SortableItem({
  id,
  children,
}: {
  id: string;
  children: (sortable: UseSortableResult) => ReactNode;
}) {
  const sortable = useSortable({ id });
  const { setNodeRef, transform, transition, isDragging } = sortable;

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition ?? undefined,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 2 : undefined,
        position: 'relative',
      }}
    >
      {children(sortable)}
    </Box>
  );
}

export function Spa2DragHandle({ sortable, sx }: { sortable: UseSortableResult; sx?: object }) {
  const { attributes, listeners, setActivatorNodeRef } = sortable;

  return (
    <IconButton
      size="small"
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      sx={{ cursor: 'grab', touchAction: 'none', '&:active': { cursor: 'grabbing' }, ...sx }}
    >
      <Iconify icon="nimbus:drag-dots" width={18} />
    </IconButton>
  );
}
