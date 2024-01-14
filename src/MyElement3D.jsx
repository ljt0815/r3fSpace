import { useFrame } from "@react-three/fiber"
import { Environment, useGLTF, OrbitControls  } from "@react-three/drei"
import { Matrix4, Vector3 } from "three";

function MyElement3D() {
    const model = useGLTF("./models/humangltf.gltf");
    const mesh = model.nodes.Cube.clone();
    console.log(mesh)
    const bone = mesh.skeleton.bones[0];

    useFrame((state, deltaTime) => {
        // skinnedMeshRef.current.skeleton.update();
        updateVertexPositions(mesh, mesh.skeleton);
        mesh.skeleton.bones.forEach((bone) => {
            bone.updateMatrixWorld(true);
        });
        bone.rotation.x += 0.01;
    });

    return (
        <>
            <Environment preset="sunset" />
            <OrbitControls />
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