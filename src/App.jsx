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
  const [cameraArea, setCameraArea] = useState(0);
  const [isSave, setSave] = useState(false);

  const handleLoadJson = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const loadedMeshes = JSON.parse(e.target.result);
        myMesh = cloneObj(loadedMeshes);;
        console.log(myMesh);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    reader.readAsText(file);
  }
  return (
    <>
      <Button name="루트회전" onClick={() => setRootAction(!isRootAction)}/>
      <Button name="윗팔회전" onClick={() => setTopArmAction(!isTopArmAction)}/>
      <Button name="중앙팔회전" onClick={() => setMiddleArmAction(!isMiddleArmAction)}/>
      <Button name="아랫팔회전" onClick={() => setBottomArmAction(!isBottomArmAction)}/>
      <Button name="집게" onClick={() => setHandAction(!isHandAction)}/>
      <div style={{marginBottom: "5px"}}></div>
      <Button name="카메라 이동" onClick={() => setCameraArea(cameraArea >= 2 ? 0 : cameraArea + 1)}/>
      <div style={{marginBottom: "5px"}}></div>
      <Button name="객체 저장" onClick={() => setSave(!isSave)} />
      <input type="file" accept=".json" onChange={handleLoadJson} />
      <Canvas
        camera={{
          fov: 70,
          position: [4, 10, 10]
        }}>
        <MyElement3D isHandAction={isHandAction} isRootAction={isRootAction} isTopArmAction={isTopArmAction}
          isMiddleArmAction={isMiddleArmAction} isBottomArmAction={isBottomArmAction} cameraArea={cameraArea} isSave={isSave} />
      </Canvas>
    </>
  )
}

export default App
