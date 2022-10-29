import * as THREE from 'three';
import bk from './assets/SkyBox/corona_bk.png'
import lf from './assets/SkyBox/corona_lf.png'
import up from './assets/SkyBox/corona_up.png'
import dn from './assets/SkyBox/corona_dn.png'
import ft from './assets/SkyBox/corona_ft.png'
import rt from './assets/SkyBox/corona_rt.png'

export default class SkyBox{
    skyboxGeometry: THREE.BoxGeometry;
    mesh: THREE.Mesh

    imagePaths = [ft, bk, up, dn, rt, lf]

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