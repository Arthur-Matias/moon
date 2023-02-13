import * as THREE from 'three';

export default class SkyBox{
    skyboxGeometry: THREE.BoxGeometry;
    mesh: THREE.Mesh

    imagePaths = ['/corona_ft.png', "/corona_bk.png", '/corona_up.png', '/corona_dn.png', '/corona_rt.png', '/corona_lf.png']

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