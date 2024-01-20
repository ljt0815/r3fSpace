import { Canvas } from '@react-three/fiber'
import './App.css'
import MyElement3D from "./MyElement3D";
import Button from './Button';
import { useState } from 'react';

function App() {

  const [isHandAction, setHandAction] = useState(false);
  const [isRootAction, setRootAction] = useState(false);
  const [isTopArmAction, setTopArmAction] = useState(false);
  const [isMiddleArmAction, setMiddleArmAction] = useState(false);
  const [isBottomArmAction, setBottomArmAction] = useState(false);

  return (
    <>
      <Button name="루트회전" onClick={() => setRootAction(!isRootAction)}/>
      <Button name="윗팔회전" onClick={() => setTopArmAction(!isTopArmAction)}/>
      <Button name="중앙팔회전" onClick={() => setMiddleArmAction(!isMiddleArmAction)}/>
      <Button name="아랫팔회전" onClick={() => setBottomArmAction(!isBottomArmAction)}/>
      <Button name="집게" onClick={() => setHandAction(!isHandAction)}/>
      <Canvas
        camera={{
          fov: 70,
          position: [4, 10, 10]
        }}>
        <MyElement3D isHandAction={isHandAction} isRootAction={isRootAction} isTopArmAction={isTopArmAction}
          isMiddleArmAction={isMiddleArmAction} isBottomArmAction={isBottomArmAction}
        />
      </Canvas>
    </>
  )
}

export default App
