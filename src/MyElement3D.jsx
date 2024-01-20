import { useFrame } from "@react-three/fiber"
import { Environment, useGLTF, OrbitControls  } from "@react-three/drei"
import { Matrix4, Vector3 } from "three";
import gsap from "gsap";

function MyElement3D({isHandAction, isRootAction, isTopArmAction, isMiddleArmAction, isBottomArmAction}) {
    const model = useGLTF("./models/robotarm.gltf");
    console.log(model)
    const mesh = model.nodes.Circle.clone();
    const rootBone = mesh.skeleton.bones[0];
    const topArmBone = mesh.skeleton.bones[1];
    const middleArmBone = mesh.skeleton.bones[2];
    const bottomArmBone = mesh.skeleton.bones[3];
    const leftHandBone = mesh.skeleton.bones[4];
    const rightHand = mesh.skeleton.bones[5];
    leftHandBone.ani = 1;

    useFrame((state, delta) => {
        // skinnedMeshRef.current.skeleton.update();
        updateVertexPositions(mesh, mesh.skeleton);
        mesh.skeleton.bones.forEach((bone) => {
            bone.updateMatrixWorld(true);
        });
        let boneOffset = 0.02 * leftHandBone.ani;
        if (isHandAction) {
            leftHandBone.rotation.x -= boneOffset;
            rightHand.rotation.x += boneOffset;
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
            bottomArmBone.rotation.z += 0.005;
    });

    return (
        <>
            <Environment preset="sunset" />
            <OrbitControls />
            <skinnedMesh geometry={mesh.geometry} material={mesh.material} skeleton={mesh.skeleton}  />
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