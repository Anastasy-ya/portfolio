// // to check
// import * as THREE from 'three'
// import { applyShader } from 'three-custom-shader-material/vanilla'//другой принцип внедрения, хук не нужен
// import { extend } from '@react-three/fiber'

// class CustomShaderMaterial extends THREE.MeshPhysicalMaterial {
//   constructor(parameters) {
//     super(parameters)
//     this.setValues(parameters)
//   }

//   copy(source) {
//     super.copy(source)
//     return this
//   }
// }

// extend({ CustomShaderMaterial })

// export { CustomShaderMaterial, applyShader }