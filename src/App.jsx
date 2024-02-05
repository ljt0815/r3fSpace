import { Canvas } from '@react-three/fiber'
import './App.css'
import MyElement3D from "./MyElement3D";
import Button from './Button';
import { useDispatch } from 'react-redux';
import SelectBox from './SelectBox';
import GamePad from './Gamepad';

function App() {

  const dispatch = useDispatch();
  return (
    <>
      <Button name="루트회전" onClick={() => dispatch({type:'rootActionSlice/toggle'})}/>
      <Button name="윗팔회전" onClick={() => dispatch({type:'topArmActionSlice/toggle'})}/>
      <Button name="중앙팔회전" onClick={() => dispatch({type:'middleArmActionSlice/toggle'})}/>
      <Button name="아랫팔회전" onClick={() => dispatch({type:'bottomArmActionSlice/toggle'})}/>
      <Button name="집게 작동" onClick={() => dispatch({type:'handActionSlice/toggle'})}/>
      <div style={{marginBottom: "5px"}}></div>
      <Button name="카메라 이동" onClick={() => dispatch({type:'cameraAreaSlice/moveArea'})}/>
      <div style={{marginBottom: "5px"}}></div>
      <SelectBox selectList={['아랫팔', '루트', '윗팔', '중앙팔', '왼쪽집게', '오른쪽집게']} type='selectLocationSlice/setSelected' />
      <span style={{marginRight: "10px"}}>에</span>
      <Button name="원 장착" onClick={() => dispatch({type:'equipItem/equipSphere'})} />
      <Button name="큐브 장착" onClick={() => dispatch({type:'equipItem/equipCube'})} />
      <Button name="콘 장착" onClick={() => dispatch({type:'equipItem/equipCone'})} />
      <div style={{marginBottom: "5px"}}></div>
      <Button name="장착 모두 해제" onClick={() => dispatch({type:'equipItem/deleteAll'})} />
      <Canvas
        camera={{
          fov: 70,
          position: [4, 10, 10] 
        }}>
        <MyElement3D />
      </Canvas>
      <GamePad />
    </>
  )
}

export default App
