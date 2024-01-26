import { Canvas } from '@react-three/fiber'
import './App.css'
import MyElement3D from "./MyElement3D";
import Button from './Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


function App() {

  const dispatch = useDispatch();
  const [isSave, setSave] = useState(false);

  return (
    <>
      <Button name="루트회전" onClick={() => dispatch({type:'rootActionSlice/toggle'})}/>
      <Button name="윗팔회전" onClick={() => dispatch({type:'topArmActionSlice/toggle'})}/>
      <Button name="중앙팔회전" onClick={() => dispatch({type:'middleArmActionSlice/toggle'})}/>
      <Button name="아랫팔회전" onClick={() => dispatch({type:'bottomArmActionSlice/toggle'})}/>
      <Button name="집게" onClick={() => dispatch({type:'handActionSlice/toggle'})}/>
      <div style={{marginBottom: "5px"}}></div>
      <Button name="카메라 이동" onClick={() => dispatch({type:'cameraAreaSlice/moveArea'})}/>
      <div style={{marginBottom: "5px"}}></div>
      <Button name="원 장착" onClick={() => dispatch({type:'equipItem/addCircle'})}/>
      <Canvas
        camera={{
          fov: 70,
          position: [4, 10, 10]
        }}>
        <MyElement3D 
          isSave={isSave} />
      </Canvas>
    </>
  )
}

export default App
