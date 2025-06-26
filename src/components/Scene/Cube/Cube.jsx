

function Cube({ x, y, z, i, j }) {
//   console.log(i, j, "i, j");
  return (
    //<>
    <mesh position={[x, y, z]} key={`${i}-${j}`}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
    //</>
  );
}

export default Cube;
