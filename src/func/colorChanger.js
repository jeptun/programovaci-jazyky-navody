export default function colorChanger() {
  const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}deg, 50%, 50%)`;
  };
  return getRandomColor();
}
