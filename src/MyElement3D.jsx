import { useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls  } from "@react-three/drei"
import { Matrix4, Vector3 } from "three";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

const Sphere = ({ position, myRef }) => {
    return (
      <mesh position={position} ref={myRef}>
        <sphereGeometry args={[0.8, 32, 16]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    );
};

const Cone = ({ position, myRef }) => {
    return (
      <mesh position={position} ref={myRef}>
        <coneGeometry args={[1, 2, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
    );
};

const Cube = ({ position, myRef }) => {
    return (
      <mesh position={position} ref={myRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="green" />
      </mesh>
    );
};

function MyElement3D() {
    const model = useGLTF("./models/robotarm.gltf");

    // redux store들
    const isHandAction = useSelector((state) => state.handAction.value);
    const isRootAction = useSelector((state) => state.rootAction.value);
    const isTopArmAction = useSelector((state) => state.topArmAction.value);
    const isMiddleArmAction = useSelector((state) => state.middleArmAction.value);
    const isBottomArmAction = useSelector((state) => state.bottomArmAction.value);
    const cameraArea = useSelector((state) => state.cameraArea.value);
    const equipItem = useSelector((state) => state.equipItem.value);
    const selectLocation = useSelector((state) => state.selectLocation.value);
    
    let isCameraUpdated;
    useEffect(() => {
        isCameraUpdated = false;
    }, [cameraArea]);

    let mesh = model.nodes.Circle;
    // 뼈 정보
    const rootBone = mesh.skeleton.bones[0];
    const topArmBone = mesh.skeleton.bones[1];
    const middleArmBone = mesh.skeleton.bones[2];
    const bottomArmBone = mesh.skeleton.bones[3];
    const leftHandBone = mesh.skeleton.bones[4];
    const rightHandBone = mesh.skeleton.bones[5];
    leftHandBone.ani = 1;

    let equipLocation = null;
    if (selectLocation === 'bottomArm')
        equipLocation = bottomArmBone;
    else if (selectLocation === 'root')
        equipLocation = rootBone;
    else if (selectLocation === 'topArm')
        equipLocation = topArmBone;
    else if (selectLocation === 'middleArm')
        equipLocation = middleArmBone;
    else if (selectLocation === 'leftHand')
        equipLocation = leftHandBone;
    else if (selectLocation === 'rightHand')
        equipLocation = rightHandBone;
    
    const worldMatrix = useMemo(() => new Matrix4(), []);
    const rotationMatrix = useMemo(() => new Matrix4(), []);

    const orbitRef = useRef();
    const sphereRef = useRef();
    const coneRef = useRef();
    const cubeRef = useRef();

    useFrame((state) => {
        updateVertexPositions(mesh, mesh.skeleton);
        mesh.skeleton.bones.forEach((bone) => {
            bone.updateMatrixWorld(true);
        });

        if (equipLocation && sphereRef.current) {
            sphereRef.current.position.copy(rootBone.position);
            worldMatrix.copy(equipLocation.matrixWorld);
            sphereRef.current.position.applyMatrix4(worldMatrix);
            const myRotation = equipLocation.rotation.clone();
            rotationMatrix.makeRotationFromEuler(myRotation);
            sphereRef.current.rotation.setFromRotationMatrix(rotationMatrix);
        }
        
        if (equipLocation && coneRef.current) {
            coneRef.current.position.copy(rootBone.position);
            worldMatrix.copy(equipLocation.matrixWorld);
            coneRef.current.position.applyMatrix4(worldMatrix);
            const myRotation = equipLocation.rotation.clone();
            rotationMatrix.makeRotationFromEuler(myRotation);
            coneRef.current.rotation.setFromRotationMatrix(rotationMatrix);
                        
        }

        if (equipLocation && cubeRef.current) {
            cubeRef.current.position.copy(rootBone.position);
            worldMatrix.copy(equipLocation.matrixWorld);
            cubeRef.current.position.applyMatrix4(worldMatrix);
            const myRotation = equipLocation.rotation.clone();
            rotationMatrix.makeRotationFromEuler(myRotation);
            cubeRef.current.rotation.setFromRotationMatrix(rotationMatrix);
        }

        let boneOffset = 0.01 * leftHandBone.ani;
        if (isHandAction) {
            leftHandBone.rotation.x -= boneOffset;
            rightHandBone.rotation.x += boneOffset;
        }

        // 방향전환
        if (leftHandBone.rotation.x > -0.7)
            leftHandBone.ani *= -1;
        else if (leftHandBone.rotation.x < -1.5)
            leftHandBone.ani *= -1;

        // 루트 회전
        if (isRootAction)
            rootBone.rotation.z += 0.005;

        if (isTopArmAction)
            topArmBone.rotation.z += 0.005;

        if (isMiddleArmAction)
            middleArmBone.rotation.z += 0.005;

        if (isBottomArmAction)
            bottomArmBone.rotation.z += 0.01;

        if (isCameraUpdated == false) {
            if (cameraArea == 0) {
                gsap.timeline().to(
                    state.camera.position,
                    {
                        duration: 2,
                        x: 4,
                        y: 10,
                        z: 10,
                        ease: "power3.inOut"
                    }
                )
                gsap.timeline().to(
                    orbitRef.current.target,
                    {
                        duration: 2,
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power3.inOut"
                    }
                )
            }
            else if (cameraArea == 1) {
                gsap.timeline().to(
                    state.camera.position,
                    {
                        duration: 2,
                        x: -10,
                        y: 5,
                        z: -5,
                        ease: "power3.inOut"
                    }
                )
                gsap.timeline().to(
                    orbitRef.current.target,
                    {
                        duration: 2,
                        x: 3,
                        y: 3,
                        z: 3,
                        ease: "power3.inOut"
                    }
                )
            }
            else if (cameraArea == 2) {
                gsap.timeline().to(
                    state.camera.position,
                    {
                        duration: 2,
                        x: 10,
                        y: -5,
                        z: -5,
                        ease: "power3.inOut"
                    }
                )
                gsap.timeline().to(
                    orbitRef.current.target,
                    {
                        duration: 2,
                        x: -3,
                        y: -3,
                        z: -9,
                        ease: "power3.inOut"
                    }
                )
            }
            isCameraUpdated = true;
        }
    });

    const rendering = () => {
        const result = [];
        if (equipItem['sphere'])
            result.push(<Sphere key={0} position={equipItem['sphere']} myRef={sphereRef} />);
        if (equipItem['cone'])
            result.push(<Cone key={1} position={equipItem['cone']} myRef={coneRef} />);
        if (equipItem['cube'])
            result.push(<Cube key={2} position={equipItem['cube']} myRef={cubeRef} />)
        return result;
    }

    return (
        <>
            <directionalLight position={[3, 3, 3]} intensity={5}/>
            <OrbitControls ref={orbitRef} />
            {rendering()}
            <skinnedMesh geometry={mesh.geometry} material={mesh.material} skeleton={mesh.skeleton} />
        </>
    )
}

function updateVertexPositions(skinnedMesh, skeleton) {
    // Iterate over each vertex in the geometry
    // 기하학의 각 꼭지점을 반복합니다.
    const positionAttribute = skinnedMesh.geometry.attributes.position;
    const skinIndicesAttribute = skinnedMesh.geometry.attributes.skinIndex;
    const skinWeightsAttribute = skinnedMesh.geometry.attributes.skinWeight;
  
    for (let i = 0; i < positionAttribute.count; i++) {
      // Initialize a 4x4 identity matrix
      // 4x4 단위 행렬 초기화
      const vertexMatrix = new Matrix4();
  
      // Sum up the transformations from each influencing bone
      // 영향을 미치는 각 뼈의 변형을 요약합니다.
      for (let j = 0; j < 4; j++) {
        const boneIndex = skinIndicesAttribute.getX(i * 4 + j);
        const boneWeight = skinWeightsAttribute.getX(i * 4 + j);
  
        // Get the bone matrix and scale it by the weight
        // 뼈대 매트릭스를 가져와서 가중치에 따라 크기를 조정합니다.
        if (skinnedMesh.skeleton.bones[boneIndex] == undefined) {
            // console.log(positionAttribute.count)
            // console.log(i * 4 + j);
            return;
        }

        const boneMatrix = skeleton.bones[boneIndex].matrixWorld.clone();
        boneMatrix.multiplyScalar(boneWeight);
  
        // Add the scaled bone matrix to the vertex matrix
        vertexMatrix.multiplyMatrices(boneMatrix, vertexMatrix);
      }
  
      // Apply the vertex matrix to the original vertex position
      const originalPosition = new Vector3().fromBufferAttribute(positionAttribute, i);
      originalPosition.applyMatrix4(vertexMatrix);
  
      // Update the vertex position in the buffer geometry
      positionAttribute.setXYZ(i, originalPosition.x, originalPosition.y, originalPosition.z);
    }
    // Mark the buffer as needing an update
    positionAttribute.needsUpdate = true;
  }

export default MyElement3D