﻿import { useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls  } from "@react-three/drei"
import { Matrix4, Vector3 } from "three";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { useSelector } from "react-redux"

function MyElement3D({isSave, loadedModelRaw}) {
    const model = useGLTF("./models/robotarm.gltf");
    const isHandAction = useSelector((state) => state.handAction.value);
    const isRootAction = useSelector((state) => state.rootAction.value);
    const isTopArmAction = useSelector((state) => state.topArmAction.value);
    const isMiddleArmAction = useSelector((state) => state.middleArmAction.value);
    const isBottomArmAction = useSelector((state) => state.bottomArmAction.value);
    const cameraArea = useSelector((state) => state.cameraArea.value);
    let isCameraUpdated;
    useEffect(() => {
        isCameraUpdated = false;
    }, [cameraArea])
    let mesh = model.nodes.Circle;
    const rootBone = mesh.skeleton.bones[0];
    const topArmBone = mesh.skeleton.bones[1];
    const middleArmBone = mesh.skeleton.bones[2];
    const bottomArmBone = mesh.skeleton.bones[3];
    const leftHandBone = mesh.skeleton.bones[4];
    const rightHand = mesh.skeleton.bones[5];
    const orbitRef = useRef();
    leftHandBone.ani = 1;
    let loadedModel;
    let skinnedMesh;
    if (loadedModelRaw) {
        loadedModel = JSON.parse(loadedModelRaw);
        const tmp = new THREE.BufferGeometryLoader();
        loadedModel = tmp.parse(loadedModel);
        const geometry = new THREE.BufferGeometry();
        geometry.attributes = loadedModel.mesh.geometries[0].data.attributes;

        const materials = loadedModel.mesh.materials.map(materialData => {
            return new THREE.MeshStandardMaterial(materialData);
        });

        skinnedMesh = new THREE.SkinnedMesh(geometry, materials);
        skinnedMesh.skeleton = {};
        console.log(skinnedMesh);
        skinnedMesh.skeleton.bones = loadedModel.skeleton.bones.map(boneData => {
            const bone = new THREE.Bone();
            bone.name = boneData.name;
            bone.position.fromArray(boneData.position);
            bone.rotation.fromArray(boneData.rotation);
            bone.scale.fromArray(boneData.scale);
            return bone;
        });
        skinnedMesh.bind(new THREE.Skeleton(skinnedMesh.skeleton.bones, loadedModel.skeleton.bones));
        console.log(skinnedMesh)
    }
    useFrame((state) => {
        if (!loadedModelRaw) {
            updateVertexPositions(mesh, mesh.skeleton);
            mesh.skeleton.bones.forEach((bone) => {
                bone.updateMatrixWorld(true);
            });
        }
        else {
            updateVertexPositions(skinnedMesh, skinnedMesh.skeleton);
            // skinnedMesh.skeleton.bones.forEach((bone) => {
                // bone.updateMatrixWorld(true);
            // });
        }
        let boneOffset = 0.01 * leftHandBone.ani;
        if (isHandAction) {
            leftHandBone.rotation.x -= boneOffset;
            rightHand.rotation.x += boneOffset;
        }

        if (isSave) {
            console.log("Asdf");

            const serializedMesh = mesh.toJSON();

            const serializedSkeleton = {
                bones: mesh.skeleton.bones.map((bone) => {
                    return {
                        name: bone.name,
                        position: bone.position.toArray(),
                        rotation: bone.rotation.toArray(),
                        scale: bone.scale.toArray(),
                    };
                }),
            };

            const combinedData = {
                mesh: serializedMesh,
                skeleton: serializedSkeleton,
            };


            const jsonString = JSON.stringify(combinedData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'meshe.json';
            link.click();
            isSave = false;
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

    return (
        <>
            <directionalLight position={[1, 1, 1]} intensity={5}/>
            <OrbitControls ref={orbitRef}/>
            {loadedModelRaw ? <skinnedMesh geometry={skinnedMesh.geometry} material={skinnedMesh.material} skeleton={skinnedMesh.skeleton} /> : <skinnedMesh geometry={mesh.geometry} material={mesh.material} skeleton={mesh.skeleton} /> }
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