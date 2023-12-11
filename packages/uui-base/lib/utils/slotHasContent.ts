export function slotHasContent(target: EventTarget | null): boolean {
  return target
    ? (target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0
    : false;
}
