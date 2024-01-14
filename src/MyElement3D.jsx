function MyElement3D() {
    return (
        <>
            <directionalLight position={[1,1,1]} />
            <mesh rotation={[0, 45*Math.PI/180, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#e67e22" />
            </mesh>
        </>
    )
}

export default MyElement3D