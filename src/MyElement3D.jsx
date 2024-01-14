import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Environment, useGLTF, OrbitControls  } from "@react-three/drei"
import { SkinnedMesh, Matrix4, Vector3 } from "three";

function MyElement3D() {
    const model = useGLTF("./models/untitled.glb");
    const mesh = model.nodes.Cube.clone();

    const skinnedMeshRef = useRef();
    const mixerRef = useRef();

    useFrame((state, deltaTime) => {
        skinnedMeshRef.current.skeleton.update();
        updateVertexPositions(skinnedMeshRef.current, skinnedMeshRef.current.skeleton);
    });

    return (
        <>
            {/* <directionalLight position={[1,1,1]} /> */}
            <Environment preset="sunset" />
            <OrbitControls />
            {/* <primitive object={model.scene} /> */}
            <primitive object={mesh} ref={skinnedMeshRef}/>
        </>
    )
}

function updateVertexPositions(skinnedMesh, skeleton) {
    // Iterate over each vertex in the geometry
    const positionAttribute = skinnedMesh.geometry.attributes.position;
    const skinIndicesAttribute = skinnedMesh.geometry.attributes.skinIndex;
    const skinWeightsAttribute = skinnedMesh.geometry.attributes.skinWeight;
  
    for (let i = 0; i < positionAttribute.count; i++) {
      // Initialize a 4x4 identity matrix
      const vertexMatrix = new Matrix4();
  
      // Sum up the transformations from each influencing bone
      for (let j = 0; j < 4; j++) {
        const boneIndex = skinIndicesAttribute.getX(i * 4 + j);
        const boneWeight = skinWeightsAttribute.getX(i * 4 + j);
  
        // Get the bone matrix and scale it by the weight
        if (skinnedMesh.skeleton.bones[boneIndex] == undefined)
            return;
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