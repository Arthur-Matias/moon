import * as THREE from 'three';

export default class SkyBox{
    skyboxGeometry: THREE.BoxGeometry;
    mesh: THREE.Mesh

    imagePaths = ['/moon/corona_ft.png', "/moon/corona_bk.png", '/moon/corona_up.png', '/moon/corona_dn.png', '/moon/corona_rt.png', '/moon/corona_lf.png']

    constructor(){
      
      const materialArray = this.createMaterialArray();

      this.skyboxGeometry = new THREE.BoxGeometry(20000, 20000, 20000);
      this.mesh = new THREE.Mesh(this.skyboxGeometry, materialArray);
    }

    createMaterialArray() {
      const materialArray = this.imagePaths.map(image=>{
        let texture = new THREE.TextureLoader().load(image);
        return new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
      });
      return materialArray;
    }
}