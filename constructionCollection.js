/*jshint esversion: 6 */
// @ts-check

/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrObject } from "./Framework/GrObject.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";

export class flag extends GrObject{
    constructor(x=0, z=0){
        let worldtime = 0;
        let shaderMat = shaderMaterial("./Shaders/flag.vs", "./Shaders/flag.fs", 
            {
                side: T.DoubleSide,
                uniforms:{
                    time:{value:worldtime},
                    colormap:{value:new T.TextureLoader().load("./Textures/UN.png")}
                }
            }
        )
        let flag_Geom = new T.PlaneGeometry(3, 4, 32, 32);
        let flag_Material = shaderMat;
        let flag = new T.Mesh(flag_Geom, flag_Material);
        
        let pole = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 20, 16, 166, false), new T.MeshStandardMaterial({color:"grey"}));
        flag.add(pole);
        flag.translateY(5);
        pole.translateX(4);
        pole.translateY(-5);
        flag.translateY(3);
        flag.scale.set(0.5, 0.5, 0.5);
        flag.translateX(-12);
        flag.translateZ(-5);
        super(`flag`, flag);
        this.advance = function(delta, timeOfDay){
            worldtime += delta * 0.002;
            shaderMat.uniforms.time.value = worldtime;
        }
    }
}

export class rain extends GrObject{
    constructor(){

        let particleCount = 300;
        let pMaterial = new T.PointCloudMaterial({
            color: "white",
            size: 1,
            map: new T.TextureLoader().load(
                "./Textures/snow.png"
            ),
            blending: T.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        let particles = new T.Geometry;
        for (let i = 0; i < particleCount; i++) {
            let pX = Math.random() * 80 - 40,
                pY = Math.random() * 200 - 100,
                pZ = Math.random() * 80 - 40,
                particle = new T.Vector3(pX, pY, pZ);
            particles.vertices.push(particle);
        }
        let particleSystem = new T.PointCloud(particles, pMaterial);
        super("raindrops", particleSystem);
        this.advance = function(delta, timeOfDay){
            let pCount = particleCount;
            while (pCount--) {
                let particle = particles.vertices[pCount];
                if (particle.y < -10) {
                    particle.y = 50
                }
                particle.y -= Math.random() * .01 * delta;
            }
            particles.verticesNeedUpdate = true;
        }
    }
}

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class Crane extends GrObject {
    /**
     * @param {CraneProperties} params 
     */
    constructor(params = {}) {
        let crane = new T.Group();

        let exSettings = {
            steps: 2,
            depth: 0.5,
            bevelEnabled: false
        };

        // first, we define the base of the crane.
        // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
        // to create the shape itself.
        /**@type THREE.Shape */
        let base_curve = new T.Shape();
        base_curve.moveTo(-0.5, 0);
        base_curve.lineTo(-0.5, 2);
        base_curve.lineTo(-0.25, 2.25);
        base_curve.lineTo(-0.25, 5);
        base_curve.lineTo(-0.2, 5);
        base_curve.lineTo(-0.2, 5.5);
        base_curve.lineTo(0.2, 5.5);
        base_curve.lineTo(0.2, 5);
        base_curve.lineTo(0.25, 5);
        base_curve.lineTo(0.25, 2.25);
        base_curve.lineTo(0.5, 2);
        base_curve.lineTo(0.5, 0);
        base_curve.lineTo(-0.5, 0);
        let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
        let crane_mat = new T.MeshStandardMaterial({ color: "yellow", metalness: 0.5, roughness: 0.7 });
        let base = new T.Mesh(base_geom, crane_mat);
        crane.add(base);
        base.translateZ(-0.25);

        // Use a similar process to create the cross-arm.
        // Note, we create a group for the arm, and move it to the proper position.
        // This ensures rotations will behave nicely,
        // and we just have that one point to work with for animation/sliders.
        let arm_group = new T.Group();
        crane.add(arm_group);
        arm_group.translateY(4.5);
        let arm_curve = new T.Shape();
        arm_curve.moveTo(-1.5, 0);
        arm_curve.lineTo(-1.5, 0.25);
        arm_curve.lineTo(-0.5, 0.5);
        arm_curve.lineTo(4, 0.4);
        arm_curve.lineTo(4, 0);
        arm_curve.lineTo(-1.5, 0);
        let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
        let arm = new T.Mesh(arm_geom, crane_mat);
        arm_group.add(arm);
        arm.translateZ(-0.25);

        // Finally, add the hanging "wire" for the crane arm,
        // which is what carries materials in a real crane.
        // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
        let wire_group = new T.Group();
        arm_group.add(wire_group);
        wire_group.translateX(3);
        let wire_curve = new T.Shape();
        wire_curve.moveTo(-0.25, 0);
        wire_curve.lineTo(-0.25, -0.25);
        wire_curve.lineTo(-0.05, -0.3);
        wire_curve.lineTo(-0.05, -3);
        wire_curve.lineTo(0.05, -3);
        wire_curve.lineTo(0.05, -0.3);
        wire_curve.lineTo(0.25, -0.25);
        wire_curve.lineTo(0.25, 0);
        wire_curve.lineTo(-0.25, 0);
        let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
        let wire_mat = new T.MeshStandardMaterial({ color: "#888888", metalness: 0.6, roughness: 0.3 });
        let wire = new T.Mesh(wire_geom, wire_mat);
        wire_group.add(wire);
        wire.translateZ(-0.25);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        // This is also where we define parameters for UI sliders.
        // These have format "name," "min", "max", "starting value."
        // Sliders are standardized to have 30 "steps" per slider,
        // so if your starting value does not fall on one of the 30 steps,
        // the starting value in the UI may be slightly different from the starting value you gave.
        super(`Crane`, crane);
        // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
        // This allows us to modify transforms as part of the update function.
        this.whole_ob = crane;
        this.arm = arm_group;
        this.wire = wire_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        crane.scale.set(scale, scale, scale);

        
        this.state = 0;
        this.countdown = 0;
        this.goalangle = Math.PI / 4;
        this.currentangle = 0;
        this.loading = 0;
        this.advance = function(delta, timeOfDay){
            switch(this.state){
                case 0:
                    this.state = 1;
                    break;
                case 1:
                    let ad = this.goalangle - this.currentangle;
                    if (ad > 0.1){
                        this.currentangle += 0.02;
                    } else if (ad < -0.1) {
                        this.currentangle -= 0.02;
                    } else{
                        this.state = 2; // moving arm state
                        this.goalangle = Math.PI * 2 * Math.random();
                        this.countdown = 10; 
                    }
                    this.arm.setRotationFromEuler(new T.Euler(0, this.currentangle, 0));
                    break;

                case 2:
                    if (this.countdown > 0){
                        if (this.loading % 2 == 1) {
                            this.wire.position.x += 0.01;
                        } else{
                            this.wire.position.x -= 0.01;
                        }
                        this.countdown -= delta / 200;
                    }
                    else{
                        this.loading++;
                        this.state = 1;
                    }
                    
            }
        }

    }

    // Wire up the wire position and arm rotation to match parameters,
    // given in the call to "super" above.
}
let breakerObCtr = 0;

// A simple breaker or whatever it is
/**
 * @typedef breakerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class Breaker extends GrObject {
	/**
	 * @param {breakerProperties} params
	 */
    constructor(params = {}) {
        let breaker = new T.Group();

        let breakerBase_Geom = new T.BoxGeometry(2.5, 0.7, 1.3);
        let yellow_Material = new T.MeshStandardMaterial({ color: "yellow", metalness: 0.5, roughness: 0.7 });
        let black_Material = new T.MeshStandardMaterial({ color: "#888888", metalness: 0.6, roughness: 0.3 });
        let breakerBase = new T.Mesh(breakerBase_Geom, yellow_Material);
        breakerBase.translateY(0.4); // make it higher so that wheels can stand on the ground
        breaker.add(breakerBase);


        let craneBaseJoint_Geom = new T.BoxGeometry(1, 0.6, 1.1);
        let craneBaseJoint = new T.Mesh(craneBaseJoint_Geom, yellow_Material);
        breakerBase.add(craneBaseJoint);
        craneBaseJoint.translateY(0.65);

        let cab = new T.Group();// spin will spin this group, so move the base a little bit backwards
        let cab_Geom = new T.BoxGeometry(2.3, 1.2, 1.3);
        let cabBase = new T.Mesh(cab_Geom, black_Material);
        cab.add(cabBase);
        cabBase.translateX(-0.2);
        breaker.add(cab);
        cab.translateY(1.3);

        let driverRoom_Geom = new T.BoxGeometry(1, 1.5, 0.6);
        let driverRoom = new T.Mesh(driverRoom_Geom, yellow_Material);
        cab.add(driverRoom);
        // Move the driver room a little bit so the crane can sit on the right part of crane base.
        driverRoom.translateY(0.6);
        driverRoom.translateZ(-0.3);
        driverRoom.translateX(-0.4);

        // the parent group for all arms, it sits besides driverRoom, so it is added to craneDriver
        let armGroup = new T.Group();
        cab.add(armGroup);
        let bigArm_Geom = new T.BoxGeometry(0.5, 3, 1);
        let bigArm = new T.Mesh(bigArm_Geom, black_Material);
        armGroup.add(bigArm);
        bigArm.translateY(1.5);
        bigArm.translateX(0.2);
        armGroup.rotateZ(-Math.PI / 6);

        // The parent group for all rest arms except the biggest one
        let forearmGroup = new T.Group();
        armGroup.add(forearmGroup);
        forearmGroup.translateY(1.45);
        let forearm_Geom = new T.BoxGeometry(0.4, 2.7, 0.85);
        let forearm = new T.Mesh(forearm_Geom, black_Material);
        forearmGroup.add(forearm);
        forearm.translateY(1.3);
        forearmGroup.translateY(1.45);
        forearmGroup.translateX(0.2);
        // limit the rotation btw 0 and 60
        forearmGroup.rotateZ(-Math.PI / 3);

        let drillGroup = new T.Group();
        //forearmGroup.add(drillGroup);
        //drillGroup.translateY(2.67);

        let drillJoint_Geom = new T.CylinderGeometry(0.2, 0.2, 0.7, 16);
        drillJoint_Geom.rotateX(Math.PI / 2);
        let drillJoint = new T.Mesh(drillJoint_Geom, black_Material);
        forearmGroup.add(drillJoint);
        drillJoint.translateY(2.8);

        let drillBase_Geom = new T.BoxGeometry(0.8, 1, 0.8);
        let drillBase = new T.Mesh(drillBase_Geom, yellow_Material);
        let drillHead_Geom1 = new T.TorusGeometry(0.27, 0.2, 16, 16);
        let drillHead1 = new T.Mesh(drillHead_Geom1, black_Material);
        let drillHead_Geom2 = new T.TorusGeometry(0.24, 0.17, 16, 16);
        let drillHead2 = new T.Mesh(drillHead_Geom2, black_Material);
        let drillEnd_Geom = new T.ConeGeometry(0.3, 0.7, 16);
        drillEnd_Geom.rotateX(-Math.PI / 2);
        let drillEnd = new T.Mesh(drillEnd_Geom, black_Material);
        drillHead1.add(drillHead2, drillEnd);
        drillHead2.translateZ(-0.3);
        drillEnd.translateZ(-0.8)
        drillBase.add(drillHead1);
        drillHead1.rotateX(Math.PI / 2);
        drillHead1.translateZ(-0.7);
        drillGroup.add(drillBase);
        drillBase.translateY(0.45);
        drillJoint.add(drillGroup);

        super(`breaker-${breakerObCtr++}`, breaker);

        this.whole_ob = breaker;
        this.cab = cab;
        this.arm = armGroup;
        this.forearm = forearmGroup;
        this.drill = drillGroup;

        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        breaker.scale.set(scale, scale, scale);
        this.state = 0;
        this.countdown = 0;
        this.goalangle = Math.PI / 6;
        this.currentangle = 0;
        this.loading = 0;
        this.advance = function (delta, timeOfDay) {
            switch (this.state) {
                case 0:
                    this.state = 2;
                    break;

                case 2:
                    if (this.countdown > 0) {
                        if (this.loading % 2 == 1) {
                            this.drill.rotation.z += 0.01;
                        } else {
                            this.drill.rotation.z -= 0.01
                        }
                        this.countdown -= delta / 200;
                    }
                    else {
                        this.loading++;
                        this.countdown = 10;
                    }

            }
        }
    }
    
}

let treeCtr = 0

export class Tree extends GrObject{
    constructor(x=0, z=0, size=1){
        let loader = new T.OBJLoader();
        let treeGroup = new T.Group();
        let mtlLoader = new T.MTLLoader();
        mtlLoader.load("./Objects/tree.mtl", function(materials){
            materials.preload();
            loader.setMaterials(materials)
            loader.load("./Objects/tree.obj", function (individual) {
                treeGroup.add(individual);
            })
        })
        
        
        treeGroup.position.set(x, 1.2, z);
        treeGroup.scale.set(2 * size, 2 * size, 2 * size);
        super(`Tree-${treeCtr++}`, treeGroup);
    }
}