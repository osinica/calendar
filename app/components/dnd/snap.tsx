export const snapToGrid = (x: number, y: number): [number, number] => {
	const steppedY = y - (y % 14)
	return [x, steppedY]
}
