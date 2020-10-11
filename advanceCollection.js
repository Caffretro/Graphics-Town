/*jshint esversion: 6 */
// @ts-check

/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrObject } from "./Framework/GrObject.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";

export class Morpher extends GrObject{
    constructor(radius=3, x=0, y=10, z=0){
        let morphTexture = new T.TextureLoader().load("./Textures/AnotherBump.jpg");
        let morph_Material = new T.MeshStandardMaterial({morphNormals: true, morphTargets: true, side:T.DoubleSide});
        let morph_Geom = new T.BoxGeometry(radius, radius, radius);

        let morphVerts = [];
        // making an array that has the same length as geom's vertices
        for (var i = 0; i < 8; i++) {

            var vertices = [];

            for (let v = 0; v < morph_Geom.vertices.length; v++) {
                vertices.push(morph_Geom.vertices[v].clone());
                if (v === i) {
                    // vertices[vertices.length - 1].x *= 2;
                    // vertices[vertices.length - 1].y *= 2;
                    // vertices[vertices.length - 1].z *= 2;
                    //morphVerts.push(new T.Vector3())
                }
            }
            morph_Geom.morphTargets.push({ name: "target" + i, vertices: vertices });
            console.log(vertices);
        }
        // for (let i = 0; i < morph_Geom.faces.length; i++){
        //     // This is updating uv version
        //     morphVerts[morph_Geom.faces[i].a].x = morph_Geom.faceVertexUvs[0][i][0].x * radius;
        //     morphVerts[morph_Geom.faces[i].a].y = morph_Geom.faceVertexUvs[0][i][0].y * radius; 
        //     morphVerts[morph_Geom.faces[i].b].x = morph_Geom.faceVertexUvs[0][i][1].x * radius;
        //     morphVerts[morph_Geom.faces[i].b].y = morph_Geom.faceVertexUvs[0][i][1].y * radius; 
        //     morphVerts[morph_Geom.faces[i].c].x = morph_Geom.faceVertexUvs[0][i][2].x * radius;
        //     morphVerts[morph_Geom.faces[i].c].y = morph_Geom.faceVertexUvs[0][i][2].y * radius;
        //     // morphVerts[morph_Geom.faces[i].a].x = morph_Geom.faces[i].a * 2;
        //     // morphVerts[morph_Geom.faces[i].a].y = morph_Geom.faces[i].a * 2;
        //     // morphVerts[morph_Geom.faces[i].b].x = morph_Geom.faces[i].b * 2;
        //     // morphVerts[morph_Geom.faces[i].b].y = morph_Geom.faces[i].b * 2;
        //     // morphVerts[morph_Geom.faces[i].c].x = morph_Geom.faces[i].c * 2;
        //     // morphVerts[morph_Geom.faces[i].c].y = morph_Geom.faces[i].c * 2; 
        // }
        // morph_Geom.morphTargets.push({name:'flat', vertices: morphVerts});
        morph_Geom.computeMorphNormals();

        let bufferMorph_Geom = new T.BufferGeometry().fromGeometry(morph_Geom);
        let mesh = new T.Mesh(bufferMorph_Geom, morph_Material)
        super("Morpher", mesh);
        mesh.position.set(x, y, z);
        this.mesh = mesh;
        this.mesh.updateMorphTargets();
        this.time = 0;
    }
    advance(delta, timeOfDay){
        this.time += delta / 1000;
        this.mesh.morphTargetInfluences[0] = Math.cos(this.time) * Math.cos(this.time);
    }
}

export class ShinyMonument extends GrObject{
    constructor(x=0,z=0, world){
        let wrapper = new T.Group();
        let group = new T.Group();
        wrapper.add(group);
        super("Shinymonument", wrapper);
        this.world = world;
        this.cubeCam = new T.CubeCamera(2.5, 1000, 1024);
        this.monument_Geom = new T.SphereBufferGeometry(2, 36, 36);
        this.monument_Material = new T.MeshStandardMaterial({
            color:"white",
            roughness:0.2,
            metalness:1,
            // @ts-ignore
            envMap:this.cubeCam.renderTarget
        });
        this.monument = new T.Mesh(this.monument_Geom, this.monument_Material);
        group.add(this.monument, this.cubeCam);
        wrapper.add(new T.Mesh(new T.CylinderGeometry(2.5, 3, 0.5, 32, 32), new T.MeshStandardMaterial({ color: "goldenrod" })));
        group.translateY(2);
        wrapper.position.set(x, 0.5, z);
    }
    advance(delta, timeOfDay){
        this.cubeCam.update(this.world.renderer, this.world.scene);
    }
}

export class RadarMap extends GrObject{
    constructor(x=0, z=0){
        let geom = new T.Geometry();
        let size = 2;
        geom.vertices.push(new T.Vector3(-size, -size, 0)); let uv0 = new T.Vector2(0, 0);
        geom.vertices.push(new T.Vector3(size, -size, 0)); let uv1 = new T.Vector2(1, 0);
        geom.vertices.push(new T.Vector3(-size, size, 0)); let uv2 = new T.Vector2(0, 1);
        geom.vertices.push(new T.Vector3(size, size, 0)); let uv3 = new T.Vector2(1, 1);
        geom.faces.push(new T.Face3(0, 1, 2));
        geom.faces.push(new T.Face3(1, 3, 2));
        geom.computeFaceNormals();
        geom.faceVertexUvs = [[[uv0, uv1, uv2], [uv1, uv3, uv2]]];

        let worldTime = 0;
        let shaderMat = shaderMaterial("./Shaders/radar.vs", "./Shaders/radar.fs",
            {
                side: T.DoubleSide,
                uniforms: {
                    resolution: { value: new T.Vector2(1, 1) },
                    radius: { value: 0.5 },
                    glowStrength: { value: 0.2 },
                    color: { value: new T.Vector3(0.9, 0.243, 0.09) },
                    fillStrength: { value: 0.3 },
                    time: { value: worldTime }
                }
            });
        let radar = new T.Mesh(geom, shaderMat);
        let group = new T.Group();
        let rod_Geom = new T.CylinderGeometry(0.25, 0.25, 6, 4, 10, false);
        let rod_Material = new T.MeshStandardMaterial({ color: "silver" });
        let rod1 = new T.Mesh(rod_Geom, rod_Material);
        let rod2 = new T.Mesh(rod_Geom, rod_Material);
        radar.add(rod1, rod2);
        rod1.translateX(-2);
        rod2.translateX(2);
        rod1.translateY(-1.2);
        rod2.translateY(-1.2);
        radar.position.set(x, 5, z);
        super("Radarmap", radar);
        this.advance = function (delta, timeOfDay){
            worldTime += delta * 0.002;
            shaderMat.uniforms.time.value = worldTime;
        }
    }
}