export function getRowColor(approvals: number | undefined): string {
  const transparency = 0.5;

  if (!approvals) return `rgba(240, 128, 128, ${transparency})`; 

  const maxApprovals = 3;
  const percentage = approvals / maxApprovals;

  const red = Math.floor(255 * (1 - percentage));
  const green = Math.floor(255 * percentage);

  return `rgba(${red}, ${green}, 0, ${transparency})`;
}
