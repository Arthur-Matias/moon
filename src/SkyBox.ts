import * as THREE from 'three';

export default class SkyBox{
    skyboxGeometry: THREE.BoxGeometry;
    mesh: THREE.Mesh

    imagePaths = ['/assets/SkyBox/corona_ft.png', "/assets/SkyBox/corona_bk.png", '/assets/SkyBox/corona_up.png', '/assets/SkyBox/corona_dn.png', '/assets/SkyBox/corona_rt.png', '/assets/SkyBox/corona_lf.png']

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