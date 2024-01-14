import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Matrix4 } from 'three';

function MyElement3D() {
    const UpperBody = () => {
        const upperBodyRef = useRef();
        const [rotationMatrix, setRotationMatrix] = useState(new Matrix4());
      
        useFrame(() => {
          // Update animation logic for the upper body
          // For example, rotate the upper body around the Y-axis
          setRotationMatrix(rotationMatrix.makeRotationX(Math.sin(Date.now() * 0.001)));
          upperBodyRef.current.rotation.setFromRotationMatrix(rotationMatrix);
        });
      
        return (
          <group ref={upperBodyRef}>
            {/* Upper body geometry and materials */}
            <mesh>
              {/* <sphereGeometry args={[1, 32, 32]} /> */}
              <boxGeometry args={[1, 2, 1]} />
              <meshStandardMaterial color="blue" />
            </mesh>
      
            {/* Left arm */}
            <Arm position={[-1.5, 0, 0]} />
      
            {/* Right arm */}
            <Arm position={[1.5, 0, 0]} />
          </group>
        );
      };
      
      const Arm = ({ position }) => {
        const armRef = useRef();
        const [rotationMatrix, setRotationMatrix] = useState(new Matrix4());
      
        useFrame(() => {
          // Update animation logic for the arms
          // For example, rotate the arm around the Z-axis
          setRotationMatrix(rotationMatrix.makeRotationZ(Math.sin(Date.now() * 0.001)));
          armRef.current.rotation.setFromRotationMatrix(rotationMatrix);
        });
      
        return (
          <group position={position} ref={armRef}>
            {/* Arm geometry and materials */}
            <mesh>
              {/* <cylinderGeometry args={[0.25, 0.25, 1.5, 32]} /> */}
              <boxGeometry args={[0.5, 1.5, 0.5]} />
              <meshStandardMaterial color="green" />
            </mesh>
      
            {/* Forearm */}
            <Forearm position={[0, -1.5, 0]} />
          </group>
        );
      };
      
      const Forearm = ({ position }) => {
        const forearmRef = useRef();
        // Additional state and animation logic for the forearm if needed
      
        return (
          <group position={position} ref={forearmRef}>
            {/* Forearm geometry and materials */}
            <mesh>
              {/* <cylinderGeometry  args={[0.25, 0.25, 1.5, 32]} /> */}
              <boxGeometry args={[0.5, 1.5, 0.5]} />
              <meshStandardMaterial color="yellow" />
            </mesh>
          </group>
        );
      };

    return (
        <>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <UpperBody />
        </>
    )
}

export default MyElement3D