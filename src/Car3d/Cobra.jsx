import { useGLTF } from '@react-three/drei'

export function Model({ color, ...props }) {
  const { nodes, materials } = useGLTF('/cobra-transformed.glb')
  return (
    <group scale={0.025} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Material2.geometry} material={materials.PaletteMaterial001} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2007.geometry} material={materials.Suede_Green} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2009.geometry} material={materials.PaletteMaterial002} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2010.geometry} material={materials.PaletteMaterial003} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2012.geometry} material={materials.PaletteMaterial004} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2018.geometry} material={materials.Translucent_Glass_Corrugated} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2029.geometry} material={materials.PaletteMaterial005} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2037.geometry} material={materials.Metal_Silver} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2040.geometry} material={materials.PaletteMaterial006} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2066.geometry} material={materials.MT__15_2} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2067.geometry} material={materials.MT__15} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2068.geometry} material={materials.MT__15_1_0} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2071.geometry} material={materials.MT__15_1} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2078.geometry} material={materials.Groundcover_BarkChips} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material2079.geometry} material={materials.Groundcover_Rock_Crushed_Multi_1} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Material3004.geometry} material={materials.MT__15__1} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/cobra-transformed.glb')
